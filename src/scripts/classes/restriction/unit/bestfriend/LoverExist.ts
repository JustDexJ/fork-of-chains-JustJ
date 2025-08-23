export default class LoverExist extends Restriction.Unit {
  constructor() {
    super();
  }

  override text(): string {
    return `setup.qres.LoverExist()`;
  }

  override explain(): string {
    return `Unit has a lover`;
  }

  override isOk(unit: Unit): boolean {
    return !!unit.getLover();
  }
}
