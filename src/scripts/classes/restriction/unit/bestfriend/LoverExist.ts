export default class LoverExist extends Restriction.Unit {
  constructor() {
    super();
  }

  override text() {
    return `setup.qres.LoverExist()`;
  }

  override explain() {
    return `Unit has a lover`;
  }

  override isOk(unit: Unit): boolean {
    return !!unit.getLover();
  }
}
