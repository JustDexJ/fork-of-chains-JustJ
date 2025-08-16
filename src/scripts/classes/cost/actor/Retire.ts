/** Retire this unit */
export default class Retire extends Cost {
  constructor(public actor_name: string) {
    super();
  }

  override text() {
    return `setup.qc.Retire('${this.actor_name}')`;
  }

  override apply(context: CostContext) {
    const unit = context.getActorUnit(this.actor_name)!;
    State.variables.retiredlist.retire(unit);
  }

  override explain(context: CostContext) {
    return `Forcefully retires ${this.actor_name}`;
  }
}
