import { createMemo, createSignal, For, Show } from "solid-js";
import type { MenuKey } from "../../../classes/filter/_filter";
import { FilterToolbar } from "../menubar/FilterToolbar";
import { RefreshableContext } from "./RefreshableContext";

export type ObjectWithKey = { key: string | number };

export interface FilterableListProps<T extends ObjectWithKey, D = T> {
  menu: MenuKey;
  filter_objects: readonly T[];
  display_callback: (obj: D, getDisplayMode: () => string) => DOM.JSXElement;
  display_objects?: readonly D[];
  style_override?: string;
  onFiltersChanged?: () => void;
}

/**
 * Renders a customizable list of objects,
 * plus a toolbar (`FilterToolbar`) to filter/sort the objects.
 */
export const FilterableList = <T extends ObjectWithKey, D = T>(
  props: FilterableListProps<T, D>,
) => {
  const [getForceRefresh, setForceRefresh] = createSignal(0);

  const subscribeToRefresh = getForceRefresh;
  const refresh = () => {
    setForceRefresh(getForceRefresh() + 1);
    props.onFiltersChanged?.();
  };

  const getFilteredKeys = createMemo(() => {
    subscribeToRefresh(); // subscribe to signal

    const filter_callback = State.variables.menufilter.getFilterFunc(
      props.menu,
      props.filter_objects,
    );

    return filter_callback();
  });

  const getDisplayMode = () => {
    subscribeToRefresh();
    return State.variables.menufilter.get(props.menu, "display");
  };

  //if (!(menu in setup.MenuFilter._MENUS)) {
  //  throw new Error(`menu ${menu} not found`);
  //}

  const getDisplayObject = (key: T["key"]) => {
    const i = props.filter_objects.findIndex((obj) => obj.key == key);
    return (props.display_objects || props.filter_objects)[i] as D;
  };

  return (
    <RefreshableContext.Provider
      value={{
        subscribeToRefresh,
        refresh,
      }}
    >
      <Show when={State.variables.fort.player.isHasBuilding("greathall")}>
        <div
          class={
            (subscribeToRefresh(),
            State.variables.menufilter.getOption(props.menu, "sticky"))
              ? "tagtoolbarsticky"
              : undefined
          }
        >
          <div class="filtertoolbar">
            <FilterToolbar
              menu={props.menu}
              objects={props.filter_objects}
              num_filtered_objects={getFilteredKeys().length}
              onFiltersChanged={refresh}
            />
          </div>
        </div>
      </Show>

      <div class="filtercontainer">
        <div
          style={
            props.style_override || "display: flex; flex-direction: column; "
          }
        >
          <For each={getFilteredKeys()}>
            {(key) => {
              try {
                return (
                  <article data-filter-key={key}>
                    {props.display_callback(
                      getDisplayObject(key),
                      getDisplayMode,
                    )}
                  </article>
                );
              } catch (ex) {
                return setup.DOM.Util.exception(ex);
              }
            }}
          </For>
        </div>
      </div>

      <div class="lightgraytext">
        <Show when={getFilteredKeys().length < props.filter_objects.length}>
          {props.filter_objects.length - getFilteredKeys().length} hidden by
          filters
        </Show>
      </div>
    </RefreshableContext.Provider>
  );
};
