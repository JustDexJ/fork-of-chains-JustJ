// v1.0.0

Macro.add("dangertext", {
  handler() {
    this.output.append(setup.DOM.Text.danger(this.args[0]));
  },
});

Macro.add("dangertextlite", {
  handler() {
    this.output.append(setup.DOM.Text.dangerlite(this.args[0]));
  },
});
