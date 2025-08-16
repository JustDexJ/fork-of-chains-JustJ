export default class IsCanPhysicallyOrgasm extends Restriction.Unit {
  constructor() {
    super();
  }

  override text() {
    return `setup.qres.IsCanPhysicallyOrgasm()`;
  }

  override explain() {
    return `Can physically orgasm: not blocked by chastity, but can be blocked by slave rule`;
  }

  override isOk(unit: Unit): boolean {
    return unit.isCanPhysicallyOrgasm();
  }
}
