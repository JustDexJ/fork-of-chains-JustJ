import { qres } from "../../_init/preinit_costrestrictions";
import type { UnitCriteriaDefinition } from "../../classes/criteria/UnitCriteria";

export default definitions<UnitCriteriaDefinition>()({
  infiltrator: {
    name: "Infiltrator",
    crit_traits: [
      /* critical traits */ "bg_assassin",
      "bg_thief",
      "height_dwarf",
      "tough_nimble",
      "per_smart",
      "per_sly",
      "per_attentive",
      "skill_connected",
      "skill_hypnotic",
      "magic_dark",
      "magic_dark_master",
    ],
    disaster_traits: [
      /* disaster traits */ "height_giant",
      "muscle_verystrong",
      "muscle_extremelystrong",
      "tough_tough",
      "per_slow",
      "per_direct",
      "per_dreamy",
      "per_honorable",
      "magic_light",
      "magic_light_master",
    ],
    restrictions: [qres.Job("slaver")] /* requirement */,

    skill_multis: {
      /* skill effects, sums to 3.0 */ intrigue: 3.0,
    },
  },

  thief: {
    name: "Thief",
    crit_traits: [
      /* critical traits */ "bg_thief",
      "height_dwarf",
      "tough_nimble",
      "per_aggressive",
      "per_loner",
      "per_frugal",
      "per_independent",
      "per_attentive",
      "skill_flight",
      "magic_dark",
      "magic_dark_master",
    ],
    disaster_traits: [
      "height_giant",
      "muscle_verystrong",
      "muscle_extremelystrong",
      "tough_tough",
      "per_calm",
      "per_gregarious",
      "per_lavish",
      "per_loyal",
      "per_dreamy",
      "per_honorable",
      "magic_light",
      "magic_light_master",
    ],
    restrictions: [qres.Job("slaver")] /* requirement */,

    skill_multis: {
      /* skill effects, sums to 3.0 */ intrigue: 3.0,
    },
  },

  kidnapper: {
    name: "Kidnapper",
    crit_traits: [
      /* critical traits */ "tough_nimble",
      "per_cruel",
      "per_dominant",
      "per_evil",
      "skill_hypnotic",
      "magic_dark",
      "magic_dark_master",
    ],
    disaster_traits: [
      /* disaster traits */ "tough_tough",
      "per_kind",
      "per_submissive",
      "per_honorable",
      "magic_light",
      "magic_light_master",
    ],
    restrictions: [qres.Job("slaver")] /* requirement */,

    skill_multis: {
      /* skill effects, sums to 3.0 */ intrigue: 1.5,
      slaving: 1.5,
    },
  },

  schemer: {
    name: "Schemer",
    crit_traits: [
      /* critical traits */ "per_cautious",
      "per_calm",
      "per_sly",
      "per_studious",
      "per_logical",
      "skill_creative",
    ],
    disaster_traits: [
      /* disaster traits */ "per_brave",
      "per_aggressive",
      "per_direct",
      "per_active",
      "per_empath",
    ],
    restrictions: [qres.Job("slaver")] /* requirement */,

    skill_multis: {
      /* skill effects, sums to 3.0 */ intrigue: 3.0,
    },
  },

  conartist: {
    name: "Con Artist",
    crit_traits: [
      /* critical traits */ "per_sly",
      "per_gregarious",
      "per_playful",
      "per_lunatic",
      "per_evil",
      "skill_hypnotic",
    ],
    disaster_traits: [
      /* disaster traits */ "bg_thug",
      "per_direct",
      "per_loner",
      "per_serious",
      "per_honorable",
    ],
    restrictions: [qres.Job("slaver")] /* requirement */,

    skill_multis: {
      /* skill effects, sums to 3.0 */ intrigue: 1.5,
      social: 1.5,
    },
  },

  shadow_fighter: {
    name: "Shadow Fighter",
    crit_traits: [
      /* critical traits */ "bg_assassin",
      "tough_nimble",
      "per_calm",
      "per_serious",
      "skill_ambidextrous",
      "magic_dark",
      "magic_dark_master",
      "eq_valuable",
      "eq_veryvaluable",
    ],
    disaster_traits: [
      /* disaster traits */ "tough_tough",
      "per_aggressive",
      "per_playful",
      "per_lunatic",
      "magic_fire",
      "magic_fire_master",
      "magic_light",
      "magic_light_master",
    ],
    restrictions: [qres.Job("slaver")] /* requirement */,

    skill_multis: {
      /* skill effects, sums to 3.0 */ intrigue: 1.0,
      combat: 1.0,
      survival: 1.0,
    },
  },
});
