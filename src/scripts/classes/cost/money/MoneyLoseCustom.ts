import MoneyCustom from "./MoneyCustom";

/**
 * Give a fixed amount of money scaled according to the quest difficulty.
 * e.g. 1500g is 1500g for lv40 quest, but becomes 600g for lv1 quest.
 */
export default class MoneyLoseCustom extends MoneyCustom {
  constructor(money: number) {
    super(-money);
  }

  static NAME = "Lose Money";
  static PASSAGE = "CostMoneyLoseCustom";
}
