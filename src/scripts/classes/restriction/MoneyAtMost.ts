export default class MoneyAtMost extends Restriction {
  constructor(public money: number) {
    super();
  }

  override text() {
    return `setup.qres.MoneyAtMost(${this.money})`;
  }

  override explain() {
    return `Maximum money: ${this.money}`;
  }

  override isOk() {
    return State.variables.company.player.getMoney() <= this.money;
  }
}
