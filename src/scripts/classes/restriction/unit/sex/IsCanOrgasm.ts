export default class IsCanOrgasm extends Restriction.Unit {
  constructor() {
    super();
  }

  override text(): string {
    return `setup.qres.IsCanOrgasm()`;
  }

  override explain(): string {
    return `Can orgasm: not blocked by slave rule or by chastity`;
  }

  override isOk(unit: Unit): boolean {
    return unit.isCanOrgasm();
  }
}
