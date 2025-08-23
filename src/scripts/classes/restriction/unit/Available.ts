/**
 * Unit must be available: at home and not injured. They can be on a duty.
 */
export default class Available extends Restriction.Unit {
  constructor() {
    super();
  }

  override text(): string {
    return `setup.qres.Available()`;
  }

  override explain(): string {
    return `Unit is available for work`;
  }

  override isOk(unit: Unit): boolean {
    return unit.isAvailable();
  }
}
