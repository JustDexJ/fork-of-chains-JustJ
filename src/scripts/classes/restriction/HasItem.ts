export default class HasItem extends Restriction {
  item_key: ItemKey;

  constructor(item: Item | ItemKey) {
    super();

    if (!item) throw new Error(`Item null in HasItem`);
    this.item_key = resolveKey(item);
  }

  override text(): string {
    return `setup.qres.HasItem(setup.item.${this.item_key})`;
  }

  getItem() {
    return setup.item[this.item_key];
  }

  override explain(): string {
    return `${this.getItem().rep()}`;
  }

  override isOk(): boolean {
    return State.variables.inventory.isHasItem(this.getItem());
  }
}
