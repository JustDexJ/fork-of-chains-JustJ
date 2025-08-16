/**
 * Unit must be available: at home and not injured. They can be on a duty.
 */
export default class Available extends Restriction.Unit {
  constructor() {
    super();
  }

  override text() {
    return `setup.qres.Available()`;
  }

  override explain() {
    return `Unit is available for work`;
  }

  override isOk(unit: Unit): boolean {
    return unit.isAvailable();
  }
}
