export default {
  /**
   * Shows a link for help text
   */
  help(children: DOM.Attachable | Function): DOM.Node {
    return setup.DOM.Util.message("(?)", () => {
      let children_parsed;
      if (children instanceof Function) {
        children_parsed = children();
      } else {
        children_parsed = children;
      }
      return setup.DOM.create("div", { class: "helpcard" }, children_parsed);
    });
  },
};
