import { qres } from "../../_init/preinit_costrestrictions";
import type { UnitCriteriaDefinition } from "../../classes/criteria/UnitCriteria";

export default definitions<UnitCriteriaDefinition>()({
  guard: {
    name: "Guard",
    crit_traits: [
      "bg_soldier",
      "per_brave",
      "per_loyal",
      "per_honorable",
      "eq_valuable",
      "eq_veryvaluable",
    ],
    disaster_traits: [
      "bg_raider",
      "bg_thug",
      "per_cautious",
      "per_independent",
      "per_evil",
    ],
    restrictions: [qres.Job("slaver")] /* requirement */,

    skill_multis: {
      /* skill effects, sums to 3.0 */ combat: 2.0,
      brawn: 1.0,
    },
  },

  fighter: {
    name: "Fighter",
    crit_traits: [
      "bg_adventurer",
      "bg_mercenary",
      "height_tall",
      "height_giant",
      "per_proud",
      "per_stubborn",
      "skill_ambidextrous",
    ],
    disaster_traits: [
      "eq_restrained",
      "eq_blind",
      "height_dwarf",
      "muscle_verythin",
      "muscle_extremelythin",
      "per_humble",
      "per_curious",
    ],
    restrictions: [qres.Job("slaver")] /* requirement */,

    skill_multis: {
      /* skill effects, sums to 3.0 */ combat: 2.0,
      brawn: 1.0,
    },
  },

  guardsupport: {
    name: "Guard Support",
    crit_traits: [
      /* critical traits */ "bg_healer",
      "per_loyal",
      "per_kind",
      "magic_light",
      "magic_light_master",
      "eq_valuable",
      "eq_veryvaluable",
    ],
    disaster_traits: [
      "per_independent",
      "per_cruel",
      "magic_dark",
      "magic_dark_master",
    ],
    restrictions: [qres.Job("slaver")] /* requirement */,

    skill_multis: {
      /* skill effects, sums to 3.0 */ aid: 2.0,
      combat: 1.0,
    },
  },

  defender: {
    name: "Defender",
    crit_traits: [
      "bg_knight",
      "per_kind",
      "per_chaste",
      "per_honorable",
      "eq_valuable",
      "eq_veryvaluable",
    ],
    disaster_traits: [
      "bg_raider",
      "bg_thug",
      "bg_slaver",
      "per_cruel",
      "per_lustful",
      "per_sexaddict",
      "per_lunatic",
      "per_evil",
      "eq_slutty",
      "eq_veryslutty",
    ],
    restrictions: [qres.Job("slaver")] /* requirement */,

    skill_multis: {
      /* skill effects, sum to 3.0 */ combat: 2,
      aid: 1,
    },
  },

  defendersupport: {
    name: "Defender Support",
    crit_traits: [
      /* critical traits */ "breast_large",
      "breast_huge",
      "per_kind",
      "per_chaste",
      "per_honorable",
      "skill_alchemy",
      "magic_light",
      "magic_light_master",
    ],
    disaster_traits: [
      /* disaster traits */ "breast_tiny",
      "breast_titanic",
      "per_cruel",
      "per_lustful",
      "per_sexaddict",
      "per_evil",
      "magic_dark",
      "magic_dark_master",
    ],
    restrictions: [qres.Job("slaver")] /* requirement */,

    skill_multis: {
      /* skill effects, sum to 3.0 */ aid: 2.0,
      social: 1.0,
    },
  },

  dark_warrior: {
    name: "Dark Warrior",
    crit_traits: [
      "bg_mist",
      "corrupted",
      "corruptedfull",
      "per_proud",
      "per_loner",
      "per_independent",
      "per_cruel",
      "per_dominant",
      "per_evil",
      "skill_intimidating",
      "magic_dark",
      "magic_dark_master",
      "eq_valuable",
      "eq_veryvaluable",
    ],
    disaster_traits: [
      "bg_mythical",
      "bg_knight",
      "per_humble",
      "per_gregarious",
      "per_loyal",
      "per_kind",
      "per_playful",
      "per_submissive",
      "per_masochistic",
      "per_honorable",
      "skill_animal",
      "magic_fire",
      "magic_fire_master",
      "magic_light",
      "magic_light_master",
    ],
    restrictions: [qres.Job("slaver")] /* requirement */,

    skill_multis: {
      /* skill effects, sums to 3.0 */ combat: 2.0,
      arcane: 1.0,
    },
  },

  light_warrior: {
    name: "Light Warrior",
    crit_traits: [
      "bg_mythical",
      "bg_knight",
      "per_humble",
      "per_loyal",
      "per_kind",
      "per_serious",
      "per_empath",
      "per_dominant",
      "per_honorable",
      "skill_animal",
      "magic_fire",
      "magic_fire_master",
      "magic_light",
      "magic_light_master",
    ],
    disaster_traits: [
      "bg_mist",
      "corrupted",
      "corruptedfull",
      "per_proud",
      "per_loner",
      "per_independent",
      "per_cruel",
      "per_logical",
      "per_submissive",
      "per_evil",
      "skill_intimidating",
      "magic_dark",
      "magic_dark_master",
      "eq_valuable",
      "eq_veryvaluable",
    ],
    restrictions: [qres.Job("slaver")] /* requirement */,

    skill_multis: {
      /* skill effects, sums to 3.0 */ combat: 2.0,
      aid: 1.0,
    },
  },

  dps: {
    name: "Damager",
    crit_traits: [
      "bg_assassin",
      "tough_nimble",
      "per_lunatic",
      "skill_ambidextrous",
      "skill_creative",
      "magic_fire",
      "magic_fire_master",
      "magic_dark",
      "magic_dark_master",
      "eq_valuable",
      "eq_veryvaluable",
    ],
    disaster_traits: [
      "tough_tough",
      "per_dreamy",
      "per_kind",
      "per_lustful",
      "per_sexaddict",
      "magic_water",
      "magic_water_master",
      "magic_light",
      "magic_light_master",
    ],
    restrictions: [qres.Job("slaver")] /* requirement */,

    skill_multis: {
      /* skill effects, sums to 3.0 */ combat: 2.0,
      intrigue: 1.0,
    },
  },

  pirate: {
    name: "Pirate",
    crit_traits: [
      /* critical traits */ "bg_pirate",
      "per_active",
      "per_playful",
      "per_lunatic",
      "skill_ambidextrous",
      "magic_water",
      "magic_water_master",
    ],
    disaster_traits: [
      /* disaster traits */ "per_studious",
      "per_serious",
      "per_masochistic",
      "magic_fire",
      "magic_fire_master",
    ],
    restrictions: [/* requirement */ qres.Job("slaver")],

    skill_multis: {
      /* skill effects, sums to 3.0 */ combat: 1.0,
      brawn: 1.0,
      slaving: 1.0,
    },
  },

  mercenary: {
    name: "Mercenary",
    crit_traits: [
      /* critical traits */ "bg_mercenary",
      "per_direct",
      "per_frugal",
      "per_independent",
      "magic_fire",
      "magic_fire_master",
      "eq_valuable",
      "eq_veryvaluable",
    ],
    disaster_traits: [
      /* disaster traits */ "per_sly",
      "per_lavish",
      "per_loyal",
      "magic_water",
      "magic_water_master",
      "join_junior",
    ],
    restrictions: [/* requirement */ qres.Job("slaver")],

    skill_multis: {
      /* skill effects, sums to 3.0 */ combat: 1.0,
      brawn: 1.0,
      intrigue: 1.0,
    },
  },

  archer: {
    name: "Archer",
    crit_traits: [
      /* critical traits */ "bg_hunter",
      "height_tall",
      "height_giant",
      "tough_nimble",
      "per_calm",
      "per_loner",
      "per_attentive",
      "skill_flight",
      "magic_wind",
      "magic_wind_master",
      "eq_valuable",
      "eq_veryvaluable",
    ],
    disaster_traits: [
      /* disaster traits */ "height_short",
      "height_dwarf",
      "muscle_verythin",
      "muscle_extremelythin",
      "tough_tough",
      "per_aggressive",
      "per_gregarious",
      "per_dreamy",
      "magic_earth",
      "magic_earth_master",
      "eq_blind",
      "eq_restrained",
    ],
    restrictions: [/* requirement */ qres.Job("slaver")],

    skill_multis: {
      /* skill effects, sums to 3.0 */ combat: 1.5,
      survival: 1.5,
    },
  },

  fighter_vale: {
    name: "Fighter (Vale)",
    crit_traits: [
      "race_wolfkin",
      "subrace_humanvale",
      "muscle_strong",
      "muscle_verystrong",
      "muscle_extremelystrong",
      "tough_tough",
      "per_direct",
      "magic_water",
      "magic_water_master",
      "skill_flight",
    ],
    disaster_traits: [
      "race_greenskin",
      "subrace_humandesert",
      "eq_restrained",
      "eq_blind",
      "muscle_verythin",
      "muscle_extremelythin",
      "tough_nimble",
      "per_sly",
    ],
    restrictions: [qres.Job("slaver")] /* requirement */,

    skill_multis: {
      /* skill effects, sums to 3.0 */ combat: 2.0,
      brawn: 1.0,
    },
  },

  fighter_forest: {
    name: "Fighter (Forest)",
    crit_traits: [
      "subrace_elf",
      "race_catkin",
      "tough_nimble",
      "per_attentive",
      "skill_animal",
      "magic_earth",
      "magic_earth_master",
    ],
    disaster_traits: [
      "subrace_humankingdom",
      "eq_restrained",
      "eq_blind",
      "tough_tough",
      "per_dreamy",
      "skill_flight",
    ],
    restrictions: [qres.Job("slaver")] /* requirement */,

    skill_multis: {
      /* skill effects, sums to 3.0 */ combat: 2.0,
      survival: 1.0,
    },
  },

  fighter_city: {
    name: "Fighter (City)",
    crit_traits: [
      "subrace_humankingdom",
      "per_gregarious",
      "face_scary",
      "face_hideous",
      "skill_intimidating",
      "skill_connected",
      "magic_wind",
      "magic_wind_master",
    ],
    disaster_traits: [
      "eq_restrained",
      "eq_blind",
      "per_loner",
      "face_attractive",
      "face_beautiful",
      "skill_animal",
    ],
    restrictions: [qres.Job("slaver")] /* requirement */,

    skill_multis: {
      /* skill effects, sums to 3.0 */ combat: 2.0,
      intrigue: 1.0,
    },
  },

  fighter_desert: {
    name: "Fighter (Desert)",
    crit_traits: [
      "race_greenskin",
      "subrace_humandesert",
      "tough_tough",
      "per_active",
      "skill_flight",
      "magic_fire",
      "magic_fire_master",
    ],
    disaster_traits: [
      "race_wolfkin",
      "subrace_humanvale",
      "tough_nimble",
      "per_studious",
      "eq_restrained",
      "eq_blind",
    ],
    restrictions: [qres.Job("slaver")] /* requirement */,

    skill_multis: {
      /* skill effects, sums to 3.0 */ combat: 2.0,
      brawn: 1.0,
    },
  },

  fighter_deep: {
    name: "Fighter (Deeprealm)",
    crit_traits: [
      "subrace_drow",
      "subrace_kobold",
      "eyes_neko",
      "per_brave",
      "per_evil",
      "skill_ambidextrous",
      "magic_dark",
      "magic_dark_master",
    ],
    disaster_traits: [
      "subrace_lizardkin",
      "subrace_dragonkin",
      "subrace_humansea",
      "per_cautious",
      "eq_restrained",
      "eq_blind",
      "per_submissive",
      "per_honorable",
      "per_masochistic",
      "per_lunatic",
    ],
    restrictions: [qres.Job("slaver")] /* requirement */,

    skill_multis: {
      /* skill effects, sums to 3.0 */ combat: 2.0,
      slaving: 1.0,
    },
  },

  fighter_sea: {
    name: "Fighter (Sea)",
    crit_traits: [
      "subrace_lizardkin",
      "subrace_dragonkin",
      "subrace_humansea",
      "per_brave",
      "per_honorable",
      "skill_creative",
      "magic_dark",
      "magic_dark_master",
    ],
    disaster_traits: [
      "subrace_drow",
      "subrace_kobold",
      "per_cautious",
      "per_evil",
      "eq_restrained",
      "eq_blind",
      "per_masochistic",
      "per_lunatic",
    ],
    restrictions: [qres.Job("slaver")] /* requirement */,

    skill_multis: {
      /* skill effects, sums to 3.0 */ combat: 2.0,
      knowledge: 1.0,
    },
  },
});
