import { qres } from "../../_init/preinit_costrestrictions";
import type { UnitCriteriaDefinition } from "../../classes/criteria/UnitCriteria";

export default definitions<UnitCriteriaDefinition>()({
  raider: {
    name: "Raider",
    crit_traits: [
      "bg_mercenary",
      "bg_slaver",
      "bg_soldier",
      "bg_raider",
      "height_giant",
      "muscle_verystrong",
      "muscle_extremelystrong",
      "face_scary",
      "face_hideous",
      "per_aggressive",
      "per_proud",
      "per_active",
      "per_cruel",
      "per_evil",
      "skill_ambidextrous",
      "skill_intimidating",
    ],
    disaster_traits: [
      "bg_healer",
      "bg_priest",
      "height_dwarf",
      "muscle_verythin",
      "muscle_extremelythin",
      "face_attractive",
      "face_beautiful",
      "per_calm",
      "per_humble",
      "per_studious",
      "per_kind",
      "per_honorable",
    ],
    restrictions: [qres.Job("slaver")] /* requirement */,

    skill_multis: {
      /* skill effects, sum to 3.0 */ combat: 2.0,
      brawn: 1.0,
    },
  },

  raidersupport: {
    name: "Raider Support",
    crit_traits: [
      /* critical traits */ "bg_slaver",
      "bg_raider",
      "per_humble",
      "per_studious",
      "per_submissive",
      "per_evil",
      "magic_light",
      "magic_light_master",
    ],
    disaster_traits: [
      /* disaster traits */ "corrupted",
      "corruptedfull",
      "per_proud",
      "per_active",
      "per_dominant",
      "per_honorable",
      "magic_dark",
      "magic_dark_master",
    ],
    restrictions: [qres.Job("slaver")] /* requirement */,

    skill_multis: {
      /* skill effects, sum to 3.0 */ aid: 2.0,
      knowledge: 1.0,
    },
  },
});
