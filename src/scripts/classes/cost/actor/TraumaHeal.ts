export default class TraumaHeal extends Cost {
  constructor(
    public actor_name: string,
    public duration: number,
  ) {
    super();
  }

  static NAME = "Heals given amount of week worth of trauma";
  static PASSAGE = "CostTraumaHeal";
  static UNIT = true;

  override text(): string {
    return `setup.qc.TraumaHeal('${this.actor_name}', ${this.duration})`;
  }

  override apply(context: CostContext) {
    let unit = context.getActorUnit(this.actor_name)!;
    State.variables.trauma.healTrauma(unit, this.duration);
  }

  override explain(context: CostContext): string {
    return `${this.actor_name} heals ${this.duration} weeks of trauma`;
  }
}
