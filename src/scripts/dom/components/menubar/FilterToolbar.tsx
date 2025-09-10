import {
  createMemo,
  createSignal,
  For,
  Show,
  useContext,
  type JSX,
} from "solid-js";
import {
  MenuFilter,
  type MenuKey,
  type MenuOptionKey,
  type MenuParsed,
} from "../../../classes/filter/_filter";
import { MenuFilterHelper } from "../../../classes/filter/filterhelper";
import { TweeSpan } from "../common";
import type { ObjectWithKey } from "../misc/FilterableList";
import { RefreshableContext } from "../misc/RefreshableContext";
import { MenuItem, MenuItemText, MenuItemToolbar } from "./MenuItem";

export function setValue(
  menu: MenuKey,
  key: string,
  value: any,
  context: { refresh(): void },
) {
  State.variables.menufilter.set(menu, key, value);

  context.refresh();
}

export function makeCallback(
  menu: MenuKey,
  key: string,
  value: any,
  context: { refresh(): void },
  hardreload?: boolean,
  extra_callback?: () => void,
) {
  return () => {
    setValue(menu, key, value, context);

    //if (hardreload) {
    //  setup.runSugarCubeCommand("<<focgoto>>");
    //} else {
    //  setup.DOM.refresh(".filtertoolbar");
    //  setup.DOM.Util.filterableRefresh(".filtercontainer");
    //  setup.runSugarCubeCommand('<<refreshable-refresh "#filtertoolbar">>');
    //  setup.runSugarCubeCommand('<<filterable-refresh "#filtercontainer">>');
    //}

    if (extra_callback) extra_callback();
  };
}

/**
 * Gets a value for CSS min-width which will reserve space for up to the given number
 * (used so that if the actual value changes, layout doesn't change)
 */
function getMinWidthValueForMaxNumber(max_value: number): string {
  return `${1 + Math.floor(Math.log10(max_value))}ch`;
}

/**
 * Render one filter menu entry (a non-special one: traits filter uses another variant)
 */
export function MenuFilterToolbarSingleMenu(props: {
  menu_parsed: MenuParsed;
  menu: MenuKey;
  filter_key: string;
  extra_callback?: () => void;
}): JSX.Element {
  const context = useContext(RefreshableContext);

  const getMenuObj = () => props.menu_parsed[props.menu]![props.filter_key];

  const getCurrentValue = () => {
    context.subscribeToRefresh();
    return State.variables.menufilter.get(props.menu, props.filter_key);
  };

  const renderTitle = (title: JSX.Element | string) => {
    return typeof title === "string" ? <TweeSpan>{title}</TweeSpan> : title;
  };

  return (
    <MenuItem
      text={
        <>
          <Show
            when={getCurrentValue()}
            fallback={renderTitle(getMenuObj().title)}
          >
            <span class="lightgraytext">
              {renderTitle(getMenuObj().options[getCurrentValue()].title)}
            </span>
          </Show>
          <Show when={!getMenuObj().hidearrow}>
            <i class="sfa sfa-caret-down" />
          </Show>
        </>
      }
      clickonly={true}
    >
      <MenuItem
        text={getMenuObj().default ?? ""}
        checked={!getCurrentValue()}
        callback={makeCallback(
          props.menu,
          props.filter_key,
          /* value = */ null,
          context,
          getMenuObj().hardreload,
          props.extra_callback,
        )}
      />

      <For each={objectKeys(getMenuObj().options)}>
        {(value) => (
          <MenuItem
            text={getMenuObj().options[value].title}
            checked={value == getCurrentValue()}
            callback={makeCallback(
              props.menu,
              props.filter_key,
              value,
              context,
              getMenuObj().hardreload,
              props.extra_callback,
            )}
          />
        )}
      </For>
    </MenuItem>
  );
}

/**
 * Render a single filter menu (trait menu)
 */
