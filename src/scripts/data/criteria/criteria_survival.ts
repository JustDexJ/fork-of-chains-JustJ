import { qres } from "../../_init/preinit_costrestrictions";
import type { UnitCriteriaDefinition } from "../../classes/criteria/UnitCriteria";

export default definitions<UnitCriteriaDefinition>()({
  hunter: {
    name: "Hunter",
    crit_traits: [
      "bg_hunter",
      "tough_nimble",
      "per_calm",
      "per_loner",
      "per_attentive",
      "per_stubborn",
      "skill_animal",
    ],
    disaster_traits: [
      "tough_tough",
      "per_aggressive",
      "per_gregarious",
      "per_dreamy",
      "per_curious",
      "per_lunatic",
      "magic_fire",
      "magic_fire_master",
    ],
    restrictions: [qres.Job("slaver")] /* requirement */,

    skill_multis: {
      /* skill effects, sums to 3.0 */ survival: 2.0,
      combat: 1.0,
    },
  },

  trapper: {
    name: "Trapper",
    crit_traits: [
      "bg_woodsman",
      "per_calm",
      "per_loner",
      "per_curious",
      "per_playful",
      "skill_animal",
      "magic_earth",
      "magic_earth_master",
    ],
    disaster_traits: [
      "per_aggressive",
      "per_gregarious",
      "per_stubborn",
      "per_serious",
      "magic_wind",
      "magic_wind_master",
    ],
    restrictions: [qres.Job("slaver")] /* requirement */,

    skill_multis: {
      /* skill effects, sums to 3.0 */ survival: 2.0,
      slaving: 1.0,
    },
  },

  scavenger: {
    name: "Scavenger",
    crit_traits: [
      "per_aggressive",
      "per_loner",
      "per_attentive",
      "skill_flight",
      "magic_light",
      "magic_light_master",
    ],
    disaster_traits: [
      "corrupted",
      "corruptedfull",
      "per_calm",
      "per_gregarious",
      "per_dreamy",
      "per_lunatic",
      "magic_dark",
      "magic_dark_master",
    ],
    restrictions: [qres.Job("slaver")] /* requirement */,

    skill_multis: {
      /* skill effects, sums to 3.0 */ survival: 2.0,
      knowledge: 1.0,
    },
  },

  spotter: {
    name: "Spotter",
    crit_traits: [
      "eyes_neko",
      "eyes_dragonkin",
      "per_aggressive",
      "per_attentive",
      "skill_flight",
      "magic_light",
      "magic_light_master",
    ],
    disaster_traits: [
      "per_calm",
      "per_dreamy",
      "per_sexaddict",
      "magic_dark",
      "magic_dark_master",
    ],
    restrictions: [qres.Job("slaver")] /* requirement */,

    skill_multis: {
      /* skill effects, sums to 3.0 */ survival: 3.0,
    },
  },
});
