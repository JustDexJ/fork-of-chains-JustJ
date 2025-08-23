import criteria_common_aid from "./criteria_common_aid";
import criteria_common_arcane from "./criteria_common_arcane";
import criteria_common_brawn from "./criteria_common_brawn";
import criteria_common_combat from "./criteria_common_combat";
import criteria_common_intrigue from "./criteria_common_intrigue";
import criteria_common_knowledge from "./criteria_common_knowledge";
import criteria_common_raider from "./criteria_common_raider";
import criteria_common_sex from "./criteria_common_sex";
import criteria_common_slave from "./criteria_common_slave";
import criteria_common_slaving from "./criteria_common_slaving";
import criteria_common_social from "./criteria_common_social";
import criteria_corruption from "./criteria_corruption";
import criteria_fleshshape from "./criteria_fleshshape";
import criteria_heal from "./criteria_heal";
import criteria_purify from "./criteria_purify";
import criteria_quest_recurring from "./criteria_quest_recurring";
import criteria_scout from "./criteria_scout";
import criteria_surgery from "./criteria_surgery";
import criteria_survival from "./criteria_survival";
import criteria_unittraining from "./criteria_unittraining";

export const CRITERIA_DEFINITIONS = {
  ...criteria_common_aid,
  ...criteria_common_arcane,
  ...criteria_common_brawn,
  ...criteria_common_combat,
  ...criteria_corruption,
  ...criteria_fleshshape,
  ...criteria_heal,
  ...criteria_common_intrigue,
  ...criteria_common_knowledge,
  ...criteria_purify,
  ...criteria_quest_recurring,
  ...criteria_common_raider,
  ...criteria_scout,
  ...criteria_common_sex,
  ...criteria_common_slave,
  ...criteria_common_slaving,
  ...criteria_common_social,
  ...criteria_surgery,
  ...criteria_survival,
  ...criteria_unittraining,
};
