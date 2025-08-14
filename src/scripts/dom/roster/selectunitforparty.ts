import type { Party } from "../../classes/party/Party";
import { menuItemAction, menuItemText } from "../../ui/menuitem";

export default {
  selectunitforparty(party: Party): DOM.Node {
    return setup.DOM.Roster.show({
      menu: "unit",
      units: State.variables.company.player
        .getUnits({})
        .filter((unit) => unit.getParty() != party),
      actions_callback: (unit: Unit) => {
        const menus = [];

        menus.push(
          menuItemAction({
            text: `Select`,
            callback: () => {
              const previous_party = unit.getParty();
              if (previous_party) {
                previous_party.removeUnit(unit);
              }
              party.addUnit(unit);
              setup.DOM.Nav.goto();
            },
          }),
        );

        if (unit.getParty()) {
          menus.push(
            menuItemText({
              text: html`
                ${setup.DOM.Text.dangerlite("Warning:")} this will remove this
                unit from ${unit.getParty()!.rep()}
              `,
            }),
          );
        }

        return menus;
      },
    });
  },
};
