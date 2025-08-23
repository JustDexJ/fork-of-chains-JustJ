/**
 * Quest cost, reward, etc. Some can also be used for non-quests:
 * i.e., the ones whose apply(), isOk(), and explain() does not take a parameter.
 *
 * Can also be used as reward. Eg.., Money(-20) as cost, Money(20) as reward.
 */
export default class Money extends Cost {
  money?: number;

  constructor(money?: number) {
    super();

    // Called from subclass, skip checks
    if (this.constructor !== Money && money === undefined) return;

    if (!Number.isInteger(money)) throw new Error(`Unknown money: ${money}`);
    this.money = money;
  }

  override text(): string {
    return `setup.qc.Money(${this.money})`;
  }

  getMoney(quest?: CostContext) {
    return this.money ?? 0;
  }

  override isOk(context: CostContext): boolean {
    let money = this.getMoney(context);
    if (money >= 0) return true;
    return State.variables.company.player.getMoney() >= -money;
  }

  override apply(context?: CostContext): void {
    // try to apply as best as you can.
    State.variables.company.player.addMoney(this.getMoney(context));
  }

  override undoApply(context: CostContext): void {
    State.variables.company.player.addMoney(-this.getMoney(context));
  }

  override explain(context: CostContext): string {
    return setup.DOM.toString(setup.DOM.Util.money(this.getMoney(context)));
  }
}
