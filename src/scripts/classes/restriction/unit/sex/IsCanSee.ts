export default class IsCanSee extends Restriction.Unit {
  constructor() {
    super();
  }

  override text() {
    return `setup.qres.IsCanSee()`;
  }

  override explain() {
    return `Can see: not blocked by slave rule or by blindfold`;
  }

  override isOk(unit: Unit): boolean {
    return unit.isCanSee();
  }
}
