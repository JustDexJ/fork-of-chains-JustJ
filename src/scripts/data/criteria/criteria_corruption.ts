import { qres } from "../../_init/preinit_costrestrictions";
import type { UnitCriteriaDefinition } from "../../classes/criteria/UnitCriteria";

export default definitions<UnitCriteriaDefinition>()({
  corruption_head: {
    name: "Head Corruptor",
    crit_traits: [
      "race_demon",
      "bg_mist",
      "corrupted",
      "corruptedfull",
      "per_cruel",
      "per_dominant",
      "per_evil",
      "magic_dark",
      "magic_dark_master",
    ],
    disaster_traits: [
      "per_kind",
      "per_chaste",
      "per_submissive",
      "per_masochistic",
      "per_honorable",
      "magic_light",
      "magic_light_master",
    ],
    restrictions: [qres.Job("slaver"), qres.Trait("magic_dark")],

    skill_multis: {
      arcane: 3.0,
    },
  },

  corruption_assistant: {
    name: "Assistant Corruptor",
    crit_traits: [
      "bg_apprentice",
      "bg_mist",
      "per_stubborn",
      "per_cruel",
      "per_evil",
      "magic_dark",
      "magic_dark_master",
    ],
    disaster_traits: [
      "per_curious",
      "per_kind",
      "per_honorable",
      "magic_light",
      "magic_light_master",
    ],
    restrictions: [qres.Job("slaver")],

    skill_multis: {
      arcane: 2.0,
      slaving: 1.0,
    },
  },

  corruptor: {
    name: "Corruptor",
    crit_traits: [
      "bg_mist",
      "corrupted",
      "corruptedfull",
      "per_cruel",
      "per_sexaddict",
      "per_dominant",
      "per_lunatic",
      "per_evil",
      "skill_hypnotic",
      "magic_dark",
      "magic_dark_master",
    ],
    disaster_traits: [
      "per_kind",
      "per_chaste",
      "per_submissive",
      "per_honorable",
      "magic_fire",
      "magic_fire_master",
      "magic_light",
      "magic_light_master",
    ],
    restrictions: [qres.Job("slaver"), qres.Trait("magic_dark")],

    skill_multis: {
      arcane: 3.0,
    },
  },

  corruption_head_master: {
    name: "Head Corruptor (Advanced)",
    crit_traits: [
      "race_demon",
      "bg_mist",
      "corrupted",
      "corruptedfull",
      "per_cruel",
      "per_dominant",
      "per_evil",
    ],
    disaster_traits: [
      "per_kind",
      "per_chaste",
      "per_submissive",
      "per_masochistic",
      "per_honorable",
      "magic_light",
      "magic_light_master",
    ],
    restrictions: [qres.Job("slaver"), qres.Trait("magic_dark_master")],

    skill_multis: {
      arcane: 3.0,
    },
  },
});
