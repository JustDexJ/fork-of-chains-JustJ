Macro.add("unitdescription", {
  handler() {
    const node = setup.DOM.Menu.unitdescription(this.args[0]);
    this.output.appendChild(node);
  },
});
