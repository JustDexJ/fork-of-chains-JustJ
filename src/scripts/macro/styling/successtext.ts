// v1.0.0

Macro.add("successtext", {
  handler() {
    this.output.append(setup.DOM.Text.success(this.args[0]));
  },
});

Macro.add("successtextlite", {
  handler() {
    this.output.append(setup.DOM.Text.successlite(this.args[0]));
  },
});
