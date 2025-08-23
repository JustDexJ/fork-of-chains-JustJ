import { qres } from "../../_init/preinit_costrestrictions";
import type { UnitCriteriaDefinition } from "../../classes/criteria/UnitCriteria";

export default definitions<UnitCriteriaDefinition>()({
  purify_head: {
    name: "Head Purifier",
    crit_traits: [
      "bg_priest",
      "per_calm",
      "per_humble",
      "per_kind",
      "per_chaste",
      "per_submissive",
      "per_honorable",
      "magic_fire",
      "magic_fire_master",
    ],
    disaster_traits: [
      "race_demon",
      "corrupted",
      "corruptedfull",
      "per_aggressive",
      "per_proud",
      "per_cruel",
      "per_lustful",
      "per_sexaddict",
      "per_dominant",
      "per_evil",
      "magic_dark",
      "magic_dark_master",
    ],
    restrictions: [qres.Job("slaver"), qres.Trait("magic_fire")],

    skill_multis: {
      aid: 1.5,
      arcane: 1.5,
    },
  },

  purify_head_master: {
    name: "Head Purifier (Advanced)",
    crit_traits: [
      "bg_priest",
      "per_calm",
      "per_humble",
      "per_kind",
      "per_chaste",
      "per_submissive",
      "per_honorable",
    ],
    disaster_traits: [
      "race_demon",
      "corrupted",
      "corruptedfull",
      "per_aggressive",
      "per_proud",
      "per_cruel",
      "per_lustful",
      "per_sexaddict",
      "per_dominant",
      "per_evil",
      "magic_dark",
      "magic_dark_master",
    ],
    restrictions: [qres.Job("slaver"), qres.Trait("magic_fire_master")],

    skill_multis: {
      aid: 1.5,
      arcane: 1.5,
    },
  },

  purify_assistant: {
    name: "Assistant Purifier",
    crit_traits: [
      "bg_apprentice",
      "per_humble",
      "per_chaste",
      "per_submissive",
      "magic_fire",
      "magic_fire_master",
    ],
    disaster_traits: [
      "race_demon",
      "corrupted",
      "corruptedfull",
      "per_aggressive",
      "per_proud",
      "per_cruel",
      "per_lustful",
      "per_sexaddict",
      "per_dominant",
      "per_evil",
      "magic_dark",
      "magic_dark_master",
    ],
    restrictions: [qres.Job("slaver")],

    skill_multis: {
      knowledge: 1.5,
      aid: 1.5,
    },
  },

  repentant: {
    name: "Repentant",
    crit_traits: [
      "corrupted",
      "corruptedfull",
      "per_calm",
      "per_chaste",
      "per_honorable",
      "magic_fire",
      "magic_fire_master",
    ],
    disaster_traits: [
      "per_aggressive",
      "per_proud",
      "per_cruel",
      "per_lustful",
      "per_sexaddict",
      "per_dominant",
      "per_lunatic",
      "per_evil",
      "magic_dark",
      "magic_dark_master",
    ],
    restrictions: [qres.Job("slaver"), qres.NoTrait("race_demon")],

    skill_multis: {
      arcane: 1.0,
      aid: 1.0,
      social: 1.0,
    },
  },

  purifier: {
    name: "Purifier",
    crit_traits: [
      "bg_priest",
      "per_calm",
      "per_humble",
      "per_studious",
      "per_kind",
      "per_chaste",
      "per_submissive",
      "per_honorable",
      "magic_fire",
      "magic_fire_master",
    ],
    disaster_traits: [
      "race_demon",
      "corrupted",
      "corruptedfull",
      "per_aggressive",
      "per_proud",
      "per_active",
      "per_cruel",
      "per_lustful",
      "per_sexaddict",
      "per_dominant",
      "per_evil",
      "magic_dark",
      "magic_dark_master",
    ],
    restrictions: [qres.Job("slaver")],

    skill_multis: {
      aid: 2.0,
      arcane: 1.0,
    },
  },
});
