export default class SlaveValueAtMost extends Restriction.Unit {
  constructor(public slavevalue: number) {
    super();
  }

  static NAME = "Slave value is at most this much";
  static PASSAGE = "RestrictionSlaveValueAtMost";
  static UNIT = true;

  override text() {
    return `setup.qres.SlaveValueAtMost(${this.slavevalue})`;
  }

  override explain() {
    return `Unit's slave value is at most ${this.slavevalue}`;
  }

  override isOk(unit: Unit): boolean {
    return unit.getSlaveValue() <= this.slavevalue;
  }
}
