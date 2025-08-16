export default class WeeksWithCompanyAtLeast extends Restriction.Unit {
  constructor(public weeks: number) {
    super();
  }

  override text() {
    return `setup.qres.WeeksWithCompanyAtLeast(${this.weeks})`;
  }

  override explain() {
    return `Unit has been with your company for at least ${this.weeks} weeks`;
  }

  override isOk(unit: Unit): boolean {
    return unit.getWeeksWithCompany() >= this.weeks;
  }
}
