import type { ItemKey } from "../inventory/Item";

export default class LoseItem extends Cost {
  item_key: ItemKey;
  quantity: number;

  constructor(item: Item | ItemKey, quantity?: number) {
    super();

    if (!item) throw new Error(`Null item pool`);
    this.item_key = resolveKey(item);
    this.quantity = quantity || 1;
  }

  override text(): string {
    return `setup.qc.LoseItem('${this.item_key}', ${this.quantity})`;
  }

  getItem(): Item {
    return setup.item[this.item_key];
  }

  override isOk(): boolean {
    return State.variables.inventory.countItem(this.getItem()) >= this.quantity;
  }

  override apply(context: CostContext) {
    for (let i = 0; i < this.quantity; ++i) {
      if (State.variables.inventory.isHasItem(this.getItem())) {
        State.variables.inventory.removeItem(this.getItem());
      }
    }
  }

  undoApply() {
    for (let i = 0; i < this.quantity; ++i) {
      State.variables.inventory.addItem(this.getItem());
    }
  }

  override explain(): string {
    return `Lose ${this.quantity}x ${this.getItem().rep()}`;
  }
}
