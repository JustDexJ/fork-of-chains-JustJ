// slave must not be assigned to a bedchamber
export default class SlaveNoBedchamber extends Restriction.Unit {
  constructor() {
    super();
  }

  override text() {
    return `setup.qres.SlaveNoBedchamber()`;
  }

  override explain() {
    return `Unit must NOT be a slave serving in some bedchamber`;
  }

  override isOk(unit: Unit): boolean {
    if (!unit.isSlave()) return false;
    return !unit.getBedchamber();
  }
}
