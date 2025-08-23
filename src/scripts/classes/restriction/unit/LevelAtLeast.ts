export default class LevelAtLeast extends Restriction.Unit {
  constructor(public level: number) {
    super();
  }

  static NAME = "Level at least this much";
  static PASSAGE = "RestrictionLevelAtLeast";
  static UNIT = true;

  override text(): string {
    return `setup.qres.LevelAtLeast(${this.level})`;
  }

  override explain(): string {
    return `Unit's level is at least ${this.level}`;
  }

  override isOk(unit: Unit): boolean {
    return unit.getLevel() >= this.level;
  }
}
