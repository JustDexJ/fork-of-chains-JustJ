export default class FortLevelAtLeast extends Restriction {
  constructor(public level: number) {
    super();
  }

  override text() {
    return `setup.qres.FortLevelAtLeast(${this.level})`;
  }

  override isOk() {
    const level = State.variables.fortgrid.getTotalExpansions();
    return level >= this.level;
  }

  override explain() {
    return `Have expanded fort at least ${this.level} times`;
  }
}
