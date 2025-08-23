export default class DietCum extends Restriction.Unit {
  constructor() {
    super();
  }

  override text(): string {
    return `setup.qres.DietCum()`;
  }

  override explain(): string {
    return `On cum-based diet`;
  }

  override isOk(unit: Unit): boolean {
    return unit.isDietCum();
  }
}
