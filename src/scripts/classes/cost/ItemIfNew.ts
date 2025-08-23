import type { ItemKey } from "../inventory/Item";

export default class ItemIfNew extends Cost {
  item_key: ItemKey;

  constructor(item: Item | ItemKey) {
    super();

    if (!item) throw new Error(`Null item`);
    this.item_key = resolveKey(item);
  }

  override text(): string {
    return `setup.qc.ItemIfNew(setup.item.${this.item_key})`;
  }

  getItem(): Item {
    return setup.item[this.item_key];
  }

  override apply(context: CostContext) {
    const item = this.getItem();
    if (!State.variables.inventory.isHasItem(item)) {
      setup.qc.Item(this.getItem()).apply(context);
    }
  }

  override explain(): string {
    return `Gain ${this.getItem().rep()} unless you already have it`;
  }
}
