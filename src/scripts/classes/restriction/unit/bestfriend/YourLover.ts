export default class YourLover extends Restriction.Unit {
  constructor() {
    super();
  }

  override text(): string {
    return `setup.qres.YourLover()`;
  }

  override explain(): string {
    return `Unit must be your lover`;
  }

  override isOk(unit: Unit): boolean {
    return !!unit.getLover()?.isYou();
  }
}
