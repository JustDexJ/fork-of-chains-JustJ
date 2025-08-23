// v1.0.0

Macro.add("money", {
  handler() {
    this.output.append(setup.DOM.Util.money(Number(this.args[0])));
  },
});

Macro.add("moneyloss", {
  handler() {
    this.output.append(setup.DOM.Util.moneyloss(Number(this.args[0])));
  },
});
