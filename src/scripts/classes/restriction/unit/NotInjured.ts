export default class NotInjured extends Restriction.Unit {
  constructor() {
    super();
  }

  static UNIT = true;

  override text(): string {
    return `setup.qres.NotInjured()`;
  }

  override explain(): string {
    return `Unit must NOT be injured`;
  }

  override isOk(unit: Unit): boolean {
    return !State.variables.hospital.isInjured(unit);
  }
}
