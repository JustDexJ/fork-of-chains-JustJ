// v1.0.0

Macro.add("levelof", {
  handler() {
    this.output.append(setup.DOM.Util.level(this.args[0].getLevel()));
  },
});
