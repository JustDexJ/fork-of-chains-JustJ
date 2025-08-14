export default class FriendshipWithYouAtLeast extends Restriction.Unit {
  constructor(public amt: number) {
    super();
  }

  override text() {
    return `setup.qres.FriendshipWithYouAtLeast(${this.amt})`;
  }

  override explain() {
    return `Unit's friendship with you is at least ${this.amt}`;
  }

  override isOk(unit: Unit): boolean {
    return (
      State.variables.friendship.getFriendship(
        State.variables.unit.player,
        unit,
      ) >= this.amt
    );
  }
}
