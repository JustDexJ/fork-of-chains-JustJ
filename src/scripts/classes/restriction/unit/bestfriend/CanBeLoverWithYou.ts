export default class CanBeLoverWithYou extends Restriction.Unit {
  constructor() {
    super();
  }

  override text(): string {
    return `setup.qres.CanBeLoverWithYou()`;
  }

  override explain(): string {
    return `Can become lover with you`;
  }

  override isOk(unit: Unit): boolean {
    if (unit.isYou()) return false;
    return State.variables.friendship.isCanBecomeLovers(
      unit,
      State.variables.unit.player,
    );
  }
}
