export default class NoItem extends Restriction {
  item_key: ItemKey;

  constructor(item: Item | ItemKey) {
    super();

    if (!item) throw new Error(`Item null in NoItem`);
    this.item_key = resolveKey(item);
  }

  static NAME = "Do not have an item";
  static PASSAGE = "RestrictionNoItem";

  override text() {
    return `setup.qres.NoItem(setup.item.${this.item_key})`;
  }

  getItem() {
    return setup.item[this.item_key];
  }

  override explain() {
    return `Do not have ${this.getItem().rep()}`;
  }

  override isOk() {
    return !State.variables.inventory.isHasItem(this.getItem());
  }
}
