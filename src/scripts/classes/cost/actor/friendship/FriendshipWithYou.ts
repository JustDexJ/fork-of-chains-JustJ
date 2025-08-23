/**
 * Two units gain friendship
 */
export default class FriendshipWithYou extends Cost {
  constructor(
    public actor_name: string,
    public friendship_amt: number,
  ) {
    super();
  }

  override text(): string {
    return `setup.qc.FriendshipWithYou('${this.actor_name}', ${this.friendship_amt})`;
  }

  override apply(context: CostContext) {
    let unit = context.getActorUnit(this.actor_name)!;
    let target = State.variables.unit.player;
    if (unit != target) {
      setup.qc.Friendship("unit", "target", this.friendship_amt).apply(
        setup.costUnitHelperDict({
          unit: unit,
          target: target,
        }),
      );
    }
  }

  override explain(context: CostContext): string {
    return `${this.actor_name} gain ${this.friendship_amt} friendship with you`;
  }
}
