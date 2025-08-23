export default class Sibling extends Cost {
  constructor(
    public actor_name: string,
    public target_actor_name: string,
  ) {
    super();
  }

  static NAME = "Two units become siblings";
  static PASSAGE = "CostSibling";

  override text(): string {
    return `setup.qc.Sibling('${this.actor_name}', '${this.target_actor_name}')`;
  }

  override apply(context: CostContext) {
    let unit = context.getActorUnit(this.actor_name)!;
    let target = context.getActorUnit(this.target_actor_name)!;
    State.variables.family.setSibling(unit, target);
  }

  override explain(context: CostContext): string {
    return `${this.actor_name} and ${this.target_actor_name} becomes siblings`;
  }
}
