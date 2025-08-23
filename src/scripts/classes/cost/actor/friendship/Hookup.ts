/**
 * Hooks up two units as lovers, breaking their existing lovers if any
 */
export default class Hookup extends Cost {
  constructor(
    public actor_name: string,
    public target_actor_name: string,
  ) {
    super();
  }

  override text(): string {
    return `setup.qc.Hookup('${this.actor_name}', '${this.target_actor_name}')`;
  }

  override apply(context: CostContext) {
    let unit = context.getActorUnit(this.actor_name)!;
    let target = context.getActorUnit(this.target_actor_name)!;
    if (unit.getLover() == target) {
      // if already lovers, do nothing
      return;
    }

    const unit_lover = unit.getLover();
    if (unit_lover) {
      State.variables.friendship.breakup(unit, unit_lover);
    }

    const target_lover = target.getLover();
    if (target_lover) {
      State.variables.friendship.breakup(target, target_lover);
    }

    State.variables.friendship.hookup(unit, target);
  }

  override explain(context: CostContext): string {
    return `${this.actor_name} and ${this.target_actor_name} becomes lovers, breaking up with their previous ones`;
  }
}
