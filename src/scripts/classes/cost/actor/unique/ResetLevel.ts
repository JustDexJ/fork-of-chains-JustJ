/**
 * Reset a unit level to level 1
 */
export default class ResetLevel extends Cost {
  constructor(public actor_name: string) {
    super();
  }

  override text(): string {
    return `setup.qc.ResetLevel('${this.actor_name}')`;
  }

  override apply(context: CostContext) {
    let unit = context.getActorUnit(this.actor_name)!;
    unit.resetLevel();
  }

  override explain(context: CostContext): string {
    return `reset the level of ${this.actor_name} to level 1`;
  }
}
