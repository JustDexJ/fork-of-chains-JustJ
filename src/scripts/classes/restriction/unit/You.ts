export default class You extends Restriction.Unit {
  constructor() {
    super();
  }

  override text() {
    return `setup.qres.You()`;
  }

  override explain() {
    return `Unit must be you`;
  }

  override isOk(unit: Unit): boolean {
    return unit == State.variables.unit.player;
  }
}
