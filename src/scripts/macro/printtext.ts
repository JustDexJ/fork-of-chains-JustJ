// v1.0.0

/**
 * Print a text, no wikification going on.
 */
Macro.add("printtext", {
  handler: function () {
    let textnode = $(document.createTextNode(this.args[0]));
    textnode.appendTo(this.output);
  },
});
