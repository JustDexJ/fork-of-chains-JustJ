export default class WeeksWithCompanyAtMost extends Restriction.Unit {
  constructor(public weeks: number) {
    super();

    this.weeks = weeks;
  }

  override text(): string {
    return `setup.qres.WeeksWithCompanyAtMost(${this.weeks})`;
  }

  override explain(): string {
    return `Unit has been with your company for at most ${this.weeks} weeks`;
  }

  override isOk(unit: Unit): boolean {
    return unit.getWeeksWithCompany() <= this.weeks;
  }
}
