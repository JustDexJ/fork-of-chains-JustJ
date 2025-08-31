import { Show } from "solid-js";
import type { Party } from "../../classes/party/Party";
import { MenuItemAction, MenuItemText } from "../components/menubar/MenuItem";

export default {
  selectunitforparty(party: Party): DOM.Node {
    return setup.DOM.Roster.show({
      menu: "unit",
      units: State.variables.company.player
        .getUnits({})
        .filter((unit) => unit.getParty() != party),
      actions_callback: (unit: Unit) => (
        <>
          <MenuItemAction
            text="Select"
            callback={() => {
              const previous_party = unit.getParty();
              if (previous_party) {
                previous_party.removeUnit(unit);
              }
              party.addUnit(unit);
              setup.DOM.Nav.goto();
            }}
          />

          <Show when={unit.getParty()}>
            <MenuItemText
              text={
                <>
                  {setup.DOM.Text.dangerlite("Warning:")} this will remove this
                  unit from {unit.getParty()!.repJSX()}
                </>
              }
            />
          </Show>
        </>
      ),
    });
  },
};
