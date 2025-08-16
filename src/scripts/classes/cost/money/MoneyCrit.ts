import Money from "./Money";
import MoneyNormal from "./MoneyNormal";

export default class MoneyCrit extends Money {
  multi: number | null;

  constructor(multiplier: number) {
    super();

    this.multi = multiplier || null;
    // this.multi *= 2   // crit effect
  }

  static NAME = "Money (Critical)";
  static PASSAGE = "CostMoneyCrit";

  override text() {
    return `setup.qc.MoneyCrit(${this.multi || ""})`;
  }

  override explain(context: CostContext) {
    if (context) {
      return super.explain(context);
    } else {
      if (!this.multi) return "Money (auto, crit)";
      return `Money (auto, crit) x ${this.multi}`;
    }
  }

  override getMoney(context: CostContext) {
    let base = MoneyNormal.computeBaseMoney(context);
    let multi = this.multi;
    if (multi) {
      base *= multi;
    }
    // crit
    base *= setup.MONEY_CRIT_MULTIPLIER;
    return Math.round(base);
  }
}
