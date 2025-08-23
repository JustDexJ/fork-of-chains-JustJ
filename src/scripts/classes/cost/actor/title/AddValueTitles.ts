import type { TitleKey } from "../../../title/Title";

export default class AddValueTitles extends Cost {
  constructor(
    public actor_name: string,
    public amount: number,
  ) {
    super();
  }

  override text(): string {
    return `setup.qc.AddValueTitles('${this.actor_name}', ${this.amount})`;
  }

  override apply(context: CostContext) {
    let target = this.amount;
    const values = [80000, 40000, 20000, 10000, 5000];
    for (const value of values) {
      if (target >= value) {
        setup.qc
          .AddTitle(this.actor_name, `value_add_${value}` as TitleKey)
          .apply(context);
      }
    }
  }

  override explain(context: CostContext): string {
    return `${this.actor_name} gains titles to increase its value by at most ${this.amount}g`;
  }
}
