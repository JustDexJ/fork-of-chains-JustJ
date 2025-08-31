import type { EventTemplateKey } from "../../classes/event/EventTemplate";
import { MenuItemAction } from "../components/menubar/MenuItem";

export default {
  quest_enlightenmentofthesoul(pupil: Unit): DOM.Node {
    const units = State.variables.company.player
      .getUnits({ job: setup.job.slaver })
      .filter(
        (unit) =>
          unit != State.variables.unit.player &&
          unit.isHasDick() &&
          unit != pupil,
      );

    return setup.DOM.Roster.show({
      menu: "unit",
      units: units,
      actions_callback: (unit: Unit) => (
        <>
          <MenuItemAction
            text="Select"
            callback={() => {
              const child = setup.UnitBirth.generateChild(
                unit,
                pupil,
                setup.job.slaver,
              );

              setup.qc
                .Event(
                  "enlightenment_of_the_soul___interlude2" as EventTemplateKey,
                  0,
                  {
                    child: "child",
                    pupil: "pupil",
                  },
                )
                .apply(
                  setup.costUnitHelperDict({
                    child: child,
                    pupil: pupil,
                  }),
                );
              setup.DOM.Nav.goto(`OpportunityList`);
            }}
          />
        </>
      ),
    });
  },
};
