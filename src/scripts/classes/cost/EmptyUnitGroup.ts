import type { UnitGroup, UnitGroupKey } from "../unit/UnitGroup";

export default class EmptyUnitGroup extends Cost {
  unit_group_key: UnitGroupKey;

  constructor(unit_group: UnitGroup | UnitGroupKey | BuiltinUnitGroupKey) {
    super();

    this.unit_group_key = resolveKey(unit_group as UnitGroup | UnitGroupKey);

    if (!this.unit_group_key)
      throw new Error(`no key for unit group ${unit_group} in EmptyUnitGroup`);
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
    return `setup.qc.EmptyUnitGroup('${otherkey}')`;
  }

  override apply(context: CostContext) {
    let unitgroup = setup.unitgroup[this.unit_group_key];
    unitgroup.removeAllUnits();
  }

  override explain(context: CostContext) {
    let unitgroup = setup.unitgroup[this.unit_group_key];
    return `Unitgroup ${unitgroup.rep()} is cleared of all units`;
  }
}
