import { Show } from "solid-js";
import type { MenuKey } from "../../classes/filter/_filter";
import { UnitCard } from "../card/unit";
import { MenuItemTitle, MenuItemToolbar } from "../components/menubar/MenuItem";
import { FilterableList } from "../components/misc/FilterableList";

export const RosterMenuToolbar: Component<{
  unit: Unit;
  menus: DOM.JSXElement;
}> = (props) => {
  return (
    <MenuItemToolbar>
      <MenuItemTitle
        text={
          <>
            {setup.DOM.Util.level(props.unit.getLevel())}
            {props.unit.repLongJSX()}
          </>
        }
      />

      {props.menus}
    </MenuItemToolbar>
  );
};

export default {
  show({
    units,
    actions_callback,
    menu,
    is_menu_generated_async,
    no_compact_display,
  }: {
    units: Unit[];
    actions_callback: (unit: Unit) => DOM.JSXElement;
    menu: MenuKey;
    is_menu_generated_async?: boolean;
    no_compact_display?: boolean;
  }): DOM.Node {
    return setup.DOM.renderComponent(() => (
      <FilterableList
        menu={menu}
        filter_objects={units}
        display_callback={(unit) => {
          const renderMenu = () => {
            return (
              <RosterMenuToolbar unit={unit} menus={actions_callback(unit)} />
            );
          };

          //let actions_menu;
          //if (is_menu_generated_async) {
          //  actions_menu = setup.DOM.Util.async(() => renderMenu());
          //} else {
          //  actions_menu = renderMenu();
          //}

          return (
            <Show
              when={
                !no_compact_display &&
                State.variables.menufilter.get(menu, "display") == "compact"
              }
              fallback={
                <>
                  {renderMenu()}
                  <UnitCard unit={unit} show_actions={false} />
                </>
              }
            >
              {renderMenu()}
            </Show>
          );
        }}
      />
    ));
  },
};
