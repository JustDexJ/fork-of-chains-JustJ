import type { EquipmentSet } from "../../classes/equipment/EquipmentSet";
import { menuItemAction, menuItemText } from "../../ui/menuitem";
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
      actions_callback: (unit) => {
        const menus = [];

        menus.push(
          menuItemAction({
            text: unit.getEquipmentSet() ? `Replace` : `Equip`,
            callback: () => {
              setEquipmentSetOnUnit(equipment_set, unit);
              setup.DOM.Nav.gotoreturn();
            },
          }),
        );

        const eq_set = unit.getEquipmentSet();
        if (eq_set) {
          menus.push(
            menuItemText({
              text: eq_set.rep(),
            }),
          );
        }

        return menus;
      },
    });
  },
};
