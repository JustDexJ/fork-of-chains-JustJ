import { TwineClass } from "../_TwineClass";
import { Unit } from "../unit/Unit";
import { _MENUS as __MENUS } from "./_index";
import { MenuFilterHelper } from "./filterhelper";

export interface FilterMenuOption<T> {
  title: DOM.JSXElement;
  filter?: (instance: T) => boolean | unknown;
  sort?: (a: T, b: T) => number;
}

export type FilterMenuOptions<T> = Record<string, FilterMenuOption<T>>;

export interface FilterMenuEntry<T> {
  /** The label to display in the menu item */
  title: string;

  /** The placeholder text when no option is selected */
  default?: string;

  icon_menu?: boolean;

  /** If this returns true, this menu item/group won't show in the UI */
  should_be_visible?: (objects: readonly T[]) => boolean;

  /** Performs a full passage reload when its value si changed. */
  hardreload?: boolean;

  /** Key of other FilterMenuEntry of the same FilterMenu which will be reset when this option changes. */
  resets?: string[];

  /** Special case only set to true for tag menus, which handles the common case of filtering by tags. */
  tags_menu?: boolean;

  /** Special case only set to true for trait menus, which opens the Trait Picker when clicked. */
  trait_menu?: boolean;

  /** Do not show the downwards arrow (indicator of submenu). Mostly used for the config menu (config gear icon). */
  hidearrow?: boolean;

  make_filter?: (filter_values: string[]) => (instance: T) => boolean;

  /** Default filtering when no value is selected for this filter. */
  default_filter?: (instance: T) => boolean | unknown;

  /** Default sorting when no value is selected for this filter. */
  default_sort?: (a: T, b: T) => number;

  /**
   * The possible values for this menu option.
   * If a function is provided, it will be called each time just before rendering the menu.
   */
  options?:
    | FilterMenuOption<T>[]
    | FilterMenuOptions<T>
    | (() => FilterMenuOption<T>[] | FilterMenuOptions<T>);
}

type FilterMenuEntryResolved<T> = Omit<FilterMenuEntry<T>, "options"> & {
  options: FilterMenuOptions<T>;
};

export type FilterMenu<T> = Record<string, FilterMenuEntry<T>>;

export type FilterMenuResolved<T = unknown> = Record<
  string,
  FilterMenuEntryResolved<T>
>;

export type MenuParsed = { [k in MenuKey]?: FilterMenuResolved<unknown> };

export function down(text: string): string {
  return `${text} <i class="sfa sfa-arrow-down"></i>`;
}

export function up(text: string): string {
  return `${text} <i class="sfa sfa-arrow-up"></i>`;
}

export function getCallback(
  menu: MenuKey,
  key: string,
  value: any,
  hardreload?: boolean,
  extra_callback?: () => void,
) {
  return () => {
    State.variables.menufilter.set(menu, key, value);

    if (hardreload) {
      setup.runSugarCubeCommand("<<focgoto>>");
    } else {
      setup.DOM.refresh(".filtertoolbar");
      setup.DOM.Util.filterableRefresh(".filtercontainer");
      setup.runSugarCubeCommand('<<refreshable-refresh "#filtertoolbar">>');
      setup.runSugarCubeCommand('<<filterable-refresh "#filtercontainer">>');
    }

    if (extra_callback) extra_callback();
  };
}

function optionCallback(
  menu: MenuKey,
  option: MenuOptionKey,
  current_value: any,
) {
  return () => {
    if (current_value) {
      State.variables.menufilter.setOption(menu, option, /* value = */ null);
    } else {
      State.variables.menufilter.setOption(menu, option, /* value = */ true);
    }
    setup.runSugarCubeCommand("<<focgoto>>");
  };
}

export type MenuKey = keyof typeof MenuFilter._MENUS;
export type MenuOptionKey = keyof typeof MenuFilter.OPTIONS;

/**
 * Assigned to $menufilter.
 * Stores filter information about various menus.
 */
export class MenuFilter extends TwineClass {
  /**
   * {menu: {name: value}}
   */
  filters: { [k in MenuKey]?: Record<string, any> } = {};

  /**
   * Filter options for this, e.g., stickied, hidden, etc.
   */
  filter_option: { [k in MenuKey]?: Record<string, any> } = {};

  constructor() {
    super();
  }

  static OPTIONS = {
    sticky: {
      title: "Sticky",
      reverse: true,
    },
    hidden: {
      title: "Hidden",
      reverse: false,
    },
  };

  setOption(menu: MenuKey, option_key: MenuOptionKey, option_value: any) {
    if (!(option_key in MenuFilter.OPTIONS))
      throw new Error(`Unrecognized option: ${option_key}`);

    const option_meta = MenuFilter.OPTIONS[option_key];
    if (option_meta.reverse) {
      option_value = !option_value;
    }

    (this.filter_option[menu] ??= {})[option_key] = option_value;
  }

