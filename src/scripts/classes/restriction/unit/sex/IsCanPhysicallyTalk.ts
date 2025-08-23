export default class IsCanPhysicallyTalk extends Restriction.Unit {
  constructor() {
    super();
  }

  override text(): string {
    return `setup.qres.IsCanPhysicallyTalk()`;
  }

  override explain(): string {
    return `Can talk physically: not blocked by gag, but can be blocked by slave rule`;
  }

  override isOk(unit: Unit): boolean {
    return unit.isCanPhysicallyTalk();
  }
}
