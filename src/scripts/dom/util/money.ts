function formatMoney(money: string | number): string {
  return Number(money).toLocaleString();
}

export default {
  /**
   * Formats money. Also as <<money>>
   */
  money(amount: number): DOM.Node {
    let span_class = "";
    if (amount > 0) span_class = "moneyspanplus";
    if (amount < 0) span_class = "moneyspanmin";

    return setup.DOM.create(
      "span",
      { class: span_class },
      `${formatMoney(amount)}g`,
    );
  },

  /**
   * Formats money but reverse the color. Also as <<moneyloss>>
   */
  moneyloss(amount: number): DOM.Node {
    let span_class = "";
    if (amount > 0) span_class = "moneyspanmin";
    if (amount < 0) span_class = "moneyspanplus";

    return setup.DOM.create(
      "span",
      { class: span_class },
      `${formatMoney(amount)}g`,
    );
  },
};
