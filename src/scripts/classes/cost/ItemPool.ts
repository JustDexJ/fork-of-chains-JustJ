import type { ItemPool as ItemPool_, ItemPoolKey } from "../inventory/ItemPool";

export default class ItemPool extends Cost {
  itempool_key: ItemPoolKey;

  constructor(item_pool: ItemPool_ | ItemPoolKey) {
    super();

    if (!item_pool) throw new Error(`Null item pool`);
    this.itempool_key = resolveKey(item_pool);
  }

  override text(): string {
    return `setup.qc.ItemPool(setup.itempool.${this.itempool_key})`;
  }

  getItemPool(): ItemPool_ {
    return setup.itempool[this.itempool_key];
  }

  override apply(context?: CostContext) {
    State.variables.inventory.addItem(this.getItemPool().generateItem());
  }

  override explain(): string {
    return `Gain item from ${this.getItemPool().rep()}`;
  }
}
