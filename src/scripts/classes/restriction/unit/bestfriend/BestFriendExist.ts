export default class BestFriendExist extends Restriction.Unit {
  constructor() {
    super();
  }

  override text() {
    return `setup.qres.BestFriendExist()`;
  }

  override explain() {
    return `Unit has a best friend/lover`;
  }

  override isOk(unit: Unit): boolean {
    return !!unit.getBestFriend();
  }
}
