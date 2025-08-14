export default class Heal extends Cost {
  constructor(
    public actor_name: string,
    public heal_amt: number,
  ) {
    super();
  }

  static NAME = "Heal Unit";
  static PASSAGE = "CostHeal";
  static UNIT = true;

  override text() {
    return `setup.qc.Heal('${this.actor_name}', ${this.heal_amt})`;
  }

  override apply(context: CostContext) {
    let unit = context.getActorUnit(this.actor_name)!;
    State.variables.hospital.healUnit(unit, this.heal_amt);
  }

  override undoApply(context: CostContext) {
    let unit = context.getActorUnit(this.actor_name)!;
    State.variables.hospital.injureUnit(unit, this.heal_amt);
  }

  override explain(context: CostContext) {
    return `${this.actor_name} healed by ${this.heal_amt} weeks`;
  }
}
