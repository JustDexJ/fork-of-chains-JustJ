export default class DietMilk extends Restriction.Unit {
  constructor() {
    super();
  }

  override text(): string {
    return `setup.qres.DietMilk()`;
  }

  override explain(): string {
    return `On milk-based diet`;
  }

  override isOk(unit: Unit): boolean {
    return unit.isDietMilk();
  }
}
