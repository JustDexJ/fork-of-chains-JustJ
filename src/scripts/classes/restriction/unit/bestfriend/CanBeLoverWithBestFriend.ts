export default class CanBeLoverWithBestFriend extends Restriction.Unit {
  constructor() {
    super();
  }

  override text(): string {
    return `setup.qres.CanBeLoverWithBestFriend()`;
  }

  override explain(): string {
    return `Can become lover with their best friend`;
  }

  override isOk(unit: Unit): boolean {
    const bf = unit.getBestFriend();
    if (!bf) return false;
    return State.variables.friendship.isCanBecomeLovers(unit, bf);
  }
}
