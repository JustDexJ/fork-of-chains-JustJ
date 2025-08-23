export default class MoneyAtMost extends Restriction {
  constructor(public money: number) {
    super();
  }

  override text(): string {
    return `setup.qres.MoneyAtMost(${this.money})`;
  }

  override explain(): string {
    return `Maximum money: ${this.money}`;
  }

  override isOk(): boolean {
    return State.variables.company.player.getMoney() <= this.money;
  }
}
