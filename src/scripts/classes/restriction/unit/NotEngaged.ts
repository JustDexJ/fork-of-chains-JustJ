/**
 * Unit must not be engaged
 */
export default class NotEngaged extends Restriction.Unit {
  constructor() {
    super();
  }

  override text(): string {
    return `setup.qres.NotEngaged()`;
  }

  override explain(): string {
    return `Unit is not engaged`;
  }

  override isOk(unit: Unit): boolean {
    return !unit.isEngaged();
  }
}
