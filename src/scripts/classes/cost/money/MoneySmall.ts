import Money from "./Money";

export default class MoneySmall extends Money {
  multi: number | null;

  constructor(multiplier: number) {
    super();

    this.multi = multiplier || null;
  }

  static NAME = "Money (Half of normal)";
  static PASSAGE = "CostMoneySmall";

  override text() {
    return `setup.qc.MoneySmall(${this.multi || ""})`;
  }

  override explain(context: CostContext) {
    if (context) {
      return super.explain(context);
    } else {
      if (!this.multi) return "Money (auto, half)";
      return `Money (auto, half) x ${this.multi}`;
    }
  }

  override getMoney(context: CostContext) {
    let base = setup.qcImpl.MoneyNormal.computeBaseMoney(context);
    let multi = this.multi;
    if (multi) {
      base *= multi;
    }
    // small is halved
    base *= 0.5;
    return Math.round(base);
  }
}
