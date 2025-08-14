/**
 * Unit must not be engaged
 */
export default class NotEngaged extends Restriction.Unit {
  constructor() {
    super();
  }

  override text() {
    return `setup.qres.NotEngaged()`;
  }

  override explain() {
    return `Unit is not engaged`;
  }

  override isOk(unit: Unit): boolean {
    return !unit.isEngaged();
  }
}
