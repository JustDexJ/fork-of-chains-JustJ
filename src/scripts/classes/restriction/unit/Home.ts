/**
 * Unit must be at home: on duty, injured, or idle
 */
export default class Home extends Restriction.Unit {
  constructor() {
    super();
  }

  override text(): string {
    return `setup.qres.Home()`;
  }

  override explain(): string {
    return `Unit is at home`;
  }

  override isOk(unit: Unit): boolean {
    return unit.isHome();
  }
}
