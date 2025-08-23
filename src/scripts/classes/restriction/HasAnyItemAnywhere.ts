export default class HasAnyItemAnywhere extends Restriction {
  item_keys: ItemKey[];

  constructor(items: Array<Item | ItemKey>) {
    super();

    this.item_keys = items.map((item) => resolveKey(item));
  }

  getItems(): Item[] {
    return this.item_keys.map((key) => setup.item[key]);
  }

  override text(): string {
    return `setup.qres.HasAnyItem([${this.getItems()
      .map((item) => `"${item.key}"`)
      .join(", ")}])`;
  }

  override explain(): string {
    return `Has any of these items anywhere: ${this.getItems()
      .map((item) => item.rep())
      .join("")}`;
  }

  override isOk(): boolean {
    for (const item of this.getItems()) {
      if (State.variables.inventory.isHasItemAnywhere(item)) return true;
    }
    return false;
  }
}
