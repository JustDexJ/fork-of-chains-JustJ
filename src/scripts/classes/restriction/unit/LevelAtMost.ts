export default class LevelAtMost extends Restriction.Unit {
  constructor(public level: number) {
    super();
  }

  static NAME = "Level at most this much";
  static PASSAGE = "RestrictionLevelAtMost";
  static UNIT = true;

  override text(): string {
    return `setup.qres.LevelAtMost(${this.level})`;
  }

  override explain(): string {
    return `Unit's level is at most ${this.level}`;
  }

  override isOk(unit: Unit): boolean {
    return unit.getLevel() <= this.level;
  }
}
