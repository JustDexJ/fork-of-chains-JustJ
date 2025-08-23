import { QuestPoolDefinition } from "../classes/quest/QuestPool";

export const QUEST_POOL_DEFINITIONS = definitions<QuestPoolDefinition>()({
  //
  // Generic
  //
  vale: {
    name: "Northern Vale",
  },
  forest: {
    name: "Western Forests",
  },
  city: {
    name: "Kingdom Capital Lucgate",
  },
  deep: {
    name: "Deeprealm",
  },
  desert: {
    name: "Eastern Wasteland",
  },
  sea: {
    name: "Southern Seas",
  },

  //
  // Scouting
  //
  scoutvale: {
    name: "Leads on the Northern Vale",
  },
  scoutcity: {
    name: "Leads on the Kingdom Capital Lucgate",
  },
  scoutforest: {
    name: "Leads on the Western Forests",
  },
  scoutdeep: {
    name: "Leads on the Eastern Wasteland",
  },
  scoutdesert: {
    name: "Leads on the Eastern Wasteland",
  },
  scoutsea: {
    name: "Leads on the Southern Seas",
  },

  //
  // Duties/Contacts
  //
  recruitment: {
    name: "Recruitment (All)",
  },
  recruitmentvale: {
    name: "Recruitment (Vale)",
  },
  recruitmentforest: {
    name: "Recruitment (Forest)",
  },
  recruitmentdeep: {
    name: "Recruitment (Desert)",
  },
  recruitmentdesert: {
    name: "Recruitment (Desert)",
  },
  recruitmentsea: {
    name: "Recruitment (Sea)",
  },

  training: {
    name: "Training Missions",
  },

  rescue: {
    name: "Rescue Missions",
  },

  escapeeasy: {
    name: "Escaped Slaves Recapture Missions (Easy: Lv 15 - 25)",
  },
  escapemedium: {
    name: "Escaped Slaves Recapture Missions (Medium: Lv 35 - 50)",
  },
  escapehard: {
    name: "Escaped Slaves Recapture Missions (Hard: Lv 50 - 70)",
  },

  capturedeasy: {
    name: "Captured Slaver Recapture Missions (Easy: Lv 15 - 25)",
  },
  capturedmedium: {
    name: "Captured Slaver Recapture Missions (Medium: Lv 35 - 50)",
  },
  capturedhard: {
    name: "Captured Slaver Recapture Missions (Hard: Lv 50 - 70)",
  },

  //
  // Others
  //

  // Special quest pool containing only veteran quests
  veteran: {
    name: "Veteran Quests",
  },
});
