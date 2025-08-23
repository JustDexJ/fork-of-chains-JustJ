export default class YourBestFriend extends Restriction.Unit {
  constructor() {
    super();
  }

  override text(): string {
    return `setup.qres.YourBestFriend()`;
  }

  override explain(): string {
    return `Unit must be your best friend`;
  }

  override isOk(unit: Unit): boolean {
    return !!unit.getBestFriend()?.isYou();
  }
}
