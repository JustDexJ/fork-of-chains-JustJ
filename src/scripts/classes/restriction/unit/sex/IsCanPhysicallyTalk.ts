export default class IsCanPhysicallyTalk extends Restriction.Unit {
  constructor() {
    super();
  }

  override text() {
    return `setup.qres.IsCanPhysicallyTalk()`;
  }

  override explain() {
    return `Can talk physically: not blocked by gag, but can be blocked by slave rule`;
  }

  override isOk(unit: Unit): boolean {
    return unit.isCanPhysicallyTalk();
  }
}
