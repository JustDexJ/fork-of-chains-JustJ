import type { Equipment } from "../../classes/equipment/Equipment";
import type { EquipmentSet } from "../../classes/equipment/EquipmentSet";
import { FilterableList } from "../components/misc/FilterableList";

export const DOM_Menu_equipmentsetedit = function (
  equipment_set: EquipmentSet,
): DOM.Node {
  const fragments: DOM.Attachable[] = [];

  // show the equipment set, as well as remove buttons
  fragments.push(
    setup.DOM.Card.equipmentset(
      equipment_set,
      /* show actions = */ true,
      /* show_remove_button = */ true,
    ),
  );

  // show the list of equipments to attach
  const equipments = State.variables.armory.getEquipments();

  fragments.push(
    setup.DOM.renderComponent(FilterableList, {
      menu: "equipmentattach" as const,
      filter_objects: equipments.map((equipment_obj) => equipment_obj[0]),
      display_callback: (equipment: Equipment) => {
        const inner = [];
        const current = equipment_set.getEquipmentAtSlot(equipment.getSlot());
        const is_can_attach = equipment_set.isCanAttach(equipment);

        const very_inner = [];
        if (current == equipment) {
          very_inner.push(html` Already equipped: `);
        } else if (!is_can_attach) {
          very_inner.push(html`
            Unit ${setup.DOM.Text.dangerlite("cannot")} wear:
          `);
        } else {
          very_inner.push(html`
            ${setup.DOM.Nav.button(`Attach`, () => {
              State.variables.armory.replaceEquipment(equipment, equipment_set);
              setup.DOM.Nav.goto();
            })}
          `);
        }
        very_inner.push(
          html`${equipment.getSlot().rep()}${equipment.repFull()}`,
        );
        if (current != equipment && is_can_attach && current) {
          very_inner.push(html` (replacing ${current.repFull()}) `);
        }

        inner.push(setup.DOM.create("div", {}, very_inner));

        return setup.DOM.create("div", {}, inner);
      },
    }),
  );

  return setup.DOM.create("div", {}, fragments);
};
