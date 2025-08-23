Macro.add("tagcard", {
  handler() {
    this.output.appendChild(setup.DOM.Util.twine(this.args[0]));
  },
});
