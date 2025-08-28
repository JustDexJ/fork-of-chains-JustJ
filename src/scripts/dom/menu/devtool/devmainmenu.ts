/**
 * Generate menu on the left.
 */
export const DOM_Menu_devmainmenu = function (): DOM.Node {
  const fragments: DOM.Attachable[] = [];
  return setup.DOM.create("span", {}, fragments);
};
