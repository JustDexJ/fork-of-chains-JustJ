// v1.0.1

Macro.add("favor", {
  handler() {
    this.output.append(setup.DOM.Util.favor(Number(this.args[0])));
  },
});
