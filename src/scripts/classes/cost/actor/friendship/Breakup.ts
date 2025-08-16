/**
 * Breaks up two units if they were lovers.
 */
export default class Breakup extends Cost {
  constructor(
    public actor_name: string,
    public target_actor_name: string,
  ) {
    super();
  }

  override text() {
    return `setup.qc.Breakup('${this.actor_name}', '${this.target_actor_name}')`;
  }

  override apply(context: CostContext) {
    let unit = context.getActorUnit(this.actor_name)!;
    let target = context.getActorUnit(this.target_actor_name)!;
    if (unit.getLover() == target) {
      State.variables.friendship.breakup(unit, target);
    }
  }

  override explain(context: CostContext) {
    return `${this.actor_name} and ${this.target_actor_name} breaks up, if they were lovers`;
  }
}
