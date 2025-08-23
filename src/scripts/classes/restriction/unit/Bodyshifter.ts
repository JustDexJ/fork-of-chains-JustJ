/**
 * Unit must be a bodyshifter
 */
export default class Bodyshifter extends Restriction.Unit {
  constructor() {
    super();
  }

  override text(): string {
    return `setup.qres.Bodyshifter()`;
  }

  override explain(): string {
    return `Unit is a bodyshifter`;
  }

  override isOk(unit: Unit): boolean {
    return State.variables.bodyshift.isBodyshifter(unit);
  }
}
