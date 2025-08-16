/**
 * Unit must be at home: on duty, injured, or idle
 */
export default class Home extends Restriction.Unit {
  constructor() {
    super();
  }

  override text() {
    return `setup.qres.Home()`;
  }

  override explain() {
    return `Unit is at home`;
  }

  override isOk(unit: Unit): boolean {
    return unit.isHome();
  }
}
