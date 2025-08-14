export default {
  /**
   * Formats level.
   */
  prestige(prestige: number): DOM.Node {
    let spanclass = "";
    if (prestige > 0) {
      spanclass = "prestigespanplus";
    } else if (prestige < 0) {
      spanclass = "prestigespanmin";
    }
    return setup.DOM.create(
      "span",
      { class: spanclass },
      `${prestige} prestige`,
    );
  },
};
