import { qres } from "../../_init/preinit_costrestrictions";
import type { UnitCriteriaDefinition } from "../../classes/criteria/UnitCriteria";

export default definitions<UnitCriteriaDefinition>()({
  training_head: {
    name: "Head Slave Trainer",
    crit_traits: [
      "bg_slaver",
      "face_scary",
      "face_hideous",
      "per_cruel",
      "per_logical",
      "per_dominant",
      "skill_intimidating",
      "skill_hypnotic",
      "magic_wind",
      "magic_wind_master",
      "magic_earth",
      "magic_earth_master",
    ],
    disaster_traits: [
      "face_attractive",
      "face_beautiful",
      "bg_slave",
      "per_kind",
      "per_empath",
      "per_submissive",
    ],
    restrictions: [qres.Job("slaver")],

    skill_multis: {
      slaving: 1.5,
      knowledge: 1.0,
      social: 0.5,
    },
  },

  training_trainer_nosex: {
    name: "Slave Trainer (No sex)",
    crit_traits: [
      "bg_slaver",
      "per_cruel",
      "per_logical",
      "per_dominant",
      "magic_light",
      "magic_light_master",
      "magic_wind",
      "magic_wind_master",
    ],
    disaster_traits: ["bg_slave", "per_kind", "per_empath", "per_submissive"],
    restrictions: [qres.Job("slaver")],

    skill_multis: {
      slaving: 2.0,
      brawn: 1.0,
    },
  },

  training_trainer_dick_normal: {
    name: "Slave Trainer (Dick)",
    crit_traits: [
      "bg_slaver",
      "dick_medium",
      "dick_large",
      "dick_huge",
      "per_lustful",
      "per_sexaddict",
      "per_dominant",
      "magic_wind",
      "magic_wind_master",
      "magic_earth",
      "magic_earth_master",
    ],
    disaster_traits: [
      "bg_slave",
      "dick_tiny",
      "dick_small",
      "dick_titanic",
      "per_chaste",
      "per_submissive",
    ],
    restrictions: [qres.Job("slaver"), qres.NoTrait("eq_chastity")],

    skill_multis: {
      slaving: 2.0,
      sex: 1.0,
    },
  },

  training_trainer_dick_master: {
    name: "Slave Trainer+ (Dick)",
    crit_traits: [
      "bg_slaver",
      "dick_medium",
      "dick_large",
      "dick_huge",
      "dick_titanic",
      "balls_large",
      "balls_huge",
      "balls_titanic",
      "per_lustful",
      "per_sexaddict",
      "per_dominant",
      "magic_wind",
      "magic_wind_master",
      "magic_earth",
      "magic_earth_master",
    ],
    disaster_traits: [
      "bg_slave",
      "dick_tiny",
      "dick_small",
      "balls_tiny",
      "balls_small",
      "per_chaste",
      "per_submissive",
    ],
    restrictions: [qres.Job("slaver"), qres.NoTrait("eq_chastity")],

    skill_multis: {
      slaving: 2.0,
      sex: 1.0,
    },
  },

  training_trainer_sex: {
    name: "Slave Trainer (Sex)",
    crit_traits: [
      "bg_slaver",
      "per_lustful",
      "per_sexaddict",
      "per_dominant",
      "magic_wind",
      "magic_wind_master",
    ],
    disaster_traits: ["bg_slave", "per_chaste", "per_submissive"],
    restrictions: [qres.Job("slaver")],

    skill_multis: {
      slaving: 2.0,
      sex: 1.0,
    },
  },

  training_trainer_masochist: {
    name: "Slave Trainer (Masochist)",
    crit_traits: [
      "bg_slaver",
      "per_active",
      "per_cruel",
      "per_lustful",
      "per_sexaddict",
      "per_dominant",
      "magic_wind",
      "magic_wind_master",
    ],
    disaster_traits: [
      "bg_slave",
      "per_studious",
      "per_kind",
      "per_chaste",
      "per_submissive",
    ],
    restrictions: [qres.Job("slaver")],

    skill_multis: {
      slaving: 1.0,
      brawn: 1.0,
      sex: 1.0,
    },
  },

  training_trainer_mindbreak: {
    name: "Slave Trainer (Mindbreaker)",
    crit_traits: [
      "bg_slaver",
      "face_hideous",
      "per_aggressive",
      "per_stubborn",
      "per_cruel",
      "per_logical",
      "per_sexaddict",
      "per_dominant",
      "per_evil",
      "skill_intimidating",
      "magic_wind",
      "magic_wind_master",
      "magic_earth",
      "magic_earth_master",
      "magic_dark",
      "magic_dark_master",
    ],
    disaster_traits: [
      "bg_slave",
      "face_beautiful",
      "per_calm",
      "per_curious",
      "per_kind",
      "per_empath",
      "per_chaste",
      "per_submissive",
      "per_honorable",
    ],
    restrictions: [qres.Job("slaver")],

    skill_multis: {
      slaving: 3.0,
    },
  },

  training_slave: {
    name: "Slave",
    crit_traits: ["per_submissive", "training_obedience_master"],
    disaster_traits: [
      "per_aggressive",
      "per_proud",
      "per_stubborn",
      "per_dominant",
    ],
    restrictions: [qres.Job("slave"), qres.Trait("training_obedience_basic")],

    skill_multis: {},
  },

  trainee: {
    name: "Trainee",
    crit_traits: [
      "per_calm",
      "per_humble",
      "per_attentive",
      "per_studious",
      "per_active",
      "per_submissive",
    ],
    disaster_traits: [
      "per_aggressive",
      "per_proud",
      "per_dreamy",
      "per_stubborn",
      "per_lunatic",
    ],
    restrictions: [qres.Job("slaver")],

    skill_multis: {
      brawn: 1.0,
      knowledge: 1.0,
      sex: 1.0,
    },
  },

  training_head_master_wind: {
    name: "Head Slave Trainer (Master Wind)",
    crit_traits: [
      "bg_slaver",
      "face_scary",
      "face_hideous",
      "per_cruel",
      "per_dominant",
      "skill_intimidating",
      "magic_earth",
      "magic_earth_master",
    ],
    disaster_traits: [
      "bg_slave",
      "face_attractive",
      "face_beautiful",
      "per_kind",
      "per_submissive",
    ],
    restrictions: [qres.Job("slaver"), qres.Trait("magic_wind_master")],

    skill_multis: {
      slaving: 1.5,
      knowledge: 1.0,
      social: 0.5,
    },
  },

  training_head_master_earth: {
    name: "Head Slave Trainer (Master Earth)",
    crit_traits: [
      "bg_slaver",
      "face_scary",
      "face_hideous",
      "per_cruel",
      "per_dominant",
      "skill_intimidating",
      "magic_wind",
      "magic_wind_master",
    ],
    disaster_traits: [
      "bg_slave",
      "face_attractive",
      "face_beautiful",
      "per_kind",
      "per_submissive",
    ],
    restrictions: [qres.Job("slaver"), qres.Trait("magic_earth_master")],

    skill_multis: {
      slaving: 1.5,
      knowledge: 1.0,
      social: 0.5,
    },
  },
});
