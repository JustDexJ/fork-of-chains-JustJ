export default class Money extends Restriction {
  constructor(public money: number) {
    super();
  }

  static NAME = "Money minimum";
  static PASSAGE = "RestrictionMoney";

  override text(): string {
    return `setup.qres.Money(${this.money})`;
  }

  override explain(): string {
    return `Minimum money: ${this.money}`;
  }

  override isOk(): boolean {
    if (!this.money) return true;
    return State.variables.company.player.getMoney() >= this.money;
  }
}
