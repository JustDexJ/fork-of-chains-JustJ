import { qres } from "../../_init/preinit_costrestrictions";
import type { UnitCriteriaDefinition } from "../../classes/criteria/UnitCriteria";

export default definitions<UnitCriteriaDefinition>()({
  builder: {
    name: "Builder",
    crit_traits: [
      "bg_laborer",
      "muscle_strong",
      "muscle_verystrong",
      "muscle_extremelystrong",
      "tough_tough",
      "per_active",
      "per_attentive",
    ],
    disaster_traits: [
      "muscle_thin",
      "muscle_verythin",
      "muscle_extremelythin",
      "tough_nimble",
      "per_studious",
      "per_dreamy",
    ],
    restrictions: [qres.Job("slaver")] /* requirement */,

    skill_multis: {
      /* skill effects, sums to 3.0 */ brawn: 3.0,
    },
  },

  tank: {
    name: "Tank",
    crit_traits: [
      "height_giant",
      "muscle_strong",
      "muscle_verystrong",
      "muscle_extremelystrong",
      "tough_tough",
      "face_scary",
      "face_hideous",
      "per_brave",
      "per_loyal",
      "per_stubborn",
      "per_dominant",
      "per_masochistic",
      "skill_intimidating",
      "eq_valuable",
      "eq_veryvaluable",
    ],
    disaster_traits: [
      "height_dwarf",
      "muscle_thin",
      "muscle_verythin",
      "muscle_extremelythin",
      "tough_nimble",
      "face_attractive",
      "face_beautiful",
      "per_cautious",
      "per_independent",
      "per_curious",
      "per_submissive",
    ],
    restrictions: [qres.Job("slaver")] /* requirement */,

    skill_multis: {
      /* skill effects, sums to 3.0 */ brawn: 2.0,
      combat: 1.0,
    },
  },

  brawler: {
    name: "Brawler",
    crit_traits: [
      "height_giant",
      "muscle_strong",
      "muscle_verystrong",
      "muscle_extremelystrong",
      "tough_tough",
      "face_scary",
      "face_hideous",
      "per_aggressive",
      "skill_intimidating",
    ],
    disaster_traits: [
      "height_dwarf",
      "muscle_thin",
      "muscle_verythin",
      "muscle_extremelythin",
      "tough_nimble",
      "face_attractive",
      "face_beautiful",
      "per_calm",
    ],
    restrictions: [qres.Job("slaver")] /* requirement */,

    skill_multis: {
      /* skill effects, sums to 3.0 */ brawn: 2.0,
      combat: 1.0,
    },
  },

  carrier: {
    name: "Carrier",
    crit_traits: [
      "bg_laborer",
      "muscle_verystrong",
      "muscle_extremelystrong",
      "per_slow",
      "per_direct",
      "per_submissive",
    ],
    disaster_traits: [
      "muscle_verythin",
      "muscle_extremelythin",
      "per_sly",
      "per_dominant",
      "per_lunatic",
    ],
    restrictions: [qres.Job("slaver")] /* requirement */,

    skill_multis: {
      /* skill effects, sums to 3.0 */ brawn: 3.0,
    },
  },

  dragontamer: {
    name: "Dragon Tamer",
    crit_traits: [
      /* critical traits */ "race_lizardkin",
      "per_brave",
      "per_aggressive",
      "per_masochistic",
      "per_honorable",
      "skill_hypnotic",
      "skill_animal",
      "magic_fire",
      "magic_fire_master",
      "magic_light",
      "magic_light_master",
    ],
    disaster_traits: [
      /* disaster traits */ "race_human",
      "race_elf",
      "race_catkin",
      "per_cautious",
      "per_calm",
      "per_lunatic",
      "per_evil",
      "magic_water",
      "magic_water_master",
      "magic_dark",
      "magic_dark_master",
    ],
    restrictions: [/* requirement */ qres.Job("slaver")],

    skill_multis: {
      /* skill effects, sums to 3.0 */ brawn: 1.0,
      slaving: 1.0,
      knowledge: 1.0,
    },
  },

  blacksmith: {
    name: "Blacksmith",
    crit_traits: [
      /* critical traits */ "bg_metalworker",
      "bg_artisan",
      "race_greenskin",
      "muscle_strong",
      "muscle_verystrong",
      "muscle_extremelystrong",
      "tough_tough",
      "per_calm",
      "skill_creative",
      "magic_fire",
      "magic_fire_master",
    ],
    disaster_traits: [
      /* disaster traits */ "muscle_thin",
      "muscle_verythin",
      "muscle_extremelythin",
      "tough_nimble",
      "per_aggressive",
      "magic_water",
      "magic_water_master",
    ],
    restrictions: [/* requirement */ qres.Job("slaver")],

    skill_multis: {
      /* skill effects, sums to 3.0 */ brawn: 1.5,
      knowledge: 1.5,
    },
  },

  bodyguard: {
    name: "Bodyguard",
    crit_traits: [
      "height_tall",
      "height_giant",
      "muscle_strong",
      "muscle_verystrong",
      "muscle_extremelystrong",
      "face_scary",
      "face_hideous",
      "per_loyal",
      "per_attentive",
      "per_stubborn",
      "skill_intimidating",
    ],
    disaster_traits: [
      "height_short",
      "height_dwarf",
      "muscle_thin",
      "muscle_verythin",
      "muscle_extremelythin",
      "face_attractive",
      "face_beautiful",
      "per_independent",
      "per_dreamy",
      "per_curious",
    ],
    restrictions: [qres.Job("slaver")] /* requirement */,

    skill_multis: {
      /* skill effects, sums to 3.0 */ brawn: 2.0,
      survival: 1.0,
    },
  },

  thug: {
    name: "Thug",
    crit_traits: [
      "height_giant",
      "muscle_strong",
      "muscle_verystrong",
      "muscle_extremelystrong",
      "face_scary",
      "face_hideous",
      "skill_intimidating",
      "per_stubborn",
      "per_aggressive",
      "per_dominant",
    ],
    disaster_traits: [
      "height_dwarf",
      "muscle_thin",
      "muscle_verythin",
      "muscle_extremelythin",
      "face_attractive",
      "face_beautiful",
      "per_curious",
      "per_calm",
      "per_submissive",
      "per_kind",
      "per_masochistic",
    ],
    restrictions: [qres.Job("slaver")] /* requirement */,

    skill_multis: {
      /* skill effects, sums to 3.0 */ brawn: 2.0,
      slaving: 1.0,
    },
  },
});
