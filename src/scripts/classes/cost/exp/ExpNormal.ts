import Exp from "./Exp";

export default class ExpNormal extends Exp {
  constructor(public multi?: number) {
    super();
  }

  get IS_EXP_AUTO(): boolean {
    return true;
  }

  override text() {
    return `setup.qc.ExpNormal(${this.multi ? this.multi : ""})`;
  }

  override getExp(quest: QuestInstance): number {
    let base = quest.getTemplate().getDifficulty().getExp();
    base *= quest.getTemplate().getWeeks();
    if (this.multi) {
      base *= this.multi;
    }
    return Math.round(base);
  }

  override explain(context: CostContext) {
    if (context instanceof setup.QuestInstance) {
      return `<<exp ${this.getExp(context)}>>`;
    } else {
      if (!this.multi) return "Exp(Normal)";
      return `Exp(Normal) x ${this.multi}`;
    }
  }
}
