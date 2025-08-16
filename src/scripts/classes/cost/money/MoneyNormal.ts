import type { ContentTemplate } from "../../content/ContentTemplate";
import Money from "./Money";

export default class MoneyNormal extends Money {
  multi: number | null;

  constructor(multiplier: number) {
    super();

    this.multi = multiplier || null;
  }

  static NAME = "Money (Normal)";
  static PASSAGE = "CostMoneyNormal";

  override text() {
    return `setup.qc.MoneyNormal(${this.multi || ""})`;
  }

  override explain(context: CostContext) {
    if (context) {
      return super.explain(context);
    } else {
      if (!this.multi) return "Money (auto, success)";
      return `Money (auto, success) x ${this.multi}`;
    }
  }

  static computeBaseMoney(context: CostContext) {
    let base = 0;
    if (context.getTemplate) {
      const template: ContentTemplate = context.getTemplate();

      base = template.getDifficulty().getMoney();
      if (template.getWeeks) {
        base *= template.getWeeks();
      }

      const team = context instanceof setup.QuestInstance && context.getTeam();
      if (team) {
        const slavers = team
          .getUnits()
          .filter((unit) => unit.isSlaver()).length;
        base *= slavers / 3.0;
      }
    }
    return Math.round(base);
  }

  override getMoney(context: CostContext) {
    let base = setup.qcImpl.MoneyNormal.computeBaseMoney(context);
    const multi = this.multi;
    if (multi) {
      base *= multi;
    }
    return Math.round(base);
  }
}
