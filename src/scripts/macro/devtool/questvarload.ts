Macro.add("questvarload", {
  handler() {
    const content_instance = this.args[0];
    setup.DOM.Helper.loadQuestVars(content_instance);
  },
});
