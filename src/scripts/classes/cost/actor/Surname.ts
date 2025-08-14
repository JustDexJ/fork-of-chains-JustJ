/** Rename a unit's last name */
export default class Surname extends Cost {
  constructor(
    public actor_name: string,
    public surname: string,
  ) {
    super();
  }

  override text() {
    return `setup.qc.Surname('${this.actor_name}', '${setup.escapeJsString(this.surname)}')`;
  }

  override apply(context: CostContext) {
    const unit = context.getActorUnit(this.actor_name)!;
    unit.setName(unit.getFirstName(), this.surname);
  }

  override explain(context: CostContext) {
    return `The surname of ${this.actor_name} becomes ${this.surname}`;
  }
}
