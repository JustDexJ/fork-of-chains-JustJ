import { qres } from "../../_init/preinit_costrestrictions";
import type { UnitCriteriaDefinition } from "../../classes/criteria/UnitCriteria";

export default definitions<UnitCriteriaDefinition>()({
  heal_head: {
    name: "Head Healer",
    crit_traits: [
      "bg_healer",
      "per_calm",
      "per_humble",
      "per_kind",
      "per_empath",
      "per_submissive",
      "magic_light",
      "magic_light_master",
    ],
    disaster_traits: [
      "corrupted",
      "corruptedfull",
      "per_aggressive",
      "per_proud",
      "per_cruel",
      "per_logical",
      "per_dominant",
      "per_lunatic",
      "magic_dark",
      "magic_dark_master",
    ],
    restrictions: [qres.Job("slaver"), qres.Trait("magic_light")],

    skill_multis: {
      aid: 2.0,
      arcane: 1.0,
    },
  },

  heal_head_master: {
    name: "Head Healer (Expert)",
    crit_traits: [
      "bg_healer",
      "per_calm",
      "per_humble",
      "per_kind",
      "per_empath",
      "per_submissive",
      "magic_light",
      "magic_light_master",
    ],
    disaster_traits: [
      "corrupted",
      "corruptedfull",
      "per_aggressive",
      "per_proud",
      "per_cruel",
      "per_logical",
      "per_dominant",
      "per_lunatic",
      "magic_dark",
      "magic_dark_master",
    ],
    restrictions: [qres.Job("slaver"), qres.Trait("magic_light_master")],

    skill_multis: {
      aid: 2.0,
      arcane: 1.0,
    },
  },

  heal_assistant: {
    name: "Assistant Healer",
    crit_traits: [
      "per_humble",
      "per_empath",
      "per_submissive",
      "magic_light",
      "magic_light_master",
    ],
    disaster_traits: [
      "corrupted",
      "corruptedfull",
      "per_aggressive",
      "per_proud",
      "per_cruel",
      "per_logical",
      "per_dominant",
      "per_lunatic",
      "magic_dark",
      "magic_dark_master",
    ],
    restrictions: [qres.Job("slaver")],

    skill_multis: {
      aid: 3.0,
    },
  },
});
