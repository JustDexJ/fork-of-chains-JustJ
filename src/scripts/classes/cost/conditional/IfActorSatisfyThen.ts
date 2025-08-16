/**
 * DEPRECATED. Use setup.qc.IfThenElse in combination with setup.qres.Actor
 */
export default class IfActorSatisfyThen extends Cost {
  constructor(
    public actor_name: string,
    public requirement: Restriction,
    public effect: Cost,
  ) {
    super();
  }

  override text() {
    return `### DEPRECATED. Use IfThenElse and Actor: restriction. ###`;
  }

  override isOk(context: CostContext): boolean {
    let unit = context.getActorUnit(this.actor_name)!;
    if (this.requirement.isOk(unit)) {
      return this.effect.isOk(context);
    } else {
      return true;
    }
  }

  override apply(context: CostContext) {
    let unit = context.getActorUnit(this.actor_name)!;
    if (this.requirement.isOk(unit)) {
      return this.effect.apply(context);
    }
  }

  override explain(context: CostContext) {
    return `If (${this.requirement.explain()}) then ${this.effect.explain()}`;
  }
}
