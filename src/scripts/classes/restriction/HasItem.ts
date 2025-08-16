export default class HasItem extends Restriction {
  item_key: ItemKey;

  constructor(item: Item | ItemKey | BuiltinItemKey) {
    super();

    if (!item) throw new Error(`Item null in HasItem`);
    this.item_key = resolveKey(item as Item | ItemKey);
  }

  override text() {
    return `setup.qres.HasItem(setup.item.${this.item_key})`;
  }

  getItem() {
    return setup.item[this.item_key];
  }

  override explain() {
    return `${this.getItem().rep()}`;
  }

  override isOk() {
    return State.variables.inventory.isHasItem(this.getItem());
  }
}
