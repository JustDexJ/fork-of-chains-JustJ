export function repFavor(favor: number): string {
  return (favor / 10).toFixed(1);
}

export default {
  /**
   * <<favor>>
   * Formats favor amount.
   */
  favor(favor: number): DOM.Node {
    const base_text = repFavor(favor);
    if (favor > 0) {
      return setup.DOM.Text.successlite(base_text);
    } else if (favor < 0) {
      return setup.DOM.Text.dangerlite(base_text);
    } else {
      return html`${base_text}`;
    }
  },
};
