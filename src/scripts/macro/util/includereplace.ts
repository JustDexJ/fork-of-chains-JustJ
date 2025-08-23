Macro.add("includereplace", {
  handler() {
    const node = setup.DOM.Util.include_replace(this.args[0]);
    this.output.appendChild(node);
  },
});
