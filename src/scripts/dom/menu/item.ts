import type { ItemUnitUsable } from "../../classes/inventory/subtypes/ItemUnitUsable";

export const DOM_Menu_useitemonunit = function (
  item: ItemUnitUsable,
  unit: Unit,
) {
  item.use(unit);
  setup.notify(`Used ${item.rep()} on a|rep.`, { a: unit });
  if (State.variables.inventory.isHasItem(item)) {
    setup.DOM.Nav.goto();
  } else {
    setup.DOM.Nav.goto("Inventory");
  }
};
