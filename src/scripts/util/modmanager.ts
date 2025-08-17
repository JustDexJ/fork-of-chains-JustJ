import { DataUtil } from "./DataUtil";
import { openModsDir, openUnpackedModDir, resolveAsyncIterator } from "./files";
import { globalsettings } from "./globalsettings";
import { createLogger } from "./logger";

export const MODS_DIR_NAME = "mods";

export const MOD_PACKED_EXTENSION = ".focmod.js";
export const MOD_UNPACKED_MANIFEST_FILE = "focmod.js";

export type ModDefinition = import("../types/modding").FocModDefinition & {
  files?: Record<string, string>; // file contents as strings
};

export type InstalledMod = Partial<ModDefinition> & {
  path: string;
  errors?: string[];
  data?: ModData;
};

const logmsg = createLogger("ModManager", "royalblue");

const MODDED = Symbol.for("FOC-MODDED");

export function isUnpackedMod(mod_path: string): boolean {
  return !mod_path.includes("/") && !mod_path.endsWith(MOD_PACKED_EXTENSION);
}

class ModData {
  setup: Record<string, any> = {};
  definitions: Record<string, any> = {};
  passages: Record<string, { tags: string[]; content: string }> = {};
}

/**
 * Handles temporary changes during a mod load phase,
 * so that it can track what the mod changes on the `setup` object.
 */
class ModLoadContext {
  original_objects: Record<string, unknown> = {};

  /** The resulting modded data will go here */
  data = new ModData();

  /**
   * Called before a mod is to be loaded.
   *
   * Creates a JS proxy over `setup` fields so that when a mod tries to modifies it while
   * loading (e.g. via a new QuestTemplate call), it modifies instead the object at `this.data`.
   */
  init() {
    for (const [k, v] of Object.entries(SugarCube.setup)) {
      if (v && (typeof v === "object" || typeof v === "function")) {
        this.original_objects[k] = v;
        (setup as any)[k] = this.proxieated(v, `setup.${k}`);
      }
    }
  }

  /**
   * Undoes the effect of `this.init()` by restoring the original `setup` object.
   */
  cleanup() {
    Object.assign(SugarCube.setup, this.original_objects);
  }

  private proxieated<T extends {}>(obj: T, prefix: string): T {
    //let target = obj
    /*if (typeof obj === 'function') {
      target = Object.create(obj, {
        prototype: { configurable: true, value: 0 }
      })
    }*/
    const ctx = this;
    return new Proxy(obj, {
      get(target, propKey, receiver) {
        const subprefix = `${prefix}.${String(propKey)}`;
        if (subprefix in ctx.data.setup) return ctx.data.setup[subprefix];
        //console.log("accessing ", subprefix)
        const descr = Object.getOwnPropertyDescriptor(obj, propKey);
        if (
          typeof propKey !== "symbol" &&
          (!descr || descr.configurable || descr.writable)
        ) {
          //if (propertyKey !== 'prototype') {
          const value = (obj as any)[propKey as keyof typeof obj];
          if (
            value &&
            (typeof value == "object" || typeof value === "function")
          ) {
            // whitelist some classes, because otherwise that would break stuff like "x === setup.jobs.slaver"
            if (
              !(
                value instanceof setup.Job ||
                value instanceof setup.UnitCriteria ||
                value instanceof setup.Job
              )
            ) {
              return ctx.proxieated(value, subprefix);
            }
          }
        }
        return Reflect.get(target, propKey, receiver);
      },
      set(target, propKey, newValue, receiver) {
        const subprefix = `${prefix}.${String(propKey)}`;
        //console.log('setting', subprefix, propKey)
        if (typeof propKey === "string" && subprefix.startsWith("setup.")) {
          ctx.data.setup[subprefix] = newValue;
          return true;
        }
        return Reflect.set(target, propKey, newValue, receiver);
      },
      construct(target, argArray, newTarget) {
        //console.log("constructing ", newTarget)
        return Reflect.construct(target as any, argArray, newTarget);
      },
    });
  }
}

/** Incremental id used for dynamically adding twee passages (you can't replace them once added) */
let next_passage_id = 50000;

/**
 * Singleton class that handles loading/unloading mods.
 */
export class ModManagerClass {
  /**
   * The info and data for the loaded mods
   */
  mods: { [k in string]?: InstalledMod } = {};

  mods_unpacked_dirhandles: { [k in string]?: FileSystemDirectoryHandle } = {};

  /** Set to the promise that will resolve when mods finish reloading. */
  reloading_promise: Promise<void> | null = null;

  /** Keeps a `resolve` callback which will be called from each mod when it finishes loading */
  script_load_callbacks: Record<
    string,
    { data?: {}; resolve: (error: unknown | null) => void }
  > = {};

