export default class Money extends Restriction {
  constructor(public money: number) {
    super();
  }

  static NAME = "Money minimum";
  static PASSAGE = "RestrictionMoney";

  override text() {
    return `setup.qres.Money(${this.money})`;
  }

  override explain() {
    return `Minimum money: ${this.money}`;
  }

  override isOk() {
    if (!this.money) return true;
    return State.variables.company.player.getMoney() >= this.money;
  }
}
