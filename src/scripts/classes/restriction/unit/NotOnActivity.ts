export default class NotOnActivity extends Restriction.Unit {
  constructor() {
    super();
  }

  override text(): string {
    return `setup.qres.NotOnActivity()`;
  }

  override explain(): string {
    return `Unit is not already on another activity`;
  }

  override isOk(unit: Unit): boolean {
    return !State.variables.activitylist.getActivityOf(unit);
  }
}
