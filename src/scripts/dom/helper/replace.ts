export default {
  /**
   * Replaces the content of selector with node
   */
  replace(selector: string, node: DOM.Attachable) {
    $(selector).empty();
    if (node) {
      $(selector).append(setup.DOM.toDOM(node));
    }
  },
};
