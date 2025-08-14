declare global {
  /**
   * Settings that apply globally to all files.
   *
   * Redable/modifiable at `setup.globalsettings`
   */
  interface GlobalSettings {
    imagepacks?: readonly string[];

    /**
     * Paths of all the installed mods (regardless of if they are enabled)
     * Each entry can be in the form:
     *  - "mymod.focmod.js" (a packed mod in "mods/")
     *  - "mymod" (an unpacked mod folder in "mods/")
     *  - "https://.../mymod.focmod.js" (a packed mod hosted not locally)
     */
    mods_installed?: readonly string[];

    endweek_hide_banters?: boolean;
  }
}

export {}; // (needed to make this file a module)
