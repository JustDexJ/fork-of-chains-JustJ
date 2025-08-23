/**
 * A copies B's body, but not the other way around
 */
export default class BodyswapOneDirection extends Cost {
  constructor(
    public actor_name: string,
    public target_actor_name: string,
  ) {
    super();
  }

  override text(): string {
    return `setup.qc.BodyswapOneDirection('${this.actor_name}', '${this.target_actor_name}')`;
  }

  override apply(context: CostContext) {
    let unit = context.getActorUnit(this.actor_name)!;
    let target = context.getActorUnit(this.target_actor_name)!;
    setup.qcImpl.Bodyswap.doBodySwap(
      unit,
      target,
      /* force bodyswap = */ false,
      /* one dir = */ true,
    );
    unit.addHistory(`copied ${target.getName()}'s body`);
  }

  override explain(context: CostContext): string {
    return `${this.actor_name} copies ${this.target_actor_name}'s body`;
  }
}
