export default {
  /**
   * Replaces the content of selector with node
   */
  replace(selector: string, node: DOM.Node) {
    $(selector).empty();
    if (node) {
      $(selector).append(setup.DOM.toDOM(node));
    }
  },
};
