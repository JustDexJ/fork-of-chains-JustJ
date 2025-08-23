export default class Return extends Cost {
  constructor(public actor_name: string) {
    super();
  }

  override text(): string {
    return `setup.qc.Return('${this.actor_name}')`;
  }

  override apply(context: CostContext) {
    let unit = context.getActorUnit(this.actor_name)!;
    State.variables.leave.return(unit);
  }

  override explain(context: CostContext): string {
    return `${this.actor_name} will return from leave`;
  }
}
