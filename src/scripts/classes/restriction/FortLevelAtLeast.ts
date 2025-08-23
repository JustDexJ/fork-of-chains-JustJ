export default class FortLevelAtLeast extends Restriction {
  constructor(public level: number) {
    super();
  }

  override text(): string {
    return `setup.qres.FortLevelAtLeast(${this.level})`;
  }

  override isOk(): boolean {
    const level = State.variables.fortgrid.getTotalExpansions();
    return level >= this.level;
  }

  override explain(): string {
    return `Have expanded fort at least ${this.level} times`;
  }
}
