import { menuItem, menuItemAction, menuItemText } from "../../ui/menuitem";
import { TwineClass } from "../_TwineClass";
import { Unit } from "../unit/Unit";
import { _MENUS as __MENUS } from "./_index";

export interface FilterMenuOption<T> {
  title: string;
  filter?: (instance: T) => boolean | unknown;
  sort?: (a: T, b: T) => number;
}

export type FilterMenuOptions<T> = Record<string, FilterMenuOption<T>>;

export interface FilterMenuEntry<T> {
  title: string;
  default?: string;
  icon_menu?: boolean;
  hidden?: boolean;
  hardreload?: boolean;
  resets?: string[];
  trait_menu?: boolean;
  default_filter?: (instance: T) => boolean | unknown;
  default_sort?: (a: T, b: T) => number;
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

type MenuParsed = { [k in MenuKey]?: FilterMenuResolved<unknown> };

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

  /**
   * Render a single filter menu (standard)
   */
  getMenuFilterToolbarSingleMenu(
    menu_parsed: MenuParsed,
    menu: MenuKey,
    key: string,
    extra_callback?: () => void,
  ): JQuery {
    const menu_obj = menu_parsed[menu]![key];
    const current_value = this.get(menu, key);
    let text = menu_obj.title;
    let options = menu_obj.options;

    if (current_value) {
      text = options[current_value].title;
      text = `<span class="lightgraytext">${text}</span>`;
    }
    text = `${text} <i class="sfa sfa-caret-down"></i>`;

    const children = [
      menuItem({
        text: menu_obj.default ?? "",
        checked: !current_value,
        callback: getCallback(
          menu,
          key,
          /* value = */ null,
          menu_obj.hardreload,
          extra_callback,
        ),
      }),
    ];

    for (const value in options) {
      const children_obj = options[value];
      children.push(
        menuItem({
          text: children_obj.title,
          checked: value == current_value,
          callback: getCallback(
            menu,
            key,
            value,
            menu_obj.hardreload,
            extra_callback,
          ),
        }),
      );
    }

    return menuItem({
      text: text,
      children: children,
      clickonly: true,
    });
  }

  /**
   * Render a single filter menu (trait menu)
   */
  getMenuFilterToolbarTraits(
    menu_parsed: MenuParsed,
    menu: MenuKey,
    key: string,
    units: readonly Unit[],
  ): JQuery {
    const menu_obj = menu_parsed[menu]![key];

    const current_traits = ((this.get(menu, key) as TraitKey[]) || []).map(
      (trait_key) => setup.trait[trait_key],
    );

    let text;
    if (current_traits.length) {
      text = current_traits.map((trait) => trait.rep());
    } else {
      text = menu_obj.title;
    }

    text = `${text} <i class="sfa sfa-caret-down"></i>`;

    // compute choice traits
    const trait_map: Record<TraitKey, boolean> = {};
    for (const unit of units) {
      for (const trait of unit.getTraits()) {
        trait_map[trait.key] = true;
      }
    }

    const trait_choices = objectKeys(trait_map).map(
      (trait_key) => setup.trait[trait_key],
    );
    trait_choices.sort(setup.Trait.cmp);

    return menuItem({
      text: text,
      callback: () => {
        setup.DevToolHelper.pickTraits(trait_choices, current_traits).then(
          (traits) => {
            getCallback(
              menu,
              key,
              traits.map((trait) => trait.key),
              /* hard reload = */ false,
            )();
          },
        );
      },
    });
  }

  /**
   * Construct the icon-based menus
   */
  renderIconMenu<T extends { key: string | number }>(
    menu: MenuKey,
    menus: MenuParsed,
    objects: readonly T[],
  ) {
    const toolbar_items = [];

    let iter = 0;
    for (const menu_key in menus[menu]) {
      const menu_obj = menus[menu][menu_key];
      if (menu_obj.hidden) continue;
      if (!menu_obj.icon_menu) continue;

      // First, construct the filtered objects
      const filter_func = this.getFilterFunc(menu, objects, [menu_key]);

      const ids = filter_func();
      const filtered = objects.filter((obj) => ids.includes(String(obj.key)));

      // Now construct the items one by one
      for (const option_key of Object.keys(menu_obj.options)) {
        const option_obj = menu_obj.options[option_key];
        const text = option_obj.title;
        if (this.get(menu, menu_key) == option_key) {
          // this is already selected
          toolbar_items.push(
            menuItem({
              text: text,
              cssclass: "submenu-tag-selected",
              callback: getCallback(menu, menu_key, /* value = */ null),
            }),
          );
        } else {
          // Compute the number of objects that would've been filtered by this tag
          const additional_filter_func = option_obj.filter;
          let obj_number = filtered.length;
          if (additional_filter_func) {
            obj_number = filtered.filter(additional_filter_func).length;
          }
          if (obj_number) {
            toolbar_items.push(
              menuItem({
                text: `${text} ${obj_number}`,
                cssclass: `submenu-tag-${iter}`,
                callback: getCallback(menu, menu_key, option_key),
              }),
            );
          }
        }
      }
      iter += 1;
    }

    return toolbar_items;
  }

