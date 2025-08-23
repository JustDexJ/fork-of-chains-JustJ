export default class BestFriendExist extends Restriction.Unit {
  constructor() {
    super();
  }

  override text(): string {
    return `setup.qres.BestFriendExist()`;
  }

  override explain(): string {
    return `Unit has a best friend/lover`;
  }

  override isOk(unit: Unit): boolean {
    return !!unit.getBestFriend();
  }
}
