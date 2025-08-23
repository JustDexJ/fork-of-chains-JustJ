// v1.0.0

Macro.add("nameof", {
  handler() {
    this.output.append(setup.DOM.Util.namebold(this.args[0]));
  },
});

Macro.add("name", {
  handler() {
    this.output.append(setup.DOM.Util.name(this.args[0]));
  },
});

Macro.add("Name", {
  handler() {
    this.output.append(setup.DOM.Util.name(this.args[0]));
  },
});
