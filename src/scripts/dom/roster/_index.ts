import bedchambersetslaver from "./bedchambersetslaver";
import codeeditorreplaceunit from "./codeeditorreplaceunit";
import dutyassign from "./dutyassign";
import equipmentsetequip from "./equipmentsetequip";
import quest_enlightenmentofthesoul from "./quest_enlightenmentofthesoul";
import retiredlist from "./retiredlist";
import roster from "./roster";
import rosterlist from "./rosterlist";
import selectunit from "./selectunit";
import selectunitforparty from "./selectunitforparty";
import slaveorderlist from "./slaveorderlist";

/**
 * Contains roster / unit list displays
 */
export const DOM_Roster = {
  ...bedchambersetslaver,
  ...codeeditorreplaceunit,
  ...dutyassign,
  ...equipmentsetequip,
  ...quest_enlightenmentofthesoul,
  ...retiredlist,
  ...roster,
  ...rosterlist,
  ...selectunit,
  ...selectunitforparty,
  ...slaveorderlist,
};
