import { TwineClass } from "../_TwineClass";
import type { Item, ItemKey } from "./Item";
import type { ItemClass } from "./ItemClass";

/**
 * Special. Will be assigned to State.variables.inventory
 */
export class Inventory extends TwineClass {
  /** eg. {'apple': 3} */
  itemkey_quantity_map: { [k in ItemKey]?: number } = {};

  constructor() {
    super();
  }

  addItem(item: Item) {
    State.variables.statistics.add("items_obtained", 1);
    State.variables.statistics.acquireItem(item);

    const itemkey = item.key;
    const curr_amount = (this.itemkey_quantity_map[itemkey] ?? 0) | 0;
    this.itemkey_quantity_map[itemkey] = curr_amount + 1;

    setup.notify(`Obtained ${item.rep()}`);
  }

  removeItem(item: Item) {
    State.variables.statistics.add("items_lost", 1);

    const itemkey = item.key;
    const curr_amount = (this.itemkey_quantity_map[itemkey] ?? 0) | 0;
    if (curr_amount < 1) throw new Error(`Inventory bugged?`);
    if (curr_amount == 1) {
      delete this.itemkey_quantity_map[itemkey];
    } else {
      this.itemkey_quantity_map[itemkey] = curr_amount - 1;
    }
    setup.notify(`Lost ${item.rep()}`);
  }

  sell(item: Item) {
    State.variables.statistics.add("items_sold", 1);

    State.variables.company.player.addMoney(item.getSellValue());
    this.removeItem(item);
  }

  isHasItem(item: Item | ItemKey): boolean {
    const itemkey = resolveKey(item);
    const curr_amount = (this.itemkey_quantity_map[itemkey] ?? 0) | 0;
    return curr_amount > 0;
  }

  /**
   * Whether this item exists somewhere, either in the inventory or as a furniture used in a bedchamber.
   */
  isHasItemAnywhere(item: Item): boolean {
    if (this.isHasItem(item)) return true;
    if (item instanceof setup.Furniture) {
      for (const bedchamber of State.variables.bedchamberlist.getBedchambers()) {
        if (bedchamber.isHasFurniture(item)) return true;
      }
    }
    return false;
  }

  countItem(item: Item): number {
    return (this.itemkey_quantity_map[item.key] ?? 0) | 0;
  }

  getItems(): Array<{ item: Item; quantity: number }> {
    const result: Array<{ item: Item; quantity: number }> = [];
    for (const [itemkey, amount] of objectEntries(this.itemkey_quantity_map)) {
      const curr_amount = (amount ?? 0) | 0;
      if (curr_amount > 0) {
        result.push({ item: setup.item[itemkey], quantity: curr_amount });
      }
    }
    result.sort((a, b) => setup.Item.cmp(a.item, b.item));
    return result;
  }

  /**
   * Whether the inventory has any item of this class
   */
  isHasItemWithItemClass(item_class: ItemClass): boolean {
    return (
      this.getItems().filter(
        (item_obj) => item_obj.item.getItemClass() == item_class,
      ).length > 0
    );
  }
}
