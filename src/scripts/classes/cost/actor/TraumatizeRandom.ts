export default class TraumatizeRandom extends Cost {
  constructor(
    public actor_name: string,
    public duration: number,
  ) {
    super();
  }

  static NAME = "Unit gains a random temporary trauma";
  static PASSAGE = "CostTraumatizeRandom";
  static UNIT = true;

  override text() {
    return `setup.qc.TraumatizeRandom('${this.actor_name}', ${this.duration})`;
  }

  override apply(context: CostContext) {
    let unit = context.getActorUnit(this.actor_name)!;
    State.variables.trauma.traumatize(unit, this.duration);
  }

  override explain(context: CostContext) {
    return `${this.actor_name} gains a random temporary trauma for ${this.duration} weeks`;
  }
}
