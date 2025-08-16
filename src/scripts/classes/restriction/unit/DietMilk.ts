export default class DietMilk extends Restriction.Unit {
  constructor() {
    super();
  }

  override text() {
    return `setup.qres.DietMilk()`;
  }

  override explain() {
    return `On milk-based diet`;
  }

  override isOk(unit: Unit): boolean {
    return unit.isDietMilk();
  }
}
