import { qres } from "../../_init/preinit_costrestrictions";
import type { UnitCriteriaDefinition } from "../../classes/criteria/UnitCriteria";

export default definitions<UnitCriteriaDefinition>()({
  negotiator: {
    name: "Negotiator",
    crit_traits: [
      /* critical traits */ "bg_merchant",
      "per_calm",
      "per_sly",
      "per_gregarious",
      "per_attentive",
      "per_logical",
    ],
    disaster_traits: [
      "face_hideous",
      "per_aggressive",
      "per_direct",
      "per_loner",
      "per_dreamy",
      "per_empath",
      "skill_intimidating",
    ],
    restrictions: [qres.Job("slaver")] /* requirement */,

    skill_multis: {
      /* skill effects, sums to 3.0 */ social: 3.0,
    },
  },

  trader: {
    name: "Trader",
    crit_traits: [
      /* critical traits */ "bg_merchant",
      "per_smart",
      "per_sly",
      "per_frugal",
      "per_logical",
    ],
    disaster_traits: [
      /* disaster traits */ "face_hideous",
      "per_direct",
      "per_lavish",
      "per_empath",
      "per_submissive",
      "skill_intimidating",
    ],
    restrictions: [qres.Job("slaver")] /* requirement */,

    skill_multis: {
      /* skill effects, sums to 3.0 */ social: 2.0,
      knowledge: 1.0,
    },
  },

  recruiter: {
    name: "Recruiter",
    crit_traits: [
      /* critical traits */ "muscle_verystrong",
      "muscle_extremelystrong",
      "face_attractive",
      "face_beautiful",
      "per_gregarious",
      "per_curious",
      "per_kind",
      "per_dominant",
      "skill_intimidating",
    ],
    disaster_traits: [
      /* disaster traits */ "muscle_verythin",
      "muscle_extremelythin",
      "face_scary",
      "face_hideous",
      "corrupted",
      "corruptedfull",
      "per_loner",
      "per_stubborn",
      "per_cruel",
      "per_submissive",
    ],
    restrictions: [qres.Job("slaver")] /* requirement */,

    skill_multis: {
      /* skill effects, sums to 3.0 */ social: 3.0,
    },
  },

  convincer: {
    name: "Convincer",
    crit_traits: [
      /* critical traits */ "face_attractive",
      "face_beautiful",
      "per_gregarious",
      "per_attentive",
      "per_stubborn",
      "skill_intimidating",
      "skill_hypnotic",
    ],
    disaster_traits: [
      /* disaster traits */ "face_scary",
      "face_hideous",
      "corrupted",
      "corruptedfull",
      "per_aggressive",
      "per_loner",
      "per_dreamy",
      "per_curious",
    ],
    restrictions: [qres.Job("slaver")] /* requirement */,

    skill_multis: {
      /* skill effects, sums to 3.0 */ social: 3.0,
    },
  },

  informer: {
    name: "Informer",
    crit_traits: [
      /* critical traits */ "bg_informer",
      "face_attractive",
      "face_beautiful",
      "per_sly",
      "per_gregarious",
      "per_attentive",
      "per_logical",
      "skill_connected",
    ],
    disaster_traits: [
      /* disaster traits */ "face_scary",
      "face_hideous",
      "corrupted",
      "corruptedfull",
      "per_direct",
      "per_loner",
      "per_dreamy",
      "per_empath",
    ],
    restrictions: [qres.Job("slaver")] /* requirement */,

    skill_multis: {
      /* skill effects, sums to 3.0 */ social: 2.0,
      intrigue: 1.0,
    },
  },

  veteran_informer: {
    name: "Veteran Informer",
    crit_traits: [
      /* critical traits */ "bg_informer",
      "face_beautiful",
      "per_sly",
      "per_gregarious",
      "per_attentive",
      "per_logical",
    ],
    disaster_traits: [
      /* disaster traits */ "face_scary",
      "face_hideous",
      "corrupted",
      "corruptedfull",
      "per_direct",
      "per_loner",
      "per_dreamy",
      "per_empath",
    ],
    restrictions: [
      qres.Job("slaver"),
      qres.Trait("skill_connected"),
    ] /* requirement */,

    skill_multis: {
      /* skill effects, sums to 3.0 */ social: 2.0,
      intrigue: 1.0,
    },
  },

  salesman: {
    name: "Salesman",
    crit_traits: [
      /* critical traits */ "bg_merchant",
      "face_attractive",
      "face_beautiful",
      "per_frugal",
      "per_stubborn",
      "per_logical",
    ],
    disaster_traits: [
      /* disaster traits */ "face_scary",
      "face_hideous",
      "corrupted",
      "corruptedfull",
      "per_lavish",
      "per_curious",
      "per_empath",
      "per_lunatic",
      "skill_intimidating",
    ],
    restrictions: [qres.Job("slaver")] /* requirement */,

    skill_multis: {
      /* skill effects, sums to 3.0 */ social: 3.0,
    },
  },

  attentionseeker: {
    name: "Attention Seeker",
    crit_traits: [
      /* critical traits */ "bg_artist",
      "bg_entertainer",
      "muscle_thin",
      "muscle_verythin",
      "muscle_extremelythin",
      "muscle_strong",
      "muscle_verystrong",
      "muscle_extremelystrong",
      "face_attractive",
      "face_beautiful",
      "per_aggressive",
      "per_proud",
      "per_gregarious",
      "per_active",
      "per_lunatic",
      "per_dominant",
      "skill_connected",
      "skill_entertain",
      "eq_veryvaluable",
    ],
    disaster_traits: [
      /* disaster traits */ "face_scary",
      "face_hideous",
      "corrupted",
      "corruptedfull",
      "per_calm",
      "per_humble",
      "per_loner",
      "per_studious",
      "per_submissive",
      "per_masochistic",
      "skill_intimidating",
    ],
    restrictions: [qres.Job("slaver")] /* requirement */,

    skill_multis: {
      /* skill effects, sums to 3.0 */ social: 1.0,
      sex: 1.0,
      brawn: 1.0,
    },
  },

  performer: {
    name: "Performer",
    crit_traits: [
      /* critical traits */ "bg_artist",
      "bg_entertainer",
      "muscle_thin",
      "muscle_verythin",
      "muscle_extremelythin",
      "muscle_strong",
      "muscle_verystrong",
      "muscle_extremelystrong",
      "face_attractive",
      "face_beautiful",
      "per_active",
      "per_dreamy",
      "per_playful",
      "skill_entertain",
      "eq_veryvaluable",
    ],
    disaster_traits: [
      /* disaster traits */ "face_scary",
      "face_hideous",
      "corrupted",
      "corruptedfull",
      "per_studious",
      "per_attentive",
      "per_serious",
      "skill_intimidating",
    ],
    restrictions: [qres.Job("slaver")] /* requirement */,

    skill_multis: {
      /* skill effects, sums to 3.0 */ social: 1.5,
      brawn: 1.5,
    },
  },

  briber: {
    name: "Briber",
    crit_traits: [
      /* critical traits */ "bg_informer",
      "face_attractive",
      "face_beautiful",
      "per_sly",
      "per_frugal",
      "per_evil",
      "skill_intimidating",
      "skill_hypnotic",
    ],
    disaster_traits: [
      /* disaster traits */ "face_scary",
      "face_hideous",
      "corrupted",
      "corruptedfull",
      "per_direct",
      "per_lavish",
      "per_honorable",
    ],
    restrictions: [qres.Job("slaver")] /* requirement */,

    skill_multis: {
      /* skill effects, sums to 3.0 */ social: 2.0,
      intrigue: 1.0,
    },
  },

  abyssal_negotiator: {
    name: "Abyssal Negotiator",
    crit_traits: [
      "bg_mist",
      "per_calm",
      "per_stubborn",
      "per_cruel",
      "per_logical",
      "per_lunatic",
      "per_evil",
      "magic_dark",
      "magic_dark_master",
    ],
    disaster_traits: [
      "per_direct",
      "per_lavish",
      "per_curious",
      "per_kind",
      "per_lustful",
      "per_submissive",
      "per_honorable",
      "magic_light",
      "magic_light_master",
    ],
    restrictions: [qres.Job("slaver")],
    skill_multis: {
      social: 1,
      arcane: 1,
      sex: 1,
    },
  },
});
