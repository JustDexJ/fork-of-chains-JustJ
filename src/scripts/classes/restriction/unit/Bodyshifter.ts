/**
 * Unit must be a bodyshifter
 */
export default class Bodyshifter extends Restriction.Unit {
  constructor() {
    super();
  }

  override text() {
    return `setup.qres.Bodyshifter()`;
  }

  override explain() {
    return `Unit is a bodyshifter`;
  }

  override isOk(unit: Unit): boolean {
    return State.variables.bodyshift.isBodyshifter(unit);
  }
}
