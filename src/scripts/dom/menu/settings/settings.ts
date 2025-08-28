export const DOM_Menu_settingsbase = function (): DOM.Node {
  const fragments: DOM.Attachable[] = [];

  const is_devtool = State.variables.devtooltype;

  return setup.DOM.create("div", {}, fragments);
};

export const DOM_Menu_settingsmain = function (): DOM.Node {
  const fragments: DOM.Attachable[] = [];
  return setup.DOM.create("div", {}, fragments);
};
