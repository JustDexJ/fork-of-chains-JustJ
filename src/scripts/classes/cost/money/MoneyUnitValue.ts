import Money from "./Money";

/**
 * Gives money equal multipler * unit's value. Capped at the given cap. ALWAYS PUT A CAP
 */
export default class MoneyUnitValue extends Money {
  constructor(
    public actor_name: string,
    public multiplier: number,
    public cap: number,
  ) {
    super(0);

    if (!cap)
      throw new Error(`Money unit value for ${actor_name} missing a cap`);

    if (!multiplier)
      throw new Error(`Missing multiplier for MoneyUnitValue(${actor_name})`);
  }

  override text(): string {
    return `setup.qc.MoneyUnitValue("${this.actor_name}", ${this.multiplier}, ${this.cap})`;
  }

  override getMoney(context: CostContext) {
    const unit = context.getActorUnit(this.actor_name)!;
    const value = unit.getSlaveValue();
    const money = Math.min(
      Math.round(value * this.multiplier * setup.lowLevelMoneyMulti()),
      this.cap,
    );
    return money;
  }

  override explain(context: CostContext): string {
    if (context) {
      return super.explain(context);
    } else {
      return `Money equal to ${this.multiplier}x ${this.actor_name}'s value, capped at ${this.cap}`;
    }
  }
}
