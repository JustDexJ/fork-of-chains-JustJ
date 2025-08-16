export default class CanBeUsedByRememberedUnit extends Restriction.Unit {
  constructor() {
    super();
  }

  override text() {
    return `setup.qres.CanBeUsedByRememberedUnit()`;
  }

  override explain() {
    return `Unit must be usable by remembered unit`;
  }

  override isOk(unit: Unit): boolean {
    const owner = setup.qresImpl.RememberUnit.getRememberedUnit();
    return unit.isUsableBy(owner);
  }
}
