import type { EquipmentSet } from "../../classes/equipment/EquipmentSet";
import { menuItemAction, menuItemText, menuItemTitle } from "../../ui/menuitem";

export function setEquipmentSetOnUnit(equipment_set: EquipmentSet, unit: Unit) {
  const previous_eq_set = unit.getEquipmentSet();
  if (previous_eq_set) {
    // unequip own equipment first
    previous_eq_set.unequip();
  }

  if (equipment_set.getUnit()) {
    // uenquip  previous owner
    equipment_set.unequip();
  }

  equipment_set.equip(unit);
}

/**
 * Pick an equipment set to be equipped by a unit.
 */
export const DOM_Menu_equipmentsetpickequip = function (unit: Unit): DOM.Node {
  const outer = [];

  let replace = "";
  const eq_set = unit.getEquipmentSet();
  if (eq_set) {
    replace = `, replacing ${eq_set.rep()}`;
  }

  outer.push(html`
    <div>
      Select equipment set to equip on ${unit.rep()}${replace}:
      ${setup.DOM.Nav.return("(cancel)")}
    </div>
  `);

  if (State.variables.armory.isCanAddNewEquipmentSet()) {
    outer.push(html`
      <div>
        ${setup.DOM.Nav.link(
          `(create a new equipment set and equip it)`,
          () => {
            const set = State.variables.armory.newEquipmentSet();
            setEquipmentSetOnUnit(set, unit);
            setup.DOM.Nav.gotoreturn();
          },
        )}
      </div>
    `);
  }

  let sets = State.variables.armory.getEquipmentSets();

  const eligibility = State.variables.menufilter.get(
    "equipmentsetpickequip",
    "eligibility",
  );
  if (eligibility == "all") {
  } else if (eligibility == "not") {
    sets = sets.filter((set) => !unit.isCanWear(set));
  } else {
    sets = sets.filter((set) => unit.isCanWear(set));
  }

  outer.push(
    setup.DOM.Util.filterAll({
      menu: "equipmentsetpickequip",
      filter_objects: sets,
      display_callback: (equipment_set) => {
        const fragments: DOM.Attachable[] = [];

        // get the menu
        const menu = [];
        menu.push(
          menuItemTitle({
            text: equipment_set.rep(),
          }),
        );

        if (equipment_set == unit.getEquipmentSet()) {
          menu.push(
            menuItemText({
              text: `Already wearing this`,
            }),
          );
        } else if (!unit.isCanWear(equipment_set)) {
          menu.push(
            menuItemText({
              text: `Not eligible`,
            }),
          );
        } else {
          menu.push(
            menuItemAction({
              text: equipment_set.getUnit() ? `Replace` : `Equip`,
              callback: () => {
                setEquipmentSetOnUnit(equipment_set, unit);
                setup.DOM.Nav.gotoreturn();
              },
            }),
          );
        }

        const eq_set = equipment_set.getUnit();
        if (eq_set) {
          menu.push(
            menuItemText({
              text: eq_set.rep(),
            }),
          );
        }

        fragments.push(setup.DOM.Util.menuItemToolbar(menu));

        if (
          State.variables.menufilter.get("equipmentsetpickequip", "display") ==
          "compact"
        ) {
          // don't add any other extra info
        } else {
          // append set info
          fragments.push(
            setup.DOM.Card.equipmentset(
              equipment_set,
              /* hide actions = */ true,
            ),
          );
        }

        return setup.DOM.create("div", {}, fragments);
      },
    }),
  );

  return setup.DOM.create("div", {}, outer);
};
