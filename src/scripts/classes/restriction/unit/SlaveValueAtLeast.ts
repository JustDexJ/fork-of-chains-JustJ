export default class SlaveValueAtLeast extends Restriction.Unit {
  constructor(public slavevalue: number) {
    super();
  }

  static NAME = "Slave value is at least this much";
  static PASSAGE = "RestrictionSlaveValueAtLeast";
  static UNIT = true;

  override text(): string {
    return `setup.qres.SlaveValueAtLeast(${this.slavevalue})`;
  }

  override explain(): string {
    return `Unit's slave value is at least ${this.slavevalue}`;
  }

  override isOk(unit: Unit): boolean {
    return unit.getSlaveValue() >= this.slavevalue;
  }
}
