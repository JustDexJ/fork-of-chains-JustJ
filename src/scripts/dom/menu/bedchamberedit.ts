import type { Bedchamber } from "../../classes/bedchamber/BedChamber";
import type { Furniture } from "../../classes/furniture/Furniture";

export const DOM_Menu_bedchamberedit = function (
  bedchamber: Bedchamber,
): DOM.Node {
  const fragments: DOM.Attachable[] = [];

  // show the bedchamber, as well as remove buttons
  fragments.push(
    setup.DOM.Card.bedchamber(
      bedchamber,
      /* hide actions = */ false,
      /* show_remove_button = */ true,
    ),
  );

  // show the list of furniture to attach

  const furnitures = State.variables.inventory
    .getItems()
    .map((item_obj) => item_obj.item)
    .filter((item) => item instanceof setup.Furniture);

  fragments.push(
    setup.DOM.Util.filterAll({
      menu: "furnitureattach",
      filter_objects: furnitures,
      display_callback: (furniture: Furniture) => {
        const inner = [];
        const current = bedchamber.getFurniture(furniture.getSlot());

        const very_inner = [];
        if (current == furniture) {
          very_inner.push(html` Already in room: `);
        } else {
          very_inner.push(html`
            ${setup.DOM.Nav.button(`Attach`, () => {
              bedchamber.setFurniture(furniture.getSlot(), furniture);
              setup.DOM.Nav.goto();
            })}
          `);
        }

        very_inner.push(html`${furniture.repFull()}`);
        if (current != furniture && !current.isBasic()) {
          very_inner.push(html` (replacing ${current.repFull()}) `);
        }

        inner.push(setup.DOM.create("div", {}, very_inner));

        return setup.DOM.create("div", {}, inner);
      },
    }),
  );

  return setup.DOM.create("div", {}, fragments);
};
