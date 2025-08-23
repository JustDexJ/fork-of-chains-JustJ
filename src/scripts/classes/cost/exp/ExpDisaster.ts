import Exp from "./Exp";

export default class ExpDisaster extends Exp {
  constructor(public multi?: number) {
    super();
  }

  get IS_EXP_AUTO(): boolean {
    return true;
  }

  override text(): string {
    return `setup.qc.ExpDisaster(${this.multi ? this.multi : ""})`;
  }

  override getExp(quest: QuestInstance): number {
    let base = quest.getTemplate().getDifficulty().getExp();
    base *= quest.getTemplate().getWeeks();
    if (this.multi) {
      base *= this.multi;
    }
    base *= setup.EXP_DISASTER_MULTIPLIER;
    return Math.round(base);
  }

  override explain(context: CostContext): string {
    if (context instanceof setup.QuestInstance) {
      return `<<exp ${this.getExp(context)}>>`;
    } else {
      if (!this.multi) return "Exp(Disaster)";
      return `Exp(Disaster) x ${this.multi}`;
    }
  }
}
