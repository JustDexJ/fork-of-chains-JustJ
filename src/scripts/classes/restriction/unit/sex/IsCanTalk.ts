export default class IsCanTalk extends Restriction.Unit {
  constructor() {
    super();
  }

  override text(): string {
    return `setup.qres.IsCanTalk()`;
  }

  override explain(): string {
    return `Can talk: not blocked by slave rule or by gag`;
  }

  override isOk(unit: Unit): boolean {
    return unit.isCanTalk();
  }
}
