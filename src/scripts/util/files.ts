// Defines functions that deal with local filesystem files

import { MODS_DIR_NAME } from "./modmanager";

export namespace FileUtil {
  export function supportsDirectoryPicker() {
    return (
      (window.location.protocol === "file:" ||
        window.location.hostname === "localhost") &&
      "showDirectoryPicker" in window
    );
  }

  export const autodetectImagePacks = autodetectImagePacks_;
}

/**
 * Helper function to avoid using "for await (... of ...)"
 * to read a directory entries
 */
export function resolveAsyncIterator<T>(
  iterator: AsyncIterator<T>,
): Promise<T[]> {
  return new Promise((resolve, reject) => {
    let values: T[] = [];

    function handleNext({ done, value }: IteratorResult<T>) {
      if (done) {
        resolve(values);
      } else {
        values.push(value);
        iterator.next().then(handleNext, reject);
      }
    }

    iterator.next().then(handleNext, reject);
  });
}

export function resolveParentDir(
  dir: FileSystemDirectoryHandle,
  path: string[],
  index: number,
): Promise<FileSystemDirectoryHandle> {
  if (index >= path.length - 1) {
    return Promise.resolve(dir);
  }
  return dir
    .getDirectoryHandle(path[index])
    .then((subdir) => resolveParentDir(subdir, path, index + 1))
    .catch((err) => {
      const errmsg = `Failed to access directory "${path.slice(0, index + 1).join("/")}"`;
      console.error(errmsg, err);
      throw new Error(errmsg);
    });
}

export function resolveDir(
  dir_handle: FileSystemDirectoryHandle,
  path: string,
): Promise<FileSystemDirectoryHandle> {
  const path_parts = path.split("/");
  return resolveParentDir(dir_handle, path_parts, 0)
    .then((dir) => dir.getDirectoryHandle(path_parts[path_parts.length - 1]))
    .catch((err) => {
      throw new Error(`Failed to access directory "${path}"`);
    });
}

export function resolveFile(
  dir_handle: FileSystemDirectoryHandle,
  path: string,
): Promise<FileSystemFileHandle> {
  const path_parts = path.split("/");
  return resolveParentDir(dir_handle, path_parts, 0)
    .then((dir) => dir.getFileHandle(path_parts[path_parts.length - 1]))
    .catch((err) => {
      throw new Error(`Failed to access file "${path}"`);
    });
}

/**
 * list the valid imagepacks in the given folder
 */
function listImagePacks(
  imagepacksdir: FileSystemDirectoryHandle,
): Promise<string[]> {
  if (!imagepacksdir) return Promise.resolve([]);

  return new Promise((resolve, reject) => {
    resolveAsyncIterator(imagepacksdir.entries()).then(
      (entries) => {
        let promises: Promise<string | null>[] = [];
        for (const [name, entry] of entries) {
          if (entry.kind === "directory") {
            const dir = entry as FileSystemDirectoryHandle;
            promises.push(
              Promise.allSettled([
                dir.getFileHandle("imagemeta.js"),
                dir.getFileHandle("imagepack.js"),
              ]).then((results) => {
                const either_exists = results.some(
                  (x) => x.status === "fulfilled",
                );
                return either_exists ? name : null;
              }),
            );
          }
        }
        Promise.allSettled(promises).then((results) => {
          const packpaths = [];
          for (const result of results) {
            if (result.status === "fulfilled" && result.value)
              packpaths.push(result.value);
          }
          resolve(packpaths);
        });
      },
      () => {
        console.error(
          `failed to list subfolders of '${setup.UnitImage.IMAGEPACK_DIR_NAME}'`,
        );
        resolve([]);
      },
    );
  });
}

/**
 * try to detect "imagepacks" folder from user selected folder
 */
