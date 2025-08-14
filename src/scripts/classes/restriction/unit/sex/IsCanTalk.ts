export default class IsCanTalk extends Restriction.Unit {
  constructor() {
    super();
  }

  override text() {
    return `setup.qres.IsCanTalk()`;
  }

  override explain() {
    return `Can talk: not blocked by slave rule or by gag`;
  }

  override isOk(unit: Unit): boolean {
    return unit.isCanTalk();
  }
}
