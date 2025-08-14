import type { Equipment } from "../../classes/equipment/Equipment";
import type { EquipmentSet } from "../../classes/equipment/EquipmentSet";

function equipmentSetTopRightInfo(equipment_set: EquipmentSet): DOM.Node {
  const fragments: DOM.Attachable[] = [];
  fragments.push(html`
    <div>Value: ${setup.DOM.Util.money(equipment_set.getValue())}</div>
  `);
  const sluttiness = equipment_set.getSluttiness();
  if (sluttiness) {
    fragments.push(html`
      <div>Sluttiness: ${setup.DOM.Text.dangerlite(sluttiness)}</div>
    `);
  }
  return setup.DOM.create("span", { class: "toprightspan" }, fragments);
}

function removeEquipmentCallback(
  equipment: Equipment,
  equipment_set: EquipmentSet,
) {
  return () => {
    State.variables.armory.unassignEquipment(equipment, equipment_set);
    setup.DOM.Nav.goto();
  };
}

export default {
  equipmentset(
    equipment_set: EquipmentSet,
    hide_actions?: boolean,
    show_remove_button?: boolean,
  ): DOM.Node {
    const fragments: DOM.Attachable[] = [];

    // value and sluttiness
    fragments.push(equipmentSetTopRightInfo(equipment_set));

    // name and menu toolbar
    if (!hide_actions && !equipment_set.is_default) {
      fragments.push(setup.DOM.Util.menuItemToolbar(equipment_set.getMenu()));
    }

    // slutty indicator
    if (
      equipment_set.getSluttiness() >=
      setup.EQUIPMENT_SLAVER_SLUTTY_LIMIT_NORMAL
    ) {
      fragments.push(html`
        <div>
          This equipment is ${setup.DOM.Text.dangerlite("slutty")}
          ${setup.DOM.Util.help(() => {
            return html`
              Slavers cannot wear equipments whose sluttiness is
              ${setup.EQUIPMENT_SLAVER_SLUTTY_LIMIT_NORMAL} or higher.
              ${setup.trait.per_lustful.rep()}${setup.trait.per_sexaddict.rep()}
              increase this limit while ${setup.trait.per_chaste.rep()}
              decreases it.
            `;
          })}
        </div>
      `);
    }

    // unit restrictions
    {
      const restrictions = equipment_set.getUnitRestrictions();
      if (restrictions.length) {
        fragments.push(
          setup.DOM.Card.restriction(
            restrictions,
            /* obj = */ null,
            /* is show all = */ true,
          ),
        );
      }
    }

    // skill modifiers
    {
      const explanation = setup.SkillHelper.explainSkillMods(
        equipment_set.getSkillMods(),
      );
      if (explanation) {
        fragments.push(html` <div>${explanation}</div> `);
      }
    }

    // bonus traits
    {
      const traits = equipment_set.getTraits();
      if (traits.length) {
        fragments.push(html`
          <div>${traits.map((trait) => trait.rep()).join("")}</div>
        `);
      }
    }

    // equipment grid
    {
      const inner = [];
      for (const [slot, equipment] of equipment_set.getEquipmentsList()) {
        const very_inner = [];

        if (equipment) {
          very_inner.push(html`${equipment.rep()}`);
        } else {
          very_inner.push(html`
            <span class="empty-slot">${slot.rep()}</span>
            <span class="graytext">none</span>
          `);
        }

        if (show_remove_button && equipment) {
          very_inner.push(html`
            ${setup.DOM.Util.message(
              `(remove)`,
              removeEquipmentCallback(equipment, equipment_set),
            )}
          `);
        }

        inner.push(setup.DOM.create("div", {}, very_inner));
      }
      fragments.push(
        setup.DOM.create("div", { class: "equipmentgrid" }, inner),
      );
    }

    return setup.DOM.create(
      "div",
      { class: "equipmentsetcard card" },
      fragments,
    );
  },

  equipmentsetcompact(
    equipment_set: EquipmentSet,
    hide_actions?: boolean,
  ): DOM.Node {
    // async here?
    if (hide_actions) {
      return html` <div>${equipment_set.rep()}</div> `;
    } else {
      return html`
        <div>${setup.DOM.Util.menuItemToolbar(equipment_set.getMenu())}</div>
      `;
    }
  },
};
