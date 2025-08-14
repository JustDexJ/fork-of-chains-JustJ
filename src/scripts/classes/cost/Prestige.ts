export default class Prestige extends Cost {
  constructor(public prestige: number) {
    super();
  }

  static NAME = "Prestige";
  static PASSAGE = "CostPrestige";

  override text() {
    return `setup.qc.Prestige(${this.prestige})`;
  }

  override isOk(): boolean {
    if (this.prestige > 0) return true;
    return State.variables.company.player.getPrestige() >= -this.prestige;
  }

  override apply(context: CostContext) {
    // try to apply as best as you can.
    State.variables.company.player.addPrestige(this.prestige);
  }

  override undoApply(context: CostContext) {
    State.variables.company.player.addPrestige(-this.prestige);
  }

  override explain() {
    return `<<prestige ${this.prestige}>>`;
  }
}
