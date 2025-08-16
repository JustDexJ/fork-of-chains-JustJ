/**
 * Actor becomes target's parent
 */
export default class Parent extends Cost {
  constructor(
    public actor_name: string,
    public target_actor_name: string,
  ) {
    super();
  }

  static NAME = "A unit become another's parent";
  static PASSAGE = "CostParent";

  override text() {
    return `setup.qc.Parent('${this.actor_name}', '${this.target_actor_name}')`;
  }

  override apply(context: CostContext) {
    let unit = context.getActorUnit(this.actor_name)!;
    let target = context.getActorUnit(this.target_actor_name)!;
    State.variables.family.setParent(unit, target);
  }

  override explain(context: CostContext) {
    return `${this.actor_name} becomes ${this.target_actor_name}'s parent`;
  }
}
