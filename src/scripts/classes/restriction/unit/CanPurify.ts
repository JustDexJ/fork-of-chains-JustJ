export default class CanPurify extends Restriction.Unit {
  constructor(public trait_tag?: string) {
    super();
  }

  override text(): string {
    return `setup.qres.CanPurify(${this.trait_tag})`;
  }

  override explain(): string {
    return `Unit can be purified in: ${this.trait_tag || "anything"}`;
  }

  override isOk(unit: Unit): boolean {
    return unit.isCanPurify(this.trait_tag);
  }
}
