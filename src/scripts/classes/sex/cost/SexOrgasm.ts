export class SexOrgasm extends SexCost {
  constructor(public actor_name: string) {
    super();
    this.actor_name = actor_name;
  }

  override apply(action: SexAction) {
    const unit = action.getActorUnit(this.actor_name);
    this.sex.doOrgasm(unit);
  }

  override explain() {
    return `${this.actor_name} orgasms`;
  }
}
