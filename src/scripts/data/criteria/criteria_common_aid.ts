import { qres } from "../../_init/preinit_costrestrictions";
import type { UnitCriteriaDefinition } from "../../classes/criteria/UnitCriteria";

export default definitions<UnitCriteriaDefinition>()({
  healer: {
    name: "Healer",
    crit_traits: [
      "bg_healer",
      "breast_large",
      "breast_huge",
      "breast_titanic",
      "face_attractive",
      "face_beautiful",
      "per_calm",
      "per_humble",
      "per_kind",
      "magic_light",
      "magic_light_master",
    ],
    disaster_traits: [
      "breast_tiny",
      "face_scary",
      "face_hideous",
      "corrupted",
      "corruptedfull",
      "per_aggressive",
      "per_proud",
      "per_cruel",
      "skill_intimidating",
      "magic_dark",
      "magic_dark_master",
    ],
    restrictions: [qres.Job("slaver")] /* requirement */,

    skill_multis: {
      /* skill effects, sums to 3.0 */ aid: 3.0,
    },
  },

  knight: {
    name: "Knight",
    crit_traits: [
      "bg_knight",
      "per_brave",
      "per_loyal",
      "per_kind",
      "per_chaste",
      "per_honorable",
      "skill_ambidextrous",
      "magic_light",
      "magic_light_master",
      "eq_veryvaluable",
    ],
    disaster_traits: [
      "race_demon",
      "corrupted",
      "corruptedfull",
      "per_cautious",
      "per_independent",
      "per_cruel",
      "per_lustful",
      "per_sexaddict",
      "per_evil",
      "per_lunatic",
      "magic_dark",
      "magic_dark_master",
    ],
    restrictions: [qres.Job("slaver")] /* requirement */,

    skill_multis: {
      /* skill effects, sum to 3.0 */ combat: 1.0,
      brawn: 1.0,
      aid: 1.0,
    },
  },

  squire: {
    name: "Squire",
    crit_traits: [
      "per_humble",
      "per_direct",
      "per_studious",
      "per_loyal",
      "per_submissive",
      "eq_valuable",
      "eq_veryvaluable",
    ],
    disaster_traits: [
      "bg_knight",
      "race_demon",
      "corrupted",
      "corruptedfull",
      "per_proud",
      "per_sly",
      "per_active",
      "per_independent",
      "per_dominant",
      "magic_dark",
      "magic_dark_master",
    ],
    restrictions: [
      qres.Job("slaver"),
      qres.NoTrait("bg_knight"),
    ] /* requirement */,

    skill_multis: {
      /* skill effects, sum to 3.0 */ aid: 2.0,
      social: 1.0,
    },
  },

  support: {
    name: "Support",
    crit_traits: [
      /* critical traits */ "per_humble",
      "per_kind",
      "per_empath",
      "per_honorable",
      "skill_alchemy",
      "magic_light",
      "magic_light_master",
    ],
    disaster_traits: [
      /* disaster traits */ "per_proud",
      "per_cruel",
      "per_logical",
      "per_lunatic",
      "per_evil",
      "skill_intimidating",
      "magic_dark",
      "magic_dark_master",
    ],
    restrictions: [/* requirement */ qres.Job("slaver")],

    skill_multis: {
      /* skill effects, sums to 3.0 */ aid: 3.0,
    },
  },

  maid: {
    name: "Maid / Butler",
    crit_traits: [
      "bg_maid",
      "per_calm",
      "per_humble",
      "per_studious",
      "per_loyal",
      "per_attentive",
      "per_kind",
      "per_submissive",
      "skill_ambidextrous",
      "magic_wind",
      "magic_wind_master",
    ],
    disaster_traits: [
      "per_aggressive",
      "per_proud",
      "per_active",
      "per_independent",
      "per_dreamy",
      "per_cruel",
      "per_dominant",
      "magic_earth",
      "magic_earth_master",
    ],
    restrictions: [/* requirement */ qres.Job("slaver")],

    skill_multis: {
      /* skill effects, sums to 3.0 */ aid: 2.0,
      brawn: 1.0,
    },
  },

  herbalist: {
    name: "Herbalist",
    crit_traits: [
      "bg_wiseman",
      "per_calm",
      "per_attentive",
      "per_kind",
      "skill_alchemy",
      "magic_earth",
      "magic_earth_master",
    ],
    disaster_traits: [
      "per_aggressive",
      "per_dreamy",
      "per_cruel",
      "per_lunatic",
      "magic_wind",
      "magic_wind_master",
    ],
    restrictions: [/* requirement */ qres.Job("slaver")],

    skill_multis: {
      /* skill effects, sums to 3.0 */ aid: 2.0,
      knowledge: 1.0,
    },
  },

  rescuer: {
    name: "Rescuer",
    crit_traits: [
      "bg_boss",
      "bg_informer",
      "per_aggressive",
      "per_attentive",
      "skill_creative",
      "magic_earth",
      "magic_earth_master",
    ],
    disaster_traits: [
      "bg_slave",
      "per_calm",
      "per_dreamy",
      "magic_wind",
      "magic_wind_master",
    ],
    restrictions: [/* requirement */ qres.Job("slaver")],

    skill_multis: {
      /* skill effects, sums to 3.0 */ aid: 1.5,
      intrigue: 1.5,
    },
  },

  priest: {
    name: "Priest",
    crit_traits: [
      "bg_mythical",
      "bg_priest",
      "per_calm",
      "per_honorable",
      "magic_light",
      "magic_light_master",
    ],
    disaster_traits: [
      "corrupted",
      "corruptedfull",
      "per_aggressive",
      "per_evil",
      "per_lunatic",
      "magic_dark",
      "magic_dark_master",
    ],
    restrictions: [/* requirement */ qres.Job("slaver")],

    skill_multis: {
      /* skill effects, sums to 3.0 */ aid: 2.0,
      social: 1.0,
    },
  },

  devout: {
    name: "Devout",
    crit_traits: ["bg_monk", "bg_priest", "per_calm", "per_submissive"],
    disaster_traits: [
      "corrupted",
      "corruptedfull",
      "per_aggressive",
      "per_dominant",
      "per_lunatic",
    ],
    restrictions: [/* requirement */ qres.Job("slaver")],

    skill_multis: {
      /* skill effects, sums to 3.0 */ aid: 3.0,
    },
  },
});
