/**
 * Unit must be at home: on duty, injured, or idle
 */
export default class HomeExceptOnLeave extends Restriction.Unit {
  constructor() {
    super();
  }

  override text(): string {
    return `setup.qres.HomeExceptOnLeave()`;
  }

  override explain(): string {
    return `Unit is at home OR on leave`;
  }

  override isOk(unit: Unit): boolean {
    return unit.isHome(/* ignore_leave */ true);
  }
}
