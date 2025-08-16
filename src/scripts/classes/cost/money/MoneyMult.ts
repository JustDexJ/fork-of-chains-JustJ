import Money from "./Money";

/**
 * Money multipled by Constants.MONEY_PER_SLAVER_WEEK = 500
 */
export default class MoneyMult extends Money {
  constructor(multi: number) {
    super(multi * setup.MONEY_PER_SLAVER_WEEK);
  }
}
