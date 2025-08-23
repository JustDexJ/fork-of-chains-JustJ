export default class SlaveBedchamberHasFurniture extends Restriction.Unit {
  item_key: ItemKey;

  constructor(item: Item | ItemKey) {
    super();

    if (!item) throw new Error(`Item null in SlaveBedchamberHasFurniture`);
    this.item_key = resolveKey(item);
  }

  override text(): string {
    return `setup.qres.SlaveBedchamberHasFurniture(setup.item.${this.item_key})`;
  }

  getItem() {
    return setup.item[this.item_key];
  }

  override explain(): string {
    return `Unit is a slave in a bedchamber with ${this.getItem().rep()}`;
  }

  override isOk(unit: Unit): boolean {
    let bedchamber = unit.getBedchamber();
    if (!bedchamber) return false;

    let item = this.getItem();
    return (
      item instanceof setup.Furniture &&
      bedchamber.getFurniture(item.getSlot()) == item
    );
  }
}
