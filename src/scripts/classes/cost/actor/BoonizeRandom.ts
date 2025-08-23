export default class BoonizeRandom extends Cost {
  constructor(
    public actor_name: string,
    public duration: number,
  ) {
    super();
  }

  static NAME = "Unit gains a random temporary boon";
  static PASSAGE = "CostBoonizeRandom";
  static UNIT = true;

  override text(): string {
    return `setup.qc.BoonizeRandom('${this.actor_name}', ${this.duration})`;
  }

  override apply(context: CostContext) {
    let unit = context.getActorUnit(this.actor_name)!;
    State.variables.trauma.boonize(unit, this.duration);
  }

  override explain(context: CostContext): string {
    return `${this.actor_name} gains a random and temporary boon for ${this.duration} weeks`;
  }
}
