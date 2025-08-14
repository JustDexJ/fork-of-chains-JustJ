// whether the slave is usable by you at the moment (home and no conflicting requirements)
export default class SlaveUsableByYou extends Restriction.Unit {
  constructor() {
    super();
  }

  override text() {
    return `setup.qres.SlaveUsableByYou()`;
  }

  override explain() {
    return `Unit must be usable by you`;
  }

  override isOk(unit: Unit): boolean {
    return unit.isUsableBy(State.variables.unit.player);
  }
}
