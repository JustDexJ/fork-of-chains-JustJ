/** Levels up this unit. */
export default class levelUp extends Cost {
  constructor(public actor_name: string) {
    super();
  }

  static NAME = "Level up a unit";
  static PASSAGE = "CostlevelUp";

  override text(): string {
    return `setup.qc.levelUp('${this.actor_name}')`;
  }

  override apply(context: CostContext) {
    let unit = context.getActorUnit(this.actor_name)!;
    unit.levelUp();
  }

  override explain(context: CostContext): string {
    return `${this.actor_name} levels up`;
  }
}