  getOption<T = any>(menu: MenuKey, option_key: MenuOptionKey): T | null {
    if (!(option_key in MenuFilter.OPTIONS))
      throw new Error(`Unrecognized option: ${option_key}`);

    const value = this.filter_option[menu]?.[option_key] ?? null;

    const option_obj = MenuFilter.OPTIONS[option_key];
    if (option_obj.reverse) {
      return !value as T;
    } else {
      return value;
    }
  }

  /**
   * Ensures that the given menu, key is in the filters object
   */
  _checkSet(menu: MenuKey, key: string) {
    const all_menus = MenuFilter._MENUS;
    if (!(menu in all_menus))
      throw new Error(`${menu} menu not found in filters`);
    if (key && !(key in all_menus[menu]))
      throw new Error(`key ${key} not found in filter menu ${menu}`);

    const container = (this.filters[menu] ??= {});
    if (!(key in container)) {
      container[key] = null;
    }
  }

  /**
   * Sets a filter value
   */
  set(menu: MenuKey, key: string, value: any, no_reset?: boolean) {
    (this.filters[menu] ??= {})[key] = value;

    // If there are other filters that needs to be reset, reset them.
    if (!no_reset && value) {
      const menu_parsed = MenuFilter.getMenus();
      const menu_obj = menu_parsed[menu]![key];
      for (const to_reset of menu_obj.resets || []) {
        this.set(menu, to_reset, /* value = */ null, /* no reset = */ true);
      }
    }
  }

  /**
   * Gets a filter value
   */
  get<T = any>(menu: MenuKey, key: string): T | null {
    return this.filters[menu]?.[key] ?? null;
  }

  getFilterFunc<K extends string | number, T extends { key: K }>(
    menu: MenuKey,
    objects_raw_raw: readonly T[],
    ignored_keys?: string[],
  ): () => string[] {
    if (!(menu in MenuFilter._MENUS))
      throw new Error(`Unknown menu ${menu} in filter`);

    // shallow copy
    let objects_raw = objects_raw_raw.filter(() => true);

    return () => {
      // create another shallow copy
      let objects: T[] = objects_raw.filter(() => true);

      const menu_copy = MenuFilter.getMenus(menu);
      for (const key in menu_copy[menu]) {
        if (ignored_keys && ignored_keys.includes(key)) continue;

        const menu_entry = menu_copy[menu][key];

        const value = this.get(menu, key);
        if (menu_entry.trait_menu) {
          // special case for trait menu. Assume objects are units.
          const traits = ((value as TraitKey[]) || []).map(
            (trait_key) => setup.trait[trait_key],
          );
          objects = objects.filter(
            (obj) => obj instanceof Unit && obj.isHasTraitsExact(traits),
          );
        } else if (value && Array.isArray(value)) {
          // handle filters that support selecting more than 1 simultaneous option
          if (value.length) {
            if (menu_entry.make_filter) {
              objects = objects.filter(menu_entry.make_filter(value));
            } else if (menu_entry.tags_menu) {
              objects = (
                objects as Array<T & { getTags: () => readonly string[] }>
              ).filter(MenuFilterHelper.makeTagsFilter(value));
            } else {
              const filter_funcs = value
                .map((k) => menu_entry.options[k].filter)
                .filter((f) => !!f);
              if (filter_funcs.length) {
                objects = objects.filter((obj) =>
                  filter_funcs.some((f) => f(obj)),
                );
              }
            }
          }
        } else if (value && value in menu_entry.options) {
          const value_object = menu_entry.options[value];
          if (value_object.filter) {
            objects = objects.filter(value_object.filter);
          }
          if (value_object.sort) {
            objects.sort(value_object.sort);
          }
        } else {
          if (menu_entry.default_filter) {
            objects = objects.filter(menu_entry.default_filter);
          }
          if (menu_entry.default_sort) {
            objects = objects.sort(menu_entry.default_sort);
          }
        }
      }

      return objects.map((object) => String(object.key));
    };
  }

  /**
   * Translate the functions in the menu
   * @param only_menu if supplied, only return this menu
   */
  static getMenus<T = unknown>(only_menu?: MenuKey): MenuParsed {
    const result: MenuParsed = {};

    let menu_keys: MenuKey[] = [];
    if (only_menu) {
      menu_keys = [only_menu];
    } else {
      menu_keys = objectKeys(MenuFilter._MENUS);
    }

    for (const menukey of menu_keys) {
      const menu_obj = MenuFilter._MENUS[menukey] as FilterMenu<T>;

      const menu_copy = { ...menu_obj } as FilterMenuResolved<T>;

      for (const key of Object.keys(menu_obj) as (keyof typeof menu_obj)[]) {
        const options_value = menu_obj[key].options;
        if (options_value instanceof Function) {
          // replace it with a shallow copy, resolving the function call
          menu_copy[key] = { ...menu_copy[key] };
          menu_copy[key].options = options_value() as FilterMenuOptions<T>;
        }
      }

      (result as any)[menukey] = menu_copy;
    }
    return result;
  }

  static _MENUS = __MENUS;
}
