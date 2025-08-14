import type { UnitGroup, UnitGroupKey } from "../../unit/UnitGroup";

/**
 * Mark unit to NOT be deleted.
 * Should be "RemoveFromUnitGroup"-ed later.
 */
export default class AddUnitToUnitGroup extends Cost {
  unit_group_key: UnitGroupKey;

  constructor(
    public actor_name: string,
    unit_group: UnitGroup | UnitGroupKey,
  ) {
    super();

    this.unit_group_key = resolveKey(unit_group);
  }

  override text() {
    let unitgroup = setup.unitgroup[this.unit_group_key];
    let qcu = State.variables.qcustomunitgroup;
    if (!qcu) qcu = [];

    let otherkey = unitgroup.key;
    for (let i = 0; i < qcu.length; ++i) {
      let ug = qcu[i];
      if (ug.key == unitgroup.key) {
        // TODO: this is correct?
        // @ts-ignore
        otherkey = ug.otherkey;
        break;
      }
    }

    return `setup.qc.AddUnitToUnitGroup('${this.actor_name}', '${otherkey}')`;
  }

  override apply(context: CostContext) {
    let unit = context.getActorUnit(this.actor_name)!;
    setup.unitgroup[this.unit_group_key].addUnit(unit);
  }

  override explain(context: CostContext) {
    return `${this.actor_name} is added to unit group ${setup.unitgroup[this.unit_group_key].rep()}`;
  }
}
