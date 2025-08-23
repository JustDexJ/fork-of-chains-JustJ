import type { UnitGroup, UnitGroupKey } from "../unit/UnitGroup";

export default class UnitGroupHasUnit extends Restriction {
  unit_group_key: UnitGroupKey;

  constructor(unit_group: UnitGroup | UnitGroupKey) {
    super();

    if (!unit_group) throw new Error(`Unit group cannot be empty`);
    this.unit_group_key = resolveKey(unit_group);
  }

  override text(): string {
    return `setup.qres.UnitGroupHasUnit('${this.unit_group_key}')`;
  }

  override explain(): string {
    let unit_group = setup.unitgroup[this.unit_group_key];
    return `Unit group ${unit_group.rep()} has at least one unit`;
  }

  override isOk(): boolean {
    let unit_group = setup.unitgroup[this.unit_group_key];
    return unit_group.hasUnbusyUnit();
  }
}
