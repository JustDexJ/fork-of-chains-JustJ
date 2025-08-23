/**
 * Rename a unit's first name
 */
export default class FirstName extends Cost {
  constructor(
    public actor_name: string,
    public first_name: string,
  ) {
    super();
  }

  override text(): string {
    return `setup.qc.FirstName('${this.actor_name}', '${setup.escapeJsString(this.first_name)}')`;
  }

  override apply(context: CostContext) {
    const unit = context.getActorUnit(this.actor_name)!;
    unit.setName(this.first_name, unit.getSurname());
  }

  override explain(context: CostContext): string {
    return `The first name of ${this.actor_name} becomes ${this.first_name}`;
  }
}
