export default class YourBestFriend extends Restriction.Unit {
  constructor() {
    super();
  }

  override text() {
    return `setup.qres.YourBestFriend()`;
  }

  override explain() {
    return `Unit must be your best friend`;
  }

  override isOk(unit: Unit): boolean {
    return !!unit.getBestFriend()?.isYou();
  }
}
