/** Give exp to all participating slavers. */
export default class Exp extends Cost {
  exp_amount?: number;

  constructor(exp_amount?: number) {
    super();

    // Called from subclass, skip checks
    if (this.constructor !== Exp && exp_amount === undefined) return;

    if (typeof exp_amount !== "number" || !Number.isInteger(exp_amount))
      throw new Error(`Invalid value for exp: ${exp_amount}`);
    if (exp_amount < 0) throw new Error(`exp must be positive`);

    this.exp_amount = exp_amount;
  }

  override text() {
    return `setup.qc.Exp(${this.exp_amount!})`;
  }

  getExp(quest: QuestInstance): number {
    return this.exp_amount!;
  }

  override apply(quest: CostContext) {
    if (quest instanceof setup.QuestInstance) {
      // try to apply as best as you can.
      let exp_amount = this.getExp(quest);

      if (exp_amount) {
        let team = quest.getTeam()!;
        let units = team.getUnits();
        // give exp to all units, even those not participating.
        for (let i = 0; i < units.length; ++i) {
          let unit = units[i];
          if (unit.isSlaver()) {
            unit.gainExp(exp_amount);
          }
        }
        setup.notify(`Your slavers gain ${exp_amount} exp.`);
      }
    }
  }

  override explain(context: CostContext) {
    return `some exp`;
  }
}
