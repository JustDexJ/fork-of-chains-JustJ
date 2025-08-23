import { qres } from "../../_init/preinit_costrestrictions";
import type { UnitCriteriaDefinition } from "../../classes/criteria/UnitCriteria";

export default definitions<UnitCriteriaDefinition>()({
  slaver: {
    name: "Slaver (Generic)",
    crit_traits: [
      /* critical traits */
    ],
    disaster_traits: [],
    restrictions: [qres.Job("slaver")] /* requirement */,

    skill_multis: {
      /* skill effects, sums to 3.0 */
    },
  },

  slavetrader: {
    name: "Slave Trader",
    crit_traits: [
      /* critical traits */ "bg_merchant",
      "per_sly",
      "per_frugal",
      "per_cruel",
      "magic_wind",
      "magic_wind_master",
    ],
    disaster_traits: [
      /* disaster traits */ "bg_slave",
      "per_direct",
      "per_lavish",
      "per_kind",
      "per_submissive",
    ],
    restrictions: [qres.Job("slaver")] /* requirement */,

    skill_multis: {
      /* skill effects, sums to 3.0 */ social: 2.0,
      slaving: 1.0,
    },
  },

  slavetrainer: {
    name: "Slave Trainer",
    crit_traits: [
      /* critical traits */ "bg_slaver",
      "face_scary",
      "face_hideous",
      "per_dominant",
      "per_evil",
      "skill_intimidating",
      "skill_creative",
      "magic_wind",
      "magic_wind_master",
      "magic_earth",
      "magic_earth_master",
    ],
    disaster_traits: [
      /* disaster traits */ "bg_slave",
      "per_kind",
      "per_submissive",
      "per_honorable",
      "magic_light",
      "magic_light_master",
    ],
    restrictions: [qres.Job("slaver")] /* requirement */,

    skill_multis: {
      /* skill effects, sums to 3.0 */ slaving: 3.0,
    },
  },

  slaveappraiser: {
    name: "Slave Appraiser",
    crit_traits: [
      /* critical traits */ "per_calm",
      "per_frugal",
      "per_attentive",
      "per_curious",
      "per_evil",
      "magic_wind",
      "magic_wind_master",
      "magic_earth",
      "magic_earth_master",
    ],
    disaster_traits: [
      "bg_slave",
      "per_aggressive",
      "per_lavish",
      "per_dreamy",
      "per_stubborn",
      "per_lunatic",
      "per_honorable",
      "magic_fire",
      "magic_fire_master",
      "magic_dark",
      "magic_dark_master",
    ],
    restrictions: [qres.Job("slaver")] /* requirement */,

    skill_multis: {
      /* skill effects, sums to 3.0 */ slaving: 1.0,
      knowledge: 1.0,
      sex: 1.0,
    },
  },

  slavehandler: {
    name: "Slave Handler",
    crit_traits: [
      /* critical traits */ "bg_slaver",
      "per_cruel",
      "per_dominant",
      "per_evil",
      "magic_wind",
      "magic_wind_master",
    ],
    disaster_traits: [
      "bg_slave",
      "per_kind",
      "per_submissive",
      "per_lunatic",
      "per_honorable",
      "magic_earth",
      "magic_earth_master",
    ],
    restrictions: [qres.Job("slaver")] /* requirement */,

    skill_multis: {
      /* skill effects, sums to 3.0 */ slaving: 3.0,
    },
  },

  slavecapturer: {
    name: "Slave Capturer",
    crit_traits: [
      /* critical traits */ "bg_slaver",
      "tough_nimble",
      "per_aggressive",
      "per_active",
      "per_stubborn",
      "per_evil",
      "magic_wind",
      "magic_wind_master",
    ],
    disaster_traits: [
      "bg_slave",
      "tough_tough",
      "per_calm",
      "per_studious",
      "per_curious",
      "per_honorable",
      "magic_earth",
      "magic_earth_master",
    ],
    restrictions: [qres.Job("slaver")] /* requirement */,

    skill_multis: {
      /* skill effects, sums to 3.0 */ slaving: 2.0,
      brawn: 1.0,
    },
  },

  milker: {
    name: "Milker",
    crit_traits: [
      /* critical traits */ "bg_farmer",
      "bg_foodworker",
      "muscle_strong",
      "per_active",
      "per_playful",
      "skill_animal",
    ],
    disaster_traits: [
      "bg_slave",
      "muscle_extremelythin",
      "muscle_extremelystrong",
      "per_studious",
      "per_serious",
    ],
    restrictions: [qres.Job("slaver")] /* requirement */,

    skill_multis: {
      /* skill effects, sums to 3.0 */ slaving: 1.5,
      aid: 1.5,
    },
  },
});
