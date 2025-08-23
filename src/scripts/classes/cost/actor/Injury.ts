export default class Injury extends Cost {
  constructor(
    public actor_name: string,
    public injury_amt: number,
  ) {
    super();
  }

  static NAME = "Injure Unit";
  static PASSAGE = "CostInjury";
  static UNIT = true;

  override text(): string {
    return `setup.qc.Injury('${this.actor_name}', ${this.injury_amt})`;
  }

  override apply(context: CostContext) {
    let unit = context.getActorUnit(this.actor_name)!;
    State.variables.hospital.injureUnit(unit, this.injury_amt);
  }

  override undoApply(context: CostContext) {
    let unit = context.getActorUnit(this.actor_name)!;
    State.variables.hospital.healUnit(unit, this.injury_amt);
  }

  override explain(context: CostContext): string {
    return (
      `${this.actor_name} injured for ${this.injury_amt} week` +
      (this.injury_amt === 1 ? "" : "s")
    );
  }
}
