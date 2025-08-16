import type { Item as Item_, ItemKey } from "../inventory/Item";

export default class Item extends Cost {
  item_key: ItemKey;
  quantity: number;

  constructor(item: Item_ | ItemKey, quantity?: number) {
    super();

    if (!item) throw new Error(`Null item`);
    this.item_key = resolveKey(item);
    this.quantity = quantity || 1;
  }

  override text() {
    return `setup.qc.Item(setup.item.${this.item_key}, ${this.quantity})`;
  }

  getItem(): Item_ {
    return setup.item[this.item_key];
  }

  override apply(context?: CostContext) {
    for (let i = 0; i < this.quantity; ++i) {
      State.variables.inventory.addItem(this.getItem());
    }
  }

  override explain() {
    return `Gain ${this.quantity}x ${this.getItem().rep()}`;
  }
}