  applied_mods: InstalledMod[] = [];

  constructor() {
    /**
     * The global function `FocMod` used by mods to register themselves
     */
    (window as any).FocMod = this.registerMod.bind(this);

    // trigger the initial mod reload
    this.reloading_promise = new Promise((resolve) => {
      setTimeout(
        () =>
          this._reloadMods()
            .then(() => this.reapplyMods())
            .then(resolve),
        1,
      );
    });
  }

  private resolveModScriptPath(mod_path: string, is_unpacked: boolean) {
    let path = mod_path;
    if (!mod_path.includes("/")) {
      path = `./${MODS_DIR_NAME}/${mod_path}`;
    }
    if (is_unpacked) {
      path += "/" + MOD_UNPACKED_MANIFEST_FILE;
    }
    return path;
  }

  /** The actual implementation of the `FocMod` global function */
  private registerMod(manifest: any) {
    const mod_path = document.currentScript?.getAttribute?.("data-mod-path");
    const entry = mod_path && this.script_load_callbacks[mod_path];
    if (!entry) return;

    // so that "onload" doesn't report that register func wasn't called
    entry.data = manifest;
  }

  async loadUnpackedMod(mod_path: string): Promise<void> {
    const mod = (this.mods[mod_path] ??= { path: mod_path });
    const mod_file_contents = (mod.files ??= {});

    let mod_dir_handle = this.mods_unpacked_dirhandles[mod_path] ?? null;
    if (!mod_dir_handle) {
      mod_dir_handle = await openUnpackedModDir(mod_path, true);
      if (!mod_dir_handle) {
        const mods_dir = await openModsDir(true);
        if (mods_dir) {
          mod_dir_handle = await mods_dir.getDirectoryHandle(mod_path);
        }
        if (!mod_dir_handle) {
          throw new Error(
            `Need to load the unpacked mod folder again (missing permissions)`,
          );
        }
      }
    }

    const file_to_ignore = new Set(["focmod.js"]);

    const errmsgs: string[] = [];

    const getErrMsg = (err: unknown) =>
      err instanceof Error ? err.message : String(err);

    function processDirectory(
      dir_handle: FileSystemDirectoryHandle,
      dir_path: string,
    ): Promise<unknown> {
      return resolveAsyncIterator(dir_handle.entries())
        .then((files) => {
          return Promise.all(
            files.map(([name, handle]) => {
              const path = dir_path ? `${dir_path}/${name}` : name;
              if (!file_to_ignore.has(path)) {
                if (handle.kind === "directory") {
                  return processDirectory(
                    handle as FileSystemDirectoryHandle,
                    path,
                  );
                } else if (handle.kind === "file") {
                  const file_handle = handle as FileSystemFileHandle;
                  return file_handle
                    .getFile()
                    .then((file) => file.text())
                    .then(
                      (file_content) =>
                        (mod_file_contents[path] = file_content),
                    )
                    .catch((err) =>
                      errmsgs.push(
                        `Failed to load file "${path}": ${getErrMsg(err)}`,
                      ),
                    );
                }
              }
            }),
          );
        })
        .catch((err) =>
          errmsgs.push(
            `Failed to load directory "${dir_path}": ${getErrMsg(err)}`,
          ),
        );
    }

    return processDirectory(mod_dir_handle, "").then(() => {
      if (errmsgs.length) throw errmsgs;
    });
  }

  /**
   * Reloads the mod list (doesn't apply their changes, only refreshes the list!)
   */
  private _reloadMods(): Promise<void> {
    const t = Date.now();

    // clear all mod data
    this.mods = {};

    this.script_load_callbacks = {};
    const script_load_callbacks = this.script_load_callbacks;

    const promises = (globalsettings.mods_installed ?? []).map((mod_path) => {
      const is_unpacked = isUnpackedMod(mod_path);
      const script_path = this.resolveModScriptPath(mod_path, is_unpacked);

      return new Promise((resolve) => {
        const script = document.createElement("script");
        script.setAttribute("data-mod-path", mod_path);
        script_load_callbacks[mod_path] = { resolve };
        script.onload = () => {
          const entry = script_load_callbacks[mod_path];
          if (!entry.data) {
            // script crashed or didn't call FocMod(...)
            console.error(`Mod info failed to load: ${mod_path}`);
            entry.resolve(new Error(`Mod info failed to load`));
          } else {
            Object.assign(
              (this.mods[mod_path] ??= { path: mod_path }),
              entry.data,
            );
            entry.resolve(null);
          }
        };
        script.onerror = (err) => resolve(`unable to load the mod`);
        script.src = `${script_path}?t=${t}`;
        document.body.appendChild(script);
      })
        .then(() => (is_unpacked ? this.loadUnpackedMod(mod_path) : undefined))
        .then(
          () => {
            console.info(...logmsg(`Loaded mod info for "${mod_path}"`));
          },
          (err) => {
            const moddata = (this.mods[mod_path] ??= { path: mod_path });
            const moddata_errors = (moddata.errors ??= []);
            if (Array.isArray(err)) {
              moddata_errors.push(...err);
            } else {
              const errmsg = err instanceof Error ? err.message : String(err);
              moddata_errors.push(errmsg);
            }
            console.info(
              ...logmsg(
                `Failed to load mod info for "${mod_path}":\n${moddata_errors.join("\n")}`,
              ),
            );
          },
        );
    });

    return Promise.all(promises)
      .then(() => {
        this.script_load_callbacks = {};
        return this.reloadModData();
      })
      .then(() => {
        this.reloading_promise = null;
      });
  }

