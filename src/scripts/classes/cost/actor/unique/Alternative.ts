/**
 * Reset a unit level to level 1 then re-level back to current level/exp
 */
export default class Alternative extends Cost {
  constructor(public actor_name: string) {
    super();
  }

  override text(): string {
    return `setup.qc.Alternative('${this.actor_name}')`;
  }

  override apply(context: CostContext) {
    const unit = context.getActorUnit(this.actor_name)!;
    const exp = unit.getExp();
    const level = unit.getLevel();

    State.variables.notification.disable();
    unit.resetLevel();
    while (unit.getLevel() < level) unit.levelUp();
    unit.gainExp(exp);
    State.variables.notification.enable();
    setup.notify(`a|Reps skills have been respecced.`, { a: unit });
  }

  override explain(context: CostContext): string {
    return `Respec ${this.actor_name}`;
  }
}
