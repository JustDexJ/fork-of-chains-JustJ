export default class DietCum extends Restriction.Unit {
  constructor() {
    super();
  }

  override text() {
    return `setup.qres.DietCum()`;
  }

  override explain() {
    return `On cum-based diet`;
  }

  override isOk(unit: Unit): boolean {
    return unit.isDietCum();
  }
}
