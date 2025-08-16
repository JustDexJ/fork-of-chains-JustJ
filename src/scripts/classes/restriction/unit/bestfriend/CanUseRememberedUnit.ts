export default class CanUseRememberedUnit extends Restriction.Unit {
  constructor() {
    super();
  }

  override text() {
    return `setup.qres.CanUseRememberedUnit()`;
  }

  override explain() {
    return `Unit must be able to use remembered unit`;
  }

  override isOk(unit: Unit): boolean {
    const slave = setup.qresImpl.RememberUnit.getRememberedUnit();
    return slave.isUsableBy(unit);
  }
}
