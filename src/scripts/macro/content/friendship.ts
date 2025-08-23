// v1.0.1

Macro.add("friendship", {
  handler() {
    this.output.append(
      setup.DOM.Util.friendship(Number(this.args[0]), this.args[1]),
    );
  },
});
