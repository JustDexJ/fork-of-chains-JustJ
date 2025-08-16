export default class IsCanPhysicallyCum extends Restriction.Unit {
  constructor() {
    super();
  }

  override text() {
    return `setup.qres.IsCanPhysicallyCum()`;
  }

  override explain() {
    return `Can physically cum with current equipment`;
  }

  override isOk(unit: Unit): boolean {
    return unit.isCanPhysicallyCum();
  }
}
