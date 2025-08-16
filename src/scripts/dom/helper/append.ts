export default {
  /**
   * Append the content of selector with node
   */
  append(selector: string, node: DOM.Attachable, animate?: boolean) {
    if (node) {
      if (animate) {
        $(setup.DOM.toDOM(node)).hide().appendTo(selector).fadeIn(500);
      } else {
        $(selector).append(setup.DOM.toDOM(node));
      }
    }
  },
};
