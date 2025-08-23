export default class WeeksWithCompanyAtLeast extends Restriction.Unit {
  constructor(public weeks: number) {
    super();
  }

  override text(): string {
    return `setup.qres.WeeksWithCompanyAtLeast(${this.weeks})`;
  }

  override explain(): string {
    return `Unit has been with your company for at least ${this.weeks} weeks`;
  }

  override isOk(unit: Unit): boolean {
    return unit.getWeeksWithCompany() >= this.weeks;
  }
}
