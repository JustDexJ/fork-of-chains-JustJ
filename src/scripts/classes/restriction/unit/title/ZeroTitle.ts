export default class ZeroTitle extends Restriction.Unit {
  constructor() {
    super();
  }

  override text() {
    return `setup.qres.ZeroTitle()`;
  }

  override explain() {
    return `Unit does not have any title`;
  }

  override isOk(unit: Unit): boolean {
    return State.variables.titlelist.getAllTitles(unit).length == 0;
  }
}
