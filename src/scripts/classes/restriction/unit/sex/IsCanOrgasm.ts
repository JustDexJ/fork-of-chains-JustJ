export default class IsCanOrgasm extends Restriction.Unit {
  constructor() {
    super();
  }

  override text() {
    return `setup.qres.IsCanOrgasm()`;
  }

  override explain() {
    return `Can orgasm: not blocked by slave rule or by chastity`;
  }

  override isOk(unit: Unit): boolean {
    return unit.isCanOrgasm();
  }
}
