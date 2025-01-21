import type { Bedchamber } from "../../classes/bedchamber/BedChamber";
import type { FurnitureSlot } from "../../classes/furniture/FurnitureSlot";

function removeFurnitureCallback(slot: FurnitureSlot, bedchamber: Bedchamber) {
  return () => {
    bedchamber.setFurniture(slot, null);
    setup.DOM.Nav.goto();
  };
}

export default {
  bedchamber(
    bedchamber_or_key: Bedchamber | Bedchamber["key"],
    show_actions?: boolean,
    show_remove_button?: boolean,
  ): DOM.Node {
    const bedchamber = resolveObject(
      bedchamber_or_key,
      State.variables.bedchamber,
    );

    const fragments: DOM.Attachable[] = [];

    // name and menu toolbar
    fragments.push(
      setup.DOM.Util.menuItemToolbar(bedchamber.getMenu(show_actions)),
    );

    // slaves
    {
      const slaves = bedchamber.getSlaves();
      const inner = [];
      if (slaves.length) {
        inner.push(html` ${slaves.map((slave) => slave.rep()).join(" ")} `);
      } else {
        inner.push(html` ${setup.DOM.Text.dangerlite("No slaves")} `);
      }
      inner.push(
        setup.DOM.Util.message(`(Rules)`, () => {
          const option_map = bedchamber.getOptionMap();
          const very_inner = [];
          for (const [option_key, option_value] of objectEntries(option_map)) {
            very_inner.push(html`
              <div>
                Slaves
                ${(setup.BEDCHAMBER_OPTIONS as any)[option_key][option_value]
                  .text}.
              </div>
            `);
          }
          return setup.DOM.create("div", {}, very_inner);
        }),
      );
      fragments.push(setup.DOM.create("div", {}, inner));
    }

    // skill modifiers
    {
      const explanation = setup.SkillHelper.explainSkills(
        bedchamber.getSkillAddition(),
      );
      if (explanation) {
        fragments.push(html` <div>${explanation}</div> `);
      }
    }

    // furniture grid
    {
      const inner = [];
      for (const slot of Object.values(setup.furnitureslot)) {
        const furniture = bedchamber.getFurniture(slot);

        const very_inner = [];

        const span_prop: DOM.Attributes<"span"> = {};
        if (furniture.isBasic()) {
          span_prop.class = "graytext";
        }
        very_inner.push(setup.DOM.create("span", span_prop, furniture.rep()));

        if (show_remove_button && !furniture.isBasic()) {
          very_inner.push(html`
            ${setup.DOM.Util.message(
              `(remove)`,
              removeFurnitureCallback(slot, bedchamber),
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
};
