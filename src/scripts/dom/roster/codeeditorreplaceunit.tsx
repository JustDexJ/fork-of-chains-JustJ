import { MenuItemAction } from "../components/menubar/MenuItem";

export default {
  codeeditorreplaceunit(): DOM.Node {
    return setup.DOM.Roster.show({
      menu: "unit",
      units: State.variables.company.player.getUnits({}),
      actions_callback: (unit) => (
        <>
          <MenuItemAction
            text="Select"
            callback={() => {
              if (State.variables.dtEditActor == "Target") {
                State.variables.compiledquest.unit_key = unit.key;
              } else {
                State.variables.compiledquest.actor_unit_key_map[
                  State.variables.dtEditActor
                ] = unit.key;
              }
              delete State.variables.dtEditActor;

              setup.runSugarCubeCommand(`<<devgotoreturn>>`);
            }}
          />
        </>
      ),
    });
  },
};
