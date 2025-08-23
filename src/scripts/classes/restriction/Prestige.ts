export default class Prestige extends Restriction {
  constructor(public prestige: number) {
    super();
  }

  static NAME = "Prestige minimum";
  static PASSAGE = "RestrictionPrestige";

  override text(): string {
    return `setup.qres.Prestige(${this.prestige})`;
  }

  override explain(): string {
    return `Minimum prestige: ${this.prestige}`;
  }

  override isOk(): boolean {
    return State.variables.company.player.getPrestige() >= this.prestige;
  }
}
