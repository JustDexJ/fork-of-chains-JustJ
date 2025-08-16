export default class FriendshipWithYouAtMost extends Restriction.Unit {
  constructor(public amt: number) {
    super();
  }

  override text() {
    return `setup.qres.FriendshipWithYouAtMost(${this.amt})`;
  }

  override explain() {
    return `Unit's friendship with you is at most ${this.amt}`;
  }

  override isOk(unit: Unit): boolean {
    return (
      State.variables.friendship.getFriendship(
        State.variables.unit.player,
        unit,
      ) <= this.amt
    );
  }
}
