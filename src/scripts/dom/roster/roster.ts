import type { MenuKey } from "../../classes/filter/_filter";
import { menuItemTitle } from "../../ui/menuitem";

export function parseRosterMenuToolbar(unit: Unit, menus: JQuery[]): DOM.Node {
  return setup.DOM.Util.menuItemToolbar(
    [
      menuItemTitle({
        text: `${setup.DOM.toString(setup.DOM.Util.level(unit.getLevel()))} ${unit.repLong()}`,
      }),
    ].concat(menus),
  );
}

export default {
  show({
    units,
    actions_callback,
    menu,
    is_menu_generated_async,
    no_compact_display,
  }: {
    units: Unit[];
    actions_callback: (unit: Unit) => JQuery[];
    menu: MenuKey;
    is_menu_generated_async?: boolean;
    no_compact_display?: boolean;
  }): DOM.Node {
    return setup.DOM.Util.filterAll({
      menu: menu,
      filter_objects: units,
      display_callback: (unit) => {
        function generateMenu() {
          return parseRosterMenuToolbar(unit, actions_callback(unit));
        }

        let actions_menu;
        if (is_menu_generated_async) {
          actions_menu = setup.DOM.Util.async(() => generateMenu());
        } else {
          actions_menu = generateMenu();
        }

        if (
          !no_compact_display &&
          State.variables.menufilter.get(menu, "display") == "compact"
        ) {
          return actions_menu;
        } else {
          return html`
            ${actions_menu}
            <div>${setup.DOM.Card.unit(unit, /* hide actions = */ true)}</div>
          `;
        }
      },
    });
  },
};
