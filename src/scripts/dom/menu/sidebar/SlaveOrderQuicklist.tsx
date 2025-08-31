/*
Originally from:
http://twinery.org/forum/discussion/comment/17617/
*/

import { createMemo } from "solid-js";
import { FilterableList } from "../../components/misc/FilterableList";

/**
 * Display list of slave orders on the right sidebar on wide screens.
 */
export const SlaveOrderQuicklist: Component = (props) => {
  const getOrders = createMemo(() => {
    return State.variables.slaveorderlist.getSlaveOrders();
  });

  return (
    <FilterableList
      menu="slaveorderquick"
      filter_objects={getOrders()}
      display_callback={(slaveorder) => slaveorder.repJSX()}
    />
  );
};
