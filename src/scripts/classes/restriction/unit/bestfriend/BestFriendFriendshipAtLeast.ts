export default class BestFriendFriendshipAtLeast extends Restriction.Unit {
  constructor(public amt: number) {
    super();
  }

  override text(): string {
    return `setup.qres.BestFriendFriendshipAtLeast(${this.amt})`;
  }

  override explain(): string {
    return `Unit has a best friend/lover with friendship at least ${this.amt}`;
  }

  override isOk(unit: Unit): boolean {
    const bf = unit.getBestFriend();
    if (!bf) return false;
    return State.variables.friendship.getFriendship(unit, bf) >= this.amt;
  }
}
