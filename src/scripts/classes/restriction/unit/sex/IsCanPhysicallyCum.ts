export default class IsCanPhysicallyCum extends Restriction.Unit {
  constructor() {
    super();
  }

  override text(): string {
    return `setup.qres.IsCanPhysicallyCum()`;
  }

  override explain(): string {
    return `Can physically cum with current equipment`;
  }

  override isOk(unit: Unit): boolean {
    return unit.isCanPhysicallyCum();
  }
}
