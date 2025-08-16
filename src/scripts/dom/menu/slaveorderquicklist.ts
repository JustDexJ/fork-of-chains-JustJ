/*
Originally from:
http://twinery.org/forum/discussion/comment/17617/
*/

/**
 * Display list of slave orders on the right sidebar on wide screens.
 */
export const DOM_Menu_slaveorderquicklist = function (): DOM.Node {
  const slaveorders = State.variables.slaveorderlist.getSlaveOrders();

  return setup.DOM.Util.filterAll({
    menu: "slaveorderquick",
    filter_objects: slaveorders,
    display_callback: (slaveorder) => html` ${slaveorder.rep()} `,
  });
};
