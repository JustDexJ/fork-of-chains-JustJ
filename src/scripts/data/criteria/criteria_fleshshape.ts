import { qres } from "../../_init/preinit_costrestrictions";
import type { UnitCriteriaDefinition } from "../../classes/criteria/UnitCriteria";

export default definitions<UnitCriteriaDefinition>()({
  fleshshape_head: {
    name: "Head Flesh-Shaper",
    crit_traits: [
      "subrace_humanvale",
      "race_wolfkin",
      "per_cautious",
      "per_attentive",
      "per_empath",
      "per_chaste",
      "magic_water",
      "magic_water_master",
    ],
    disaster_traits: [
      "per_brave",
      "per_dreamy",
      "per_logical",
      "per_lustful",
      "per_sexaddict",
      "per_lunatic",
      "magic_fire",
      "magic_fire_master",
    ],
    restrictions: [qres.Job("slaver"), qres.Trait("magic_water")],

    skill_multis: {
      arcane: 3.0,
    },
  },

  fleshshape_assistant: {
    name: "Assistant Flesh-Shaper",
    crit_traits: [
      "subrace_humanvale",
      "race_wolfkin",
      "per_cautious",
      "per_attentive",
      "per_empath",
      "per_chaste",
      "magic_water",
      "magic_water_master",
    ],
    disaster_traits: [
      "per_brave",
      "per_dreamy",
      "per_logical",
      "per_lustful",
      "per_sexaddict",
      "per_lunatic",
      "magic_fire",
      "magic_fire_master",
    ],
    restrictions: [qres.Job("slaver")],

    skill_multis: {
      arcane: 2.0,
      aid: 1.0,
    },
  },
});