function MenuFilterToolbarTraits(props: {
  menu_parsed: MenuParsed;
  menu: MenuKey;
  filter_key: string;
  units: readonly Unit[];
}): JSX.Element {
  const context = useContext(RefreshableContext);

  const menu_obj = props.menu_parsed[props.menu]![props.filter_key];

  const getCurrentTraits = () => {
    context.subscribeToRefresh();

    return (
      (State.variables.menufilter.get(
        props.menu,
        props.filter_key,
      ) as TraitKey[]) || []
    ).map((trait_key) => setup.trait[trait_key]);
  };

  const getText = () => {
    const current_traits = getCurrentTraits();
    if (current_traits.length) {
      return current_traits.map((trait) => trait.repJSX());
    } else {
      return menu_obj.title;
    }
  };

  return (
    <MenuItem
      text={
        <>
          {getText()}
          <i class="sfa sfa-caret-down"></i>
        </>
      }
      callback={() => {
        // compute choice traits
        const trait_map: { [k in TraitKey]?: boolean } = {};
        for (const unit of props.units) {
          for (const trait of unit.getTraits()) {
            trait_map[trait.key] = true;
          }
        }

        const trait_choices = objectKeys(trait_map).map(
          (trait_key) => setup.trait[trait_key],
        );
        trait_choices.sort(setup.Trait.cmp);

        setup.DevToolHelper.pickTraits(trait_choices, getCurrentTraits()).then(
          (traits) => {
            makeCallback(
              props.menu,
              props.filter_key,
              traits.map((trait) => trait.key),
              context,
              /* hard reload = */ false,
            )();
          },
        );
      }}
    />
  );
}

/**
 * Construct an icon-based menu (e.g. for tag filters)
 */
function IconMenu<T extends { key: string | number }>(props: {
  menu: MenuKey;
  menu_parsed: MenuParsed;
  objects: readonly T[];
}) {
  const context = useContext(RefreshableContext);

  const shouldBeVisible = (menu_key: string) => {
    const menu_obj = props.menu_parsed[props.menu]![menu_key];
    if (
      menu_obj.should_be_visible &&
      !menu_obj.should_be_visible(props.objects)
    )
      return false;
    if (!menu_obj.icon_menu) return false;
    return true;
  };

  const getCurrentValues = (menu_key: string) => {
    context.subscribeToRefresh();
    const raw_value = State.variables.menufilter.get<string[]>(
      props.menu,
      menu_key,
    );
    return Array.isArray(raw_value) ? raw_value : [];
  };

  return (
    <For each={objectEntries(props.menu_parsed[props.menu]!)}>
      {([menu_key, menu_obj], getGroupIndex) => {
        const getFilteredObjects = createMemo(() => {
          context.subscribeToRefresh();

          // First, construct the filtered objects
          const filter_func = State.variables.menufilter.getFilterFunc(
            props.menu,
            props.objects,
            [menu_key],
          );

          const ids = filter_func();

          return props.objects.filter((obj) => ids.includes(String(obj.key)));
        });

        // Get the total count regardless of current filters
        // Used to avoid showing a tag at all if there's no a single object with it
        const getUnfilteredObjCountForOption = (option_key: string): number => {
          const filter_func = menu_obj.options[option_key].filter;
          if (filter_func) {
            return props.objects.filter(filter_func).length;
          } else if (menu_obj.make_filter || menu_obj.tags_menu) {
            const filter_values = [option_key];
            const filter_func = (
              menu_obj.make_filter ?? MenuFilterHelper.makeTagsFilter
            )(filter_values);
            return props.objects.filter(filter_func as any).length;
          }
          return props.objects.length;
        };

        /**
         * Compute the number of objects that would've been filtered by this tag
         * (so if we applied the current filter + this filter)
         */
        const getObjCountForOption = (option_key: string): number => {
          const filter_func = menu_obj.options[option_key].filter;
          if (filter_func) {
            return getFilteredObjects().filter(filter_func).length;
          } else if (menu_obj.make_filter || menu_obj.tags_menu) {
            const filter_values = [option_key];
            const filter_func = (
              menu_obj.make_filter ?? MenuFilterHelper.makeTagsFilter
            )(filter_values);
            return getFilteredObjects().filter(filter_func as any).length;
          } else {
            return getFilteredObjects().length;
          }
        };

        // Now construct the items one by one
        return (
          <Show when={shouldBeVisible(menu_key)}>
            <For each={objectKeys(menu_obj.options)}>
              {(option_key) => (
                <Show
                  when={
                    getCurrentValues(menu_key).includes(option_key) ||
                    getUnfilteredObjCountForOption(option_key) > 0
                  }
                >
                  <MenuItem
                    text={
                      <>
                        {menu_obj.options[option_key].title}{" "}
                        <small
                          style={{
                            "min-width": getMinWidthValueForMaxNumber(
                              getUnfilteredObjCountForOption(option_key),
                            ),
                          }}
                        >
                          {getObjCountForOption(option_key)}
                        </small>
                      </>
                    }
                    cssclass={
                      `submenu-tag-${getGroupIndex()}` +
                      (getCurrentValues(menu_key).includes(option_key)
                        ? " submenu-tag-selected"
                        : getObjCountForOption(option_key) === 0
                          ? " submenu-tag-nomatches"
                          : "")
                    }
                    callback={(ev) => {
                      const current_values = getCurrentValues(menu_key);
                      const new_values = current_values.includes(option_key)
                        ? current_values.filter((k) => k !== option_key)
                        : ev.shiftKey
                          ? [...current_values, option_key]
                          : [option_key];

                      setValue(props.menu, menu_key, new_values, context);
                    }}
                  />
                </Show>
              )}
            </For>
          </Show>
        );
      }}
    </For>
  );
}

