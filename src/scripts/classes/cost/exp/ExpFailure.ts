import Exp from "./Exp";

export default class ExpFailure extends Exp {
  constructor(public multi?: number) {
    super();
  }

  get IS_EXP_AUTO(): boolean {
    return true;
  }

  override text() {
    return `setup.qc.ExpFailure(${this.multi ? this.multi : ""})`;
  }

  override getExp(quest: QuestInstance): number {
    let base = quest.getTemplate().getDifficulty().getExp();
    base *= quest.getTemplate().getWeeks();
    if (this.multi) {
      base *= this.multi;
    }
    base *= setup.EXP_FAILURE_MULTIPLIER;
    return Math.round(base);
  }

  override explain(context: CostContext) {
    if (context instanceof setup.QuestInstance) {
      return `<<exp ${this.getExp(context)}>>`;
    } else {
      if (!this.multi) return "Exp(Failure)";
      return `Exp(Failure) x ${this.multi}`;
    }
  }
}
