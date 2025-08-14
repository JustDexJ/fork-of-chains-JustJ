export default class RememberUnit extends Restriction.Unit {
  constructor() {
    super();
  }

  override text() {
    return `setup.qres.RememberUnit()`;
  }

  override explain() {
    return `Remember this unit (used with setup.qres.BestFriendWithRememberedUnit, setup.qres.CanUseRememberedUnit, and setup.qres.CanBeUsedWithRememberedUnit)`;
  }

  override isOk(unit: Unit): boolean {
    setup.qresImpl.RememberUnit.rememberUnit(unit);
    return true;
  }

  static rememberUnit(unit: Unit) {
    State.temporary.remember_unit_rememberedUnit_key = unit.key;
  }

  static getRememberedUnit(): Unit {
    const key = State.temporary.remember_unit_rememberedUnit_key;
    if (!key) throw new Error(`No remembered unit!`);
    return State.variables.unit[key];
  }
}