  reloadMods(): Promise<void> {
    return (
      this.reloading_promise || (this.reloading_promise = this._reloadMods())
    );
  }

  static MODDABLES: { [k in keyof typeof setup]?: any } = {
    ActivityTemplate: "",
    Event: "",
    UnitGroup: "",
    Title: "",
    Interaction: "",
    OpportunityTemplate: "",
    BanterInstance: "",
    UnitCriteria: "",
    QuestTemplate: "",
    QuestPool: "",
  };

  sortMods(mods: string[]) {
    mods.sort((a, b) => {
      const pa = this.mods[a]?.priority ?? 0;
      const pb = this.mods[b]?.priority ?? 0;
      if (pa !== pb) return pa - pb;
      return (this.mods[a]?.key ?? a).localeCompare(this.mods[b]?.key ?? b);
    });
  }

  private reloadModData() {
    console.info(...logmsg("Reloading mod data"));

    const mods = /*State.variables.mods*/ (
      setup.globalsettings.mods_installed || []
    ).filter((mod_path) => {
      if (!this.mods[mod_path]) {
        console.warn(...logmsg(`Skipping mod "${mod_path}"`));
        return false;
      }
      return true;
    });

    this.sortMods(mods);

    if (mods.length > 0) {
      //new setup\.(?!ActivityTemplate|Event|UnitGroup|Title|interaction|OpportunityTemplate|BanterInstance|UnitCriteria|QuestTemplate|Questpool)

      for (const mod_path of mods) {
        const mod = this.mods[mod_path];
        if (!mod) continue;

        const mod_context = new ModLoadContext();

        try {
          mod_context.init();

          const all_files = Object.entries(mod.files || {}).sort();

          const json_files = all_files.filter(([filename, content]) =>
            /\.json$/i.test(filename),
          );
          if (json_files.length) {
            for (const [filename, filecontent] of json_files) {
              const STRIP_COMMENTS_REGEX = /(\/\/.*)|(\/\*[\s\S]*?\*\/)/g;
              const json = filecontent.replace(STRIP_COMMENTS_REGEX, () => "");

              let data: any;
              try {
                data = JSON.parse(json);
              } catch (e) {
                throw new Error(`Failed to parse json file: ${filename}`);
              }
              if (data) {
                for (const [section_id, section_obj] of Object.entries(data)) {
                  const defs = (mod_context.data.definitions[section_id] ??=
                    {});
                  Object.assign(defs, section_obj);
                }
              }
            }
          }

          const twee_files = all_files.filter(([filename, content]) =>
            /\.twee$/i.test(filename),
          );
          if (twee_files.length) {
            const fragment = document.createDocumentFragment();
            for (const [filename, filecontent] of twee_files) {
              const passages = filecontent.split(/^(?=::)/gm);
              for (let passage of passages) {
                let name: string | undefined;
                let tags: string | undefined;
                const content = passage.replace(
                  /^::\s*(\w+)(?:\s*\[([^\]]+)\])?/,
                  (c0, c1, c2) => ((name = c1), (tags = c2), ""),
                );
                if (name) {
                  mod_context.data.passages[name] = {
                    tags: tags ? tags.trim().split(/\s+/g) : [],
                    content,
                  };
                }
              }
            }

            const passages_parent = document.querySelector("tw-storydata")!;
            for (const [passage_name, passage_data] of Object.entries(
              mod_context.data.passages,
            )) {
              if (!Story.has(passage_name)) {
                const elem = document.createElement("tw-passagedata");
                elem.setAttribute("name", passage_name);
                elem.setAttribute("pid", String(++next_passage_id));
                if (passage_data.tags.length) {
                  elem.setAttribute("tags", passage_data.tags.join(" "));
                }
                elem.textContent = passage_data.content;
                passages_parent.appendChild(elem);
                Story.add(new Passage(passage_name, elem));
              }
              if (
                passage_data.tags.some((t) =>
                  setup.CONTENT_CREATOR_TYPES.includes(t),
                )
              ) {
                new Wikifier(fragment, passage_data.content);
                const errors = [...fragment.querySelectorAll(".error-view")];
                if (errors.length > 0) {
                  throw errors.map((err) => err.textContent);
                }
              }
            }
          }

          mod.data = mod_context.data;
        } catch (err) {
          const errmsgs: string[] = Array.isArray(err)
            ? err
            : [err instanceof Error ? err.message : String(err)];
          (mod.errors ??= []).push(...errmsgs);
        } finally {
          mod_context.cleanup();
        }
      }
    }
    console.info(...logmsg(`Finished reloading mod datas (${mods.length})`));
  }

  /**
   * Reapplies the mod data for enabled mods to the `setup` object,
   * effectively doing the actual modding part of the game content.
   *
   * How this work: it will replace setup objects with a object with them as their prototype,
   * adding a [MODDED]: <the original object> "secret" value to them.
   *
   */
  reapplyMods() {
    {
      // cleanup of currently applied mods
      for (const mod of this.applied_mods) {
        try {
          mod.onDisable?.();
        } catch (err) {
          console.error(...logmsg(`Failed to disable mod "${mod.key}"`));
          continue;
        }
      }
      // restore umodded objects
      for (const [k, v] of Object.entries(setup)) {
        if (v && typeof v === "object" && MODDED in v) {
          (setup as any)[k] = v[MODDED];
        }
      }

      // remove mod passages
      //for (const node of [...document.querySelectorAll('tw-passagedata[mod]')]) {
      //  const name = node.getAttribute('name')
      //  node.parentNode?.removeChild?.(node)
      //}
    }

    this.applied_mods = [];

    const mods = (State.variables.mods || []).filter((mod_path) => {
      if (!this.mods[mod_path]) {
        console.warn(...logmsg(`Missing mod "${mod_path}"`));
        return false;
      }
      return true;
    });

    this.sortMods(mods);

    for (const mod_path of mods) {
      const mod = this.mods[mod_path];
      if (!mod?.data) continue;

      console.info(...logmsg(`Applying mod "${mod.key}"`));

      try {
        mod.onEnable?.();
      } catch (err) {
        console.error(...logmsg(`Failed to enable mod "${mod.key}"`));
        continue;
      }

      this.applied_mods.push(mod);

      //
      // Util functions
      //

      const getModdedObject = <T>(parent_obj: T, key: keyof T) => {
        let obj = parent_obj[key] as any;
        if (!(MODDED in obj)) {
          let original_obj = obj;
          //modded_obj = Object.create(obj, { [MODDED]: { value: original_obj } })
          obj = Object.assign({ [MODDED]: original_obj }, original_obj);
          parent_obj[key] = obj;
        }
        return obj;
      };

      //
      // Reapply quests/etc embedded in the twee files
      //
      for (const [path_str, val] of Object.entries(mod.data.setup)) {
        const path = path_str.split(".");

        let obj = setup as any;
        for (let i = 1; i < path.length - 1; ++i) {
          const key = path[i];
          obj = getModdedObject(obj, key);
        }

        obj[path[path.length - 1]] = val;
      }

      //
      // Reaply JSON definitions
      //

      // NOTE: the order matters!
      const moddable_sections = ["traits", "subraces", "titles"] as const;

      try {
        DataUtil.CURRENT_MOD = mod;

        for (const section_key of moddable_sections) {
          const section_values = mod.data.definitions[section_key];
          if (section_values && Object.keys(section_values).length > 0) {
            switch (section_key) {
              case "titles":
                getModdedObject(setup, "title");
                DataUtil.load(setup.Title, section_values as any, mod);
                break;
              case "traits":
                getModdedObject(setup, "trait");
                DataUtil.load(setup.Trait, section_values as any, mod);
                break;
              case "subraces":
                getModdedObject(setup, "trait");
                getModdedObject(setup, "subrace");
                getModdedObject(setup, "unitpool");
                getModdedObject(setup, "unitgroup");
                DataUtil.load(setup.Subrace, section_values as any, mod);
                break;
              default:
                console.warn(
                  `Ignoring unsupported mod section "${section_key}" for mod ${mod_path}`,
                );
            }
          }
        }
      } catch (err) {
        // TODO better error handling
        throw new Error(
          `Error loading mod "${mod.name}"${isUnpackedMod(mod_path) ? " (unpacked)" : ""}: ${err instanceof Error ? err.message : String(err)}`,
          {
            cause: err,
          },
        );
      } finally {
        DataUtil.CURRENT_MOD = null;
      }
    }
  }
}

/** The singleton instance of ModManagerClass */
export const ModManager = new ModManagerClass();
