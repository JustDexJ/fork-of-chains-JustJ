import { qres } from "../../_init/preinit_costrestrictions";
import type { UnitCriteriaDefinition } from "../../classes/criteria/UnitCriteria";

export default definitions<UnitCriteriaDefinition>()({
  scout_vale: {
    name: "Scout (Vale)",
    crit_traits: [
      "race_wolfkin",
      "subrace_humanvale",
      "per_cautious",
      "per_direct",
      "per_curious",
      "skill_flight",
      "magic_water",
      "magic_water_master",
    ],
    disaster_traits: [
      "race_greenskin",
      "subrace_humandesert",
      "per_brave",
      "per_sly",
      "per_stubborn",
      "magic_fire",
      "magic_fire_master",
    ],
    restrictions: [qres.Job("slaver")],

    skill_multis: {
      survival: 2.0,
      knowledge: 1.0,
    },
  },

  scout_city: {
    name: "Scout (City)",
    crit_traits: [
      "subrace_humankingdom",
      "bg_informer",
      "per_calm",
      "per_sly",
      "per_frugal",
      "skill_connected",
      "magic_wind",
      "magic_wind_master",
    ],
    disaster_traits: [
      "race_elf",
      "race_catkin",
      "per_aggressive",
      "per_direct",
      "per_lavish",
      "skill_intimidating",
      "magic_earth",
      "magic_earth_master",
    ],
    restrictions: [qres.Job("slaver")],

    skill_multis: {
      survival: 1.0,
      social: 1.0,
      intrigue: 1.0,
    },
  },

  scout_forest: {
    name: "Scout (Forest)",
    crit_traits: [
      "race_elf",
      "race_catkin",
      "bg_woodsman",
      "bg_hunter",
      "per_cautious",
      "per_loner",
      "skill_animal",
      "magic_earth",
      "magic_earth_master",
    ],
    disaster_traits: [
      "subrace_humankingdom",
      "per_brave",
      "per_gregarious",
      "magic_wind",
      "magic_wind_master",
    ],
    restrictions: [qres.Job("slaver")],

    skill_multis: {
      survival: 3.0,
    },
  },

  scout_deep: {
    name: "Scout (Deep)",
    crit_traits: [
      "bg_laborer",
      "per_brave",
      "per_loner",
      "magic_dark",
      "magic_dark_master",
    ],
    disaster_traits: [
      "subrace_humansea",
      "subrace_dragonkin",
      "per_cautious",
      "per_gregarious",
      "magic_light",
      "magic_light_master",
    ],
    restrictions: [qres.Job("slaver")],

    skill_multis: {
      survival: 2.0,
      combat: 1.0,
    },
  },

  scout_desert: {
    name: "Scout (Desert)",
    crit_traits: [
      "subrace_humandesert",
      "race_greenskin",
      "bg_nomad",
      "tough_tough",
      "per_cautious",
      "per_direct",
      "skill_intimidating",
      "magic_fire",
      "magic_fire_master",
    ],
    disaster_traits: [
      "subrace_humanvale",
      "race_wolfkin",
      "per_brave",
      "per_sly",
      "magic_water",
      "magic_water_master",
    ],
    restrictions: [qres.Job("slaver")],

    skill_multis: {
      survival: 2.0,
      brawn: 1.0,
    },
  },

  scout_sea: {
    name: "Scout (Sea)",
    crit_traits: [
      "subrace_humansea",
      "race_lizardkin",
      "bg_seaman",
      "bg_pirate",
      "per_cautious",
      "per_loner",
      "per_empath",
      "skill_hypnotic",
      "magic_water",
      "magic_water_master",
      "magic_light",
      "magic_light_master",
    ],
    disaster_traits: [
      "subrace_humandesert",
      "race_greenskin",
      "race_demon",
      "per_brave",
      "per_gregarious",
      "per_logical",
      "magic_fire",
      "magic_fire_master",
      "magic_dark",
      "magic_dark_master",
    ],
    restrictions: [qres.Job("slaver")],

    skill_multis: {
      survival: 2.0,
      arcane: 1.0,
    },
  },

  scout_guard: {
    name: "Scout (Guard)",
    crit_traits: [
      "bg_adventurer",
      "bg_mercenary",
      "bg_soldier",
      "tough_tough",
      "per_aggressive",
      "per_proud",
      "per_dominant",
      "per_masochistic",
    ],
    disaster_traits: [
      "bg_healer",
      "bg_priest",
      "tough_nimble",
      "per_calm",
      "per_humble",
      "per_submissive",
      "per_lunatic",
    ],
    restrictions: [qres.Job("slaver")],

    skill_multis: {
      survival: 1.0,
      combat: 2.0,
    },
  },
});
