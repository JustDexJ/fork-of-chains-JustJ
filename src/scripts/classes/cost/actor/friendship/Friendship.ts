/**
 * Two units gain friendship
 */
export default class Friendship extends Cost {
  constructor(
    public actor_name: string,
    public target_actor_name: string,
    /**
     * Usually a number.
     * Can be the special value "reset", indicating the friendship should be reset
     */
    public friendship_amt: number | "reset",
  ) {
    super();
  }

  override text() {
    return `setup.qc.Friendship('${this.actor_name}', '${this.target_actor_name}', ${this.friendship_amt})`;
  }

  override apply(context: CostContext) {
    let unit = context.getActorUnit(this.actor_name)!;
    let target = context.getActorUnit(this.target_actor_name)!;
    if (this.friendship_amt == "reset") {
      State.variables.friendship.deleteFriendship(unit, target);
      if (unit.isYourCompany() && target.isYourCompany()) {
        setup.notify(`a|Rep and b|rep have forgotten about each other...`, {
          a: unit,
          b: target,
        });
      }
    } else {
      const adjusted = State.variables.friendship.adjustFriendship(
        unit,
        target,
        this.friendship_amt,
      );
      if (adjusted && unit.isYourCompany() && target.isYourCompany()) {
        const friendship = setup.DOM.toString(
          setup.DOM.Util.friendship(adjusted),
        );
        if (adjusted > 0) {
          setup.notify(`a|Rep a|gain ${friendship} friendship with b|rep.`, {
            a: unit,
            b: target,
          });
        } else {
          setup.notify(`a|Rep a|gain ${friendship} rivalry with b|rep.`, {
            a: unit,
            b: target,
          });
        }
      }
    }
  }

  override explain(context: CostContext) {
    if (this.friendship_amt == "reset") {
      return `Reset friendship between ${this.actor_name} and ${this.target_actor_name}`;
    } else {
      return `${this.actor_name} and ${this.target_actor_name} gain ${setup.DOM.toString(setup.DOM.Util.friendship(this.friendship_amt))} ${this.friendship_amt > 0 ? "friendship" : "rivalry"}`;
    }
  }
}
