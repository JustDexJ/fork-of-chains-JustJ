import { Show } from "solid-js";
import type { EquipmentSet } from "../../classes/equipment/EquipmentSet";
import { MenuItemAction, MenuItemText } from "../components/menubar/MenuItem";
import { setEquipmentSetOnUnit } from "../menu/equipmentsetpickequip";

export default {
  equipmentsetequip(equipment_set: EquipmentSet): DOM.Node {
    const units = State.variables.company.player
      .getUnits()
      .filter(
        (unit) =>
          unit.isCanWear(equipment_set) &&
          unit.getEquipmentSet() != equipment_set,
      );

    return setup.DOM.Roster.show({
      menu: "unitequipmentset",
      units: units,
      actions_callback: (unit) => (
        <>
          <MenuItemAction
            text={unit.getEquipmentSet() ? `Replace` : `Equip`}
            callback={() => {
              setEquipmentSetOnUnit(equipment_set, unit);
              setup.DOM.Nav.gotoreturn();
            }}
          />

          <Show when={unit.getEquipmentSet()}>
            <MenuItemText text={unit.getEquipmentSet()!.repJSX()} />
          </Show>
        </>
      ),
    });
  },
};
