import type { QuestDifficultyKey } from "../../quest/QuestDifficulty";
import Money from "./Money";

/**
 * Give a fixed amount of money scaled according to the quest difficulty.
 *
 * e.g. 1500g is 1500g for lv40 quest, but becomes 600g for lv1 quest.
 */
export default class MoneyCustom extends Money {
  constructor(money: number) {
    super(money);
  }

  static NAME = "Gain Money";
  static PASSAGE = "CostMoneyCustom";

  override text(): string {
    return `setup.qc.MoneyCustom(${this.money})`;
  }

  override explain(context: CostContext): string {
    if (context) {
      return super.explain(context);
    } else {
      return `Scaled money: ${setup.DOM.toString(setup.DOM.Util.money(this.money ?? 0))}`;
    }
  }

  override getMoney(context: CostContext) {
    let base = this.money ?? 0;

    // scale based on level, if the quest is given
    if (context.getTemplate) {
      let level = context.getTemplate().getDifficulty().getLevel();

      // scale based on PLATEAU
      let diff1 = `normal${level}` as QuestDifficultyKey;
      let diff2 = `normal${setup.LEVEL_PLATEAU}` as QuestDifficultyKey;
      base = Math.round(
        (base * setup.qdiff[diff1].getMoney()) / setup.qdiff[diff2].getMoney(),
      );
    }

    return Math.max(base, 1);
  }
}
