import type { InstalledMod } from "./modmanager";

export namespace DataUtil {
  /** Will reference the current mod being loaded, if any. */
  export let CURRENT_MOD: InstalledMod | null = null;

  export function load<T extends {}, A extends [Readonly<T>]>(
    klass: { new (...args: A | any): any },
    definitions: Record<string, T>,
    mod?: InstalledMod,
  ) {
    for (let [key, def] of Object.entries(definitions)) {
      if (mod && !("key" in def) && key) {
        def = { ...def, key };
      }
      new klass(def);
    }
  }
}
