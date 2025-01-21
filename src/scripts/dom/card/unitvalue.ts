export default {
  unitvalue(unit: Unit, show_actions?: boolean): DOM.Node {
    const fragments: DOM.Attachable[] = [];

    const slave_value = unit.getSlaveValue();
    fragments.push(html`
      <div>
        ${unit.rep()} is valued at ${setup.DOM.Util.money(slave_value)}.
        ${setup.DOM.Util.help(html`
          This is the unit's value. It has little effect on slavers, but for
          slaves, this is roughly how much they are worth when being sold.
        `)}
      </div>
    `);

    const rows = [];
    const breakdowns = unit.getSlaveValueBreakdown();
    breakdowns.sort((a, b) => b.value - a.value);
    for (const breakdown of breakdowns) {
      rows.push([
        html`${breakdown.title}`,
        setup.DOM.Util.money(breakdown.value),
      ]);
    }

    fragments.push(setup.DOM.Util.table(rows));
    return setup.DOM.create("div", {}, fragments);
  },
};
