// slave must be assigned to a bedchamber
export default class SlaveHasBedchamber extends Restriction.Unit {
  constructor() {
    super();
  }

  override text(): string {
    return `setup.qres.SlaveHasBedchamber()`;
  }

  override explain(): string {
    return `Unit must be a slave serving in some bedchamber`;
  }

  override isOk(unit: Unit): boolean {
    if (!unit.isSlave()) return false;
    return !!unit.getBedchamber();
  }
}
