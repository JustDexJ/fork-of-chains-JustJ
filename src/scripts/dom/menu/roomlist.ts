/*
Originally from:
http://twinery.org/forum/discussion/comment/17617/
*/

import type { RoomTemplateKey } from "../../classes/room/RoomTemplate";

/**
 * Display list of rooms, and optionally place the unplaced ones in the fort.
 */
export const DOM_Menu_roomlist = function (): DOM.Node {
  const all_rooms = State.variables.roomlist.getRoomInstances();

  const repr = [];
  const found: { [k in RoomTemplateKey]?: boolean } = {};
  // get room representatives
  for (const room of all_rooms) {
    const key = room.getTemplate().key;
    if (!found[key]) {
      found[key] = true;
      repr.push(room);
    }
  }

  return setup.DOM.Util.filterAll({
    menu: "room",
    filter_objects: repr,
    display_callback: (room) => {
      if (State.variables.menufilter.get("room", "display") == "compact") {
        return setup.DOM.Card.roominstancecompact(
          room,
          /* show actions = */ true,
        );
      } else {
        return setup.DOM.Card.roominstance(room, /* show actions = */ true);
      }
    },
  });
};