/**
 * Renders the filter toolbar into a jquery object.
 */
function NonIconMenu<T>(props: {
  menu: MenuKey;
  menu_parsed: MenuParsed;
  objects: readonly T[];
}): JSX.Element {
  if (!(props.menu in MenuFilter._MENUS))
    throw new Error(`Unrecognized menu filter: ${props.menu}`);

  return (
    <For each={objectKeys(props.menu_parsed[props.menu]!)}>
      {(key) => {
        const entry = props.menu_parsed[props.menu]![key];

        if (entry.should_be_visible && !entry.should_be_visible(props.objects))
          return null;
        if (entry.icon_menu) return null;

        if (entry.trait_menu) {
          return (
            <MenuFilterToolbarTraits
              menu_parsed={props.menu_parsed}
              menu={props.menu}
              filter_key={key}
              units={props.objects as readonly Unit[]}
            />
          );
        } else {
          return (
            <MenuFilterToolbarSingleMenu
              menu_parsed={props.menu_parsed}
              menu={props.menu}
              filter_key={key}
            />
          );
        }
      }}
    </For>
  );
}

/**
 * Renders a `MenuItemToolbar` using a predefined menu definition (e.g. for units, quests, etc.)
 */
export const FilterToolbar = <
  T extends ObjectWithKey,
  D = ObjectWithKey,
>(props: {
  menu: MenuKey;
  objects: readonly T[];
  num_filtered_objects: number;
  onFiltersChanged?: () => void;
}) => {
  const [getForceRefresh, setForceRefresh] = createSignal(0);

  const menu_parsed = MenuFilter.getMenus();

  const refresh = () => {
    setForceRefresh(getForceRefresh() + 1);
    props.onFiltersChanged?.();
  };

  const getOption = (option: MenuOptionKey) => {
    const _ = getForceRefresh(); // subscribe to signal
    return !!State.variables.menufilter.getOption(props.menu, option);
  };

  const subscribeToRefresh = getForceRefresh;

  return (
    <RefreshableContext.Provider
      value={{
        subscribeToRefresh,
        refresh,
      }}
    >
      <MenuItemToolbar>
        <Show
          when={
            (subscribeToRefresh(),
            !State.variables.menufilter.getOption(props.menu, "hidden"))
          }
        >
          <IconMenu
            menu={props.menu}
            menu_parsed={menu_parsed}
            objects={props.objects}
          />
          <NonIconMenu
            menu={props.menu}
            menu_parsed={menu_parsed}
            objects={props.objects}
          />
        </Show>

        <MenuItem text={<i class="sfa sfa-cog" />} clickonly={true}>
          <MenuItem
            text="Reset Filters"
            callback={() => {
              for (const key in menu_parsed[props.menu]) {
                State.variables.menufilter.set(
                  props.menu,
                  key,
                  /* value = */ null,
                );
              }

              refresh();
            }}
          />

          <MenuItem
            text="Scroll to Top"
            callback={() => {
              document.body.scrollTop = 0;
              document.documentElement.scrollTop = 0;
            }}
          />

          <For each={objectEntries(MenuFilter.OPTIONS)}>
            {([option, option_obj]) => (
              <MenuItem
                text={option_obj.title}
                checked={getOption(option)}
                callback={() => {
                  State.variables.menufilter.setOption(
                    props.menu,
                    option,
                    /* value = */ getOption(option) ? null : true,
                  );
                  refresh();
                }}
              />
            )}
          </For>
        </MenuItem>

        <MenuItemText
          text={
            <>
              <span
                style={{
                  "text-align": "right",
                  "min-width": getMinWidthValueForMaxNumber(
                    props.objects.length,
                  ),
                }}
              >
                {props.num_filtered_objects}{" "}
              </span>
              <span>/</span>
              <span>{props.objects.length}</span>
            </>
          }
        />
      </MenuItemToolbar>
    </RefreshableContext.Provider>
  );
};