  /**
   * Renders the filter toolbar into a jquery object.
   */
  renderNonIconMenu<T>(
    menu: MenuKey,
    menu_parsed: MenuParsed,
    objects: readonly T[],
  ): JQuery[] {
    if (!(menu in MenuFilter._MENUS))
      throw new Error(`Unrecognized menu filter: ${menu}`);

    const toolbar_items: JQuery[] = [];

    for (const key in menu_parsed[menu]) {
      if (menu_parsed[menu][key].hidden) continue;
      if (menu_parsed[menu][key].icon_menu) continue;
      let menu_item;
      if (menu_parsed[menu][key].trait_menu) {
        menu_item = this.getMenuFilterToolbarTraits(
          menu_parsed,
          menu,
          key,
          objects as readonly Unit[],
        );
      } else {
        menu_item = this.getMenuFilterToolbarSingleMenu(menu_parsed, menu, key);
      }
      toolbar_items.push(menu_item);
    }

    return toolbar_items;
  }

  getMenuFilterToolbarRender<T extends { key: string | number }>(
    menu: MenuKey,
    objects: readonly T[],
  ) {
    const menu_parsed = MenuFilter.getMenus();

    let toolbar_items: JQuery[] = [];

    if (!this.getOption(menu, "hidden")) {
      const icon_menu = this.renderIconMenu(menu, menu_parsed, objects);
      const non_icon_menu = this.renderNonIconMenu(menu, menu_parsed, objects);
      toolbar_items = toolbar_items.concat(non_icon_menu).concat(icon_menu);
    }

    const extras = [];

    for (const [option, option_obj] of objectEntries(MenuFilter.OPTIONS)) {
      extras.push(
        menuItem({
          text: option_obj.title,
          checked: !!this.getOption(menu, option),
          callback: optionCallback(menu, option, this.getOption(menu, option)),
        }),
      );
    }

    extras.push(
      menuItem({
        text: "Scroll to Top",
        callback: () => {
          document.body.scrollTop = 0;
          document.documentElement.scrollTop = 0;
        },
      }),
    );

    extras.push(
      menuItem({
        text: "Reset Filters",
        callback: () => {
          for (const key in menu_parsed[menu]) {
            State.variables.menufilter.set(menu, key, /* value = */ null);
          }
          setup.runSugarCubeCommand("<<focgoto>>");
        },
      }),
    );

    toolbar_items.push(
      menuItem({
        text: '<i class="sfa sfa-cog"></i>',
        clickonly: true,
        children: extras,
      }),
    );

    toolbar_items.push(
      menuItemText({
        text: `<span class='filterwidgetshown${menu}'></span> / ${objects.length}`,
      }),
    );

    return toolbar_items;
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

      // these elements have not been created yet by the time this func is called.
      setTimeout(() => {
        const shown = objects.length;
        $(`.filterwidgetshown${menu}`).text(shown.toString());
        if (shown < objects_raw.length) {
          $(`.filterwidgethidden${menu}`).text(
            `${objects_raw.length - shown} hidden by filters`,
          );
        } else {
          $(`.filterwidgethidden${menu}`).text("");
        }
      }, 1);

      return objects.map((object) => String(object.key));
    };
  }

  /**
   * Return menu filter as this checked.
   * If the value is something other than default, will remove the checked.
   */
  getMenuItemChecked(
    menu: MenuKey,
    key: string,
    on_change_callback: Function,
    tooltip?: string,
  ): JQuery {
    const menu_parsed = MenuFilter.getMenus(menu);
    const menu_obj = menu_parsed[menu]![key];
    const current_value = this.get(menu, key);
    let text = menu_obj.title;

    return menuItemAction({
      text: text,
      checked: !current_value,
      tooltip: tooltip,
      callback: () => {
        if (current_value) {
          this.set(menu, key, null);
        } else {
          this.set(
            menu,
            key,
            Array.isArray(menu_obj.options)
              ? menu_obj.options[0]
              : Object.keys(menu_obj.options)[0],
          );
        }
        on_change_callback();
      },
    });
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