function findImagePacksDir(
  dir: FileSystemDirectoryHandle,
): Promise<FileSystemDirectoryHandle | null | undefined> {
  return new Promise((resolve, reject) => {
    if (dir.name === setup.UnitImage.IMAGEPACK_DIR_NAME) return resolve(dir); // found "imagepacks", it is dir

    // check if we are in "/dist"
    dir.getFileHandle("precompiled.html").then(
      (file) => {
        dir.getDirectoryHandle(setup.UnitImage.IMAGEPACK_DIR_NAME).then(
          (subdir) => {
            resolve(subdir); // found "imagepacks", it is a subfolder of dir
          },
          () => {
            resolve(null); // we're in /dist, but imagepacks folder does not exist, so fail silently
          },
        );
      },
      () => {
        // check if user selected the parent folder
        dir.getDirectoryHandle("dist").then(
          (subdir) => {
            findImagePacksDir(subdir).then(resolve, reject);
          },
          () => {
            resolve(undefined); // failed to find it, report error
          },
        );
      },
    );
  });
}

let imagepacks_dir_handle: FileSystemDirectoryHandle | null = null;

function autodetectImagePacks_(): Promise<
  FileSystemDirectoryHandle | null | undefined | void
> {
  if (!imagepacks_dir_handle) {
    // if not picked during this session, prompt to pick it
    return window
      .showDirectoryPicker({ id: "foc-imagepacks", mode: "read" })
      .then((picked_dir) => {
        if (!picked_dir)
          // Cancelled by user, or failed to open
          return;

        return findImagePacksDir(picked_dir).then((detected_dir) => {
          imagepacks_dir_handle = detected_dir || null;

          if (detected_dir === undefined)
            return alert("The selected folder is not the game folder!");

          if (imagepacks_dir_handle)
            return setup.FileUtil.autodetectImagePacks();
        });
      });
  }

  return listImagePacks(imagepacks_dir_handle).then((detectedpacks) => {
    const packlist = [...(setup.globalsettings.imagepacks || [])];
    //.filter(x => x && setup.isAbsoluteUrl(x)) // leave entries with absolute path intact

    for (const detectedpack of detectedpacks) {
      if (!packlist.includes(detectedpack)) packlist.push(detectedpack);
    }

    setup.globalsettings.imagepacks = packlist;
  });
}

const DirHandles = {
  mods: {
    id: "foc-mods",
    expected_dir_name: MODS_DIR_NAME,
  },
  unpacked_mod: {
    id: "foc-mod-unpacked",
    expected_dir_name: null,
  },
  unit_custom_images: {
    id: "foc-unit-custom-images",
    expected_dir_name: "customunit",
  },
};

const dir_handles: {
  [k: string]: FileSystemDirectoryHandle | null | undefined;
} = {};

export const IndexedDB = {
  Store: {
    FilesystemHandles: "filesystem_handles",
  },

  open(): Promise<IDBDatabase | null> {
    if (!window.indexedDB) return Promise.resolve(null);

    return new Promise((resolve) => {
      const idbRequest = window.indexedDB.open("FOC", 1);
      idbRequest.onupgradeneeded = (event) => {
        const db = (event.target as IDBRequest).result;
        db.createObjectStore(IndexedDB.Store.FilesystemHandles, {
          keyPath: "id",
        });
      };
      idbRequest.onerror = () => resolve(null);
      idbRequest.onsuccess = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        resolve(db);
      };
    });
  },

  readFilesystemHandle(id: string): Promise<FileSystemHandle | null> {
    return IndexedDB.open().then((db) => {
      if (!db) return Promise.resolve(null);
      const transaction = db.transaction(
        [IndexedDB.Store.FilesystemHandles],
        "readonly",
      );
      return new Promise((resolve) => {
        const request = transaction
          .objectStore(IndexedDB.Store.FilesystemHandles)
          .get(id);
        request.onsuccess = (ev) =>
          resolve((ev.target as IDBRequest).result?.handle ?? null);
        transaction.onerror = (e) => (console.error(e), resolve(null));
      });
    });
  },

  saveFilesystemHandle(id: string, handle: FileSystemHandle): Promise<boolean> {
    return IndexedDB.open().then((db) => {
      if (!db) return Promise.resolve(false);
      const transaction = db.transaction(
        [IndexedDB.Store.FilesystemHandles],
        "readwrite",
      );
      return new Promise((resolve) => {
        const request = transaction
          .objectStore(IndexedDB.Store.FilesystemHandles)
          .put({
            id: id,
            handle: handle,
          });
        transaction.oncomplete = () => resolve(true);
        transaction.onerror = (e) => (console.error(e), resolve(false));
      });
    });
  },
};

