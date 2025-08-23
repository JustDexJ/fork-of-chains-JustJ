export default class IsCanPhysicallyWalk extends Restriction.Unit {
  constructor() {
    super();
  }

  override text(): string {
    return `setup.qres.IsCanPhysicallyWalk()`;
  }

  override explain(): string {
    return `Can walk physically: not blocked by restraints, but can be blocked by slave rule`;
  }

  override isOk(unit: Unit): boolean {
    return unit.isCanPhysicallyWalk();
  }
}
