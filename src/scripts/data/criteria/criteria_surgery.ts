import { qres } from "../../_init/preinit_costrestrictions";
import type { UnitCriteriaDefinition } from "../../classes/criteria/UnitCriteria";

export default definitions<UnitCriteriaDefinition>()({
  surgery_head: {
    name: "Head Surgeon",
    crit_traits: [
      "bg_healer",
      "tough_nimble",
      "per_cautious",
      "per_calm",
      "per_attentive",
      "per_serious",
      "magic_light",
      "magic_light_master",
    ],
    disaster_traits: [
      "tough_tough",
      "per_aggressive",
      "per_dreamy",
      "per_stubborn",
      "per_cruel",
      "per_playful",
      "per_lunatic",
      "per_evil",
      "magic_dark",
      "magic_dark_master",
    ],
    restrictions: [qres.Job("slaver"), qres.Trait("magic_water_master")],

    skill_multis: {
      arcane: 1.5,
      aid: 1.5,
    },
  },

  surgery_assistant: {
    name: "Assistant Surgeon",
    crit_traits: [
      "bg_apprentice",
      "per_cautious",
      "per_calm",
      "per_attentive",
      "per_submissive",
      "magic_water",
      "magic_water_master",
      "magic_light",
      "magic_light_master",
    ],
    disaster_traits: [
      "per_aggressive",
      "per_dreamy",
      "per_stubborn",
      "per_cruel",
      "per_dominant",
      "per_lunatic",
      "per_evil",
      "magic_dark",
      "magic_dark_master",
    ],
    restrictions: [qres.Job("slaver")],

    skill_multis: {
      arcane: 1.5,
      aid: 1.5,
    },
  },
});
