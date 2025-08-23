/**
 * Make a unit a bodyshifter, with target as its clone body
 */
export default class SetBodyshifter extends Cost {
  constructor(
    public actor_name: string,
    public target_actor_name: string,
  ) {
    super();
  }

  override text(): string {
    return `setup.qc.SetBodyshifter('${this.actor_name}', '${this.target_actor_name}')`;
  }

  override apply(context: CostContext) {
    const unit = context.getActorUnit(this.actor_name)!;
    const target = context.getActorUnit(this.target_actor_name)!;

    State.variables.bodyshift.registerBodyshifter(unit, target);
  }

  override explain(): string {
    return `${this.actor_name} becomes a bodyshifter, with ${this.target_actor_name} as its other body`;
  }
}
