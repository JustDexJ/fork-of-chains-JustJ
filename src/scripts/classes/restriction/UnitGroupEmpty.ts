import type { UnitGroup, UnitGroupKey } from "../unit/UnitGroup";

export default class UnitGroupEmpty extends Restriction {
  unit_group_key: UnitGroupKey;

  constructor(unit_group: UnitGroup | UnitGroupKey) {
    super();

    if (!unit_group) throw new Error(`Unit group cannot be empty`);
    this.unit_group_key = resolveKey(unit_group);
  }

  override text(): string {
    return `setup.qres.UnitGroupEmpty('${this.unit_group_key}')`;
  }

  override explain(): string {
    let unit_group = setup.unitgroup[this.unit_group_key];
    return `Unit group ${unit_group.rep()} must be empty`;
  }

  override isOk(): boolean {
    let unit_group = setup.unitgroup[this.unit_group_key];
    return unit_group.isEmpty();
  }
}
