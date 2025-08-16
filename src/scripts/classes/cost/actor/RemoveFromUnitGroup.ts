export default class RemoveFromUnitGroup extends Cost {
  constructor(public actor_name: string) {
    super();
  }

  override text() {
    return `setup.qc.RemoveFromUnitGroup('${this.actor_name}')`;
  }

  override apply(context: CostContext) {
    let unit = context.getActorUnit(this.actor_name)!;
    let group = unit.getUnitGroup();
    if (group) {
      group.removeUnit(unit);
    }
  }

  override explain(context: CostContext) {
    return `${this.actor_name} is removed from their unit group, if any`;
  }
}
