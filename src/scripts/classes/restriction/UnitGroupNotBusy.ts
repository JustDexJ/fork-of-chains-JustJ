import type { UnitGroup, UnitGroupKey } from "../unit/UnitGroup";

export default class UnitGroupNotBusy extends Restriction {
  unit_group_key: UnitGroupKey;

  constructor(unit_group: UnitGroup | UnitGroupKey) {
    super();

    if (!unit_group) throw new Error(`Unit group cannot be empty`);
    this.unit_group_key = resolveKey(unit_group);
  }

  override text() {
    return `setup.qres.UnitGroupNotBusy('${this.unit_group_key}')`;
  }

  override explain() {
    let unit_group = setup.unitgroup[this.unit_group_key];
    return `No unit from ${unit_group.rep()} must be on any quest / event / opportunity`;
  }

  override isOk() {
    const unit_group = setup.unitgroup[this.unit_group_key];
    return !unit_group.isBusy();
  }
}
