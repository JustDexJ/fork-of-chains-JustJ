export default class YourLover extends Restriction.Unit {
  constructor() {
    super();
  }

  override text() {
    return `setup.qres.YourLover()`;
  }

  override explain() {
    return `Unit must be your lover`;
  }

  override isOk(unit: Unit): boolean {
    return !!unit.getLover()?.isYou();
  }
}
