import type { Bedchamber } from "../../classes/bedchamber/BedChamber";
import { MenuItemAction } from "../components/menubar/MenuItem";

export default {
  bedchambersetslaver(bedchamber: Bedchamber): DOM.Node {
    const units = State.variables.company.player
      .getUnits({ job: setup.job.slaver })
      .filter((unit) => unit != bedchamber.getSlaver());
    return setup.DOM.Roster.show({
      menu: "unit",
      units: units,
      actions_callback: (unit) => (
        <>
          <MenuItemAction
            text="Select"
            callback={() => {
              bedchamber.setSlaver(unit);
              setup.DOM.Nav.gotoreturn();
            }}
          />
        </>
      ),
    });
  },
};
