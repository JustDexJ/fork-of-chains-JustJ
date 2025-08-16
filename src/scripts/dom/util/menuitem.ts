export default {
  /**
   * Converts a menu item into a toolbar node
   */
  menuItemToolbar(menu_items: any[]): DOM.Node {
    return setup.DOM.create(
      "div",
      { class: "menu toolbar" },
      menu_items.map((menu_item) => menu_item.get(0)),
    );
  },
};
