import items_lorebook from "./items_lorebook";
import items_notusable from "./items_notusable";
import items_quest from "./items_quest";
import items_sexmanual from "./items_sexmanual";
import items_technology from "./items_technology";
import items_unitusable from "./items_unitusable";
import items_usable from "./items_usable";

export const ITEM_DEFINITIONS = {
  ...items_unitusable,
  ...items_usable,
  ...items_notusable,
  ...items_lorebook,
  ...items_quest,
  ...items_sexmanual,
  ...items_technology,
};
