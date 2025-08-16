/**
 * Unit must be at home: on duty, injured, or idle
 */
export default class HomeExceptOnLeave extends Restriction.Unit {
  constructor() {
    super();
  }

  override text() {
    return `setup.qres.HomeExceptOnLeave()`;
  }

  override explain() {
    return `Unit is at home OR on leave`;
  }

  override isOk(unit: Unit): boolean {
    return unit.isHome(/* ignore_leave */ true);
  }
}
