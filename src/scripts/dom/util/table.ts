export default {
  /**
   * Render a table.
   */
  table(entries: DOM.Node[][]): DOM.Node {
    const rows = [];
    for (const entry_row of entries) {
      rows.push(
        setup.DOM.create(
          "tr",
          {},
          entry_row.map((node) => setup.DOM.create("td", {}, node)),
        ),
      );
    }
    return setup.DOM.create(
      "table",
      { class: "table" },
      setup.DOM.create("tbody", {}, rows),
    );
  },
};
