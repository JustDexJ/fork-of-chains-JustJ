export default class Prestige extends Restriction {
  constructor(public prestige: number) {
    super();
  }

  static NAME = "Prestige minimum";
  static PASSAGE = "RestrictionPrestige";

  override text() {
    return `setup.qres.Prestige(${this.prestige})`;
  }

  override explain() {
    return `Minimum prestige: ${this.prestige}`;
  }

  override isOk() {
    return State.variables.company.player.getPrestige() >= this.prestige;
  }
}