/**
 * @param silently If true, don't open a dialog if missing the handle (so just try to retrieve it from storage)
 * @param force_pick If true, always open the dialog (ignore any stored handle)
 * @param sub_id A discriminator, used e.g. for each unpacked mod.
 */
export function openDir(
  options: (typeof DirHandles)[keyof typeof DirHandles],
  silently?: boolean,
  force_pick?: boolean,
  is_unpacked_mod?: boolean,
  sub_id?: string | null,
): Promise<FileSystemDirectoryHandle | null> {
  let uid = sub_id ? `${options.id}:${sub_id}` : options.id;

  const pickDirectory = () => {
    return window.showDirectoryPicker({ id: uid, mode: "read" }).then(
      (dir_handle) => {
        if (
          options.expected_dir_name &&
          dir_handle.name !== options.expected_dir_name
        ) {
          alert(
            `The selected directory "${dir_handle.name}" is not the FoC "${options.expected_dir_name}" folder!`,
          );
          return null;
        }
        if (is_unpacked_mod && !sub_id) {
          uid = `${options.id}:${dir_handle.name}`;
        }
        dir_handles[uid] = dir_handle;
        IndexedDB.saveFilesystemHandle(uid, dir_handle);
        return dir_handle;
      },
      (err) => {
        console.error("Filed to open directory", err);
        return null;
      },
    );
  };

  if (force_pick) return pickDirectory();

  let dir_handle = dir_handles[uid];
  if (dir_handle) return Promise.resolve(dir_handle);

  if (is_unpacked_mod && !sub_id) return Promise.resolve(null);

  // if first access in this session, try to recover handle from persistent browser storage
  return IndexedDB.readFilesystemHandle(uid).then((handleFromIDB) => {
    if (handleFromIDB && handleFromIDB.kind === "directory") {
      dir_handle = handleFromIDB as FileSystemDirectoryHandle;

      const query_permission_promise: Promise<PermissionState> =
        dir_handle.queryPermission
          ? dir_handle.queryPermission()
          : Promise.resolve("granted");

      return query_permission_promise.then<FileSystemDirectoryHandle | null>(
        (permission_state) => {
          if (permission_state === "granted") {
            dir_handles[uid] = dir_handle!;
            return dir_handle!;
          } else {
            if (silently) {
              dir_handles[uid] = null;
              return null;
            } else {
              return pickDirectory();
            }
          }
        },
      );
    }

    if (silently) {
      dir_handles[uid] = null;
      return null;
    } else {
      return pickDirectory();
    }
  });
}

export function openUnitCustomImagesDir(
  silently?: boolean,
): Promise<FileSystemDirectoryHandle | null> {
  return openDir(DirHandles.unit_custom_images, silently);
}

export function openModsDir(
  silently?: boolean,
): Promise<FileSystemDirectoryHandle | null> {
  return openDir(DirHandles.mods, silently);
}

export function openUnpackedModDir(
  unpacked_mod_id: string | null,
  silently?: boolean,
): Promise<FileSystemDirectoryHandle | null> {
  return openDir(DirHandles.mods, silently, undefined, true, unpacked_mod_id);
}

export function savePackedModFile(
  filename: string,
  contents: string,
): Promise<true | null> {
  return window
    .showSaveFilePicker({
      id: "foc-mod-packed",
      suggestedName: filename,
      //types: [ // somehow this seems to hang up some browsers...
      //  {
      //    description: 'Fort of Chains mod file',
      //    accept: { 'text/javascript': ['.focmod.js'] }
      //  }
      //]
    })
    .then(
      (file_handle) => {
        return file_handle
          .createWritable()
          .then((writable) => (writable.write(contents), writable))
          .then((writable) => writable.close())
          .then(() => true as const);
      },
      () => null,
    );
}
