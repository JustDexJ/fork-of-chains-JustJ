export default class Twin extends Cost {
  constructor(
    public actor_name: string,
    public target_actor_name: string,
  ) {
    super();
  }

  static NAME = "Two units become twins";
  static PASSAGE = "CostTwin";

  override text() {
    return `setup.qc.Twin('${this.actor_name}', '${this.target_actor_name}')`;
  }

  override apply(context: CostContext) {
    let unit = context.getActorUnit(this.actor_name)!;
    let target = context.getActorUnit(this.target_actor_name)!;
    State.variables.family.setTwin(unit, target);
  }

  override explain(context: CostContext) {
    return `${this.actor_name} and ${this.target_actor_name} becomes twins`;
  }
}
