import { qres } from "../../_init/preinit_costrestrictions";
import type { UnitCriteriaDefinition } from "../../classes/criteria/UnitCriteria";

export default definitions<UnitCriteriaDefinition>()({
  planner: {
    name: "Planner",
    crit_traits: [
      /* critical traits */ "bg_scholar",
      "per_smart",
      "per_cautious",
      "per_calm",
      "per_studious",
      "per_attentive",
      "skill_creative",
    ],
    disaster_traits: [
      /* disaster traits */ "per_slow",
      "per_brave",
      "per_aggressive",
      "per_active",
      "per_dreamy",
    ],
    restrictions: [qres.Job("slaver")] /* requirement */,

    skill_multis: {
      /* skill effects, sums to 3.0 */ knowledge: 3.0,
    },
  },

  biologist: {
    name: "Biologist",
    crit_traits: [
      "bg_scholar",
      "per_smart",
      "per_cautious",
      "per_logical",
      "skill_alchemy",
      "skill_animal",
      "magic_earth",
      "magic_earth_master",
    ],
    disaster_traits: [
      "per_slow",
      "per_brave",
      "per_empath",
      "skill_intimidating",
      "magic_fire",
      "magic_fire_master",
    ],
    restrictions: [qres.Job("slaver")] /* requirement */,

    skill_multis: {
      /* skill effects, sums to 3.0 */ knowledge: 2.0,
      survival: 1.0,
    },
  },

  bidder: {
    name: "Bidder",
    crit_traits: [
      "bg_informer",
      "per_cautious",
      "per_calm",
      "per_sly",
      "per_frugal",
      "per_attentive",
      "eq_veryvaluable",
    ],
    disaster_traits: [
      "bg_slave",
      "per_brave",
      "per_aggressive",
      "per_direct",
      "per_lavish",
      "per_dreamy",
    ],
    restrictions: [qres.Job("slaver")] /* requirement */,

    skill_multis: {
      /* skill effects, sums to 3.0 */ knowledge: 3.0,
    },
  },

  explorer: {
    name: "Explorer",
    crit_traits: [
      /* critical traits */ "bg_adventurer",
      "per_brave",
      "per_studious",
      "per_curious",
      "skill_animal",
    ],
    disaster_traits: [
      /* disaster traits */ "per_cautious",
      "per_active",
      "per_stubborn",
    ],
    restrictions: [qres.Job("slaver")] /* requirement */,

    skill_multis: {
      /* skill effects, sums to 3.0 */ knowledge: 2.0,
      survival: 1.0,
    },
  },

  alchemist: {
    name: "Alchemist",
    crit_traits: [
      "bg_scholar",
      "per_studious",
      "per_curious",
      "skill_alchemy",
      "magic_earth",
      "magic_earth_master",
    ],
    disaster_traits: [
      "per_slow",
      "per_stubborn",
      "per_active",
      "magic_wind",
      "magic_wind_master",
    ],
    restrictions: [/* requirement */ qres.Job("slaver")],

    skill_multis: {
      /* skill effects, sums to 3.0 */ knowledge: 2.0,
      arcane: 1.0,
    },
  },

  navigator: {
    name: "Navigator",
    crit_traits: [
      "bg_seaman",
      "per_smart",
      "per_cautious",
      "per_attentive",
      "skill_flight",
      "magic_water",
      "magic_water_master",
    ],
    disaster_traits: [
      "subrace_humandesert",
      "race_greenskin",
      "per_slow",
      "per_brave",
      "per_dreamy",
      "per_lunatic",
      "magic_fire",
      "magic_fire_master",
    ],
    restrictions: [/* requirement */ qres.Job("slaver")],

    skill_multis: {
      /* skill effects, sums to 3.0 */ knowledge: 2.0,
      survival: 1.0,
    },
  },

  alchemist_veteran: {
    name: "Veteran Alchemist",
    crit_traits: [
      "bg_scholar",
      "per_smart",
      "per_studious",
      "per_curious",
      "magic_earth",
      "magic_earth_master",
    ],
    disaster_traits: [
      "per_slow",
      "per_active",
      "per_stubborn",
      "per_sexaddict",
      "magic_wind",
      "magic_wind_master",
    ],
    restrictions: [
      /* requirement */ qres.Job("slaver"),
      qres.Trait("skill_alchemy"),
    ],

    skill_multis: {
      /* skill effects, sums to 3.0 */ knowledge: 2.0,
      arcane: 1.0,
    },
  },

  hypnotist: {
    name: "Hypnotist",
    crit_traits: [
      "face_attractive",
      "face_beautiful",
      "per_gregarious",
      "per_empath",
      "per_dominant",
      "skill_hypnotic",
    ],
    disaster_traits: [
      "face_scary",
      "face_hideous",
      "per_loner",
      "per_logical",
      "per_sexaddict",
      "per_submissive",
    ],
    restrictions: [/* requirement */ qres.Job("slaver")],

    skill_multis: {
      /* skill effects, sums to 3.0 */ knowledge: 2.0,
      social: 1.0,
    },
  },

  hypnotist_veteran: {
    name: "Hypnotist Veteran",
    crit_traits: [
      "face_attractive",
      "face_beautiful",
      "per_gregarious",
      "per_empath",
      "per_dominant",
      "magic_wind",
      "magic_wind_master",
    ],
    disaster_traits: [
      "face_scary",
      "face_hideous",
      "per_loner",
      "per_logical",
      "per_sexaddict",
      "per_submissive",
      "magic_earth",
      "magic_earth_master",
    ],
    restrictions: [
      /* requirement */ qres.Job("slaver"),
      qres.Trait("skill_hypnotic"),
    ],

    skill_multis: {
      /* skill effects, sums to 3.0 */ knowledge: 2.0,
      social: 1.0,
    },
  },

  writer: {
    name: "Writer",
    crit_traits: [
      "bg_artist",
      "per_studious",
      "per_dreamy",
      "per_curious",
      "per_lustful",
      "per_sexaddict",
      "skill_entertain",
      "skill_creative",
    ],
    disaster_traits: [
      "per_active",
      "per_attentive",
      "per_stubborn",
      "per_lunatic",
    ],
    restrictions: [/* requirement */ qres.Job("slaver")],

    skill_multis: {
      /* skill effects, sums to 3.0 */ knowledge: 3.0,
    },
  },

  bureaucrat: {
    name: "Bureaucrat",
    crit_traits: [
      "bg_clerk",
      "per_studious",
      "per_cruel",
      "per_logical",
      "per_masochistic",
      "per_evil",
    ],
    disaster_traits: [
      "bg_artist",
      "per_active",
      "per_kind",
      "per_empath",
      "per_lunatic",
      "per_honorable",
      "skill_creative",
    ],
    restrictions: [/* requirement */ qres.Job("slaver")],

    skill_multis: {
      /* skill effects, sums to 3.0 */ knowledge: 2.0,
      intrigue: 1.0,
    },
  },

  appraiser: {
    name: "Appraiser",
    crit_traits: [
      "bg_merchant",
      "per_frugal",
      "per_attentive",
      "per_curious",
      "skill_connected",
    ],
    disaster_traits: [
      "muscle_verystrong",
      "muscle_extremelystrong",
      "per_lavish",
      "per_dreamy",
      "per_stubborn",
      "per_lunatic",
      "trauma_knowledge",
    ],
    restrictions: [/* requirement */ qres.Job("slaver")],

    skill_multis: {
      /* skill effects, sums to 3.0 */ knowledge: 3.0,
    },
  },

  scientist: {
    name: "Scientist",
    crit_traits: [
      "bg_scholar",
      "per_smart",
      "per_humble",
      "per_studious",
      "per_curious",
      "per_logical",
      "skill_creative",
      "magic_water",
      "magic_water_master",
    ],
    disaster_traits: [
      "bg_mythical",
      "bg_mystic",
      "bg_apprentice",
      "muscle_verystrong",
      "muscle_extremelystrong",
      "per_slow",
      "per_proud",
      "per_active",
      "per_stubborn",
      "per_empath",
      "skill_hypnotic",
      "magic_fire",
      "magic_fire_master",
    ],
    restrictions: [/* requirement */ qres.Job("slaver")],

    skill_multis: {
      /* skill effects, sums to 3.0 */ knowledge: 3.0,
    },
  },

  crafter: {
    name: "Crafter",
    crit_traits: [
      /* critical traits */ "bg_artisan",
      "per_cautious",
      "per_studious",
      "skill_creative",
      "magic_earth",
      "magic_earth_master",
    ],
    disaster_traits: [
      /* disaster traits */ "per_brave",
      "per_active",
      "per_lunatic",
    ],
    restrictions: [/* requirement */ qres.Job("slaver")],

    skill_multis: {
      /* skill effects, sums to 3.0 */ knowledge: 2.0,
      slaving: 1.0,
    },
  },

  ritualist: {
    name: "Ritualist",
    crit_traits: [
      /* critical traits */ "per_calm",
      "per_loner",
      "per_chaste",
      "magic_water_master",
      "magic_earth_master",
      "magic_wind_master",
      "magic_fire_master",
      "magic_dark_master",
      "magic_light_master",
    ],
    disaster_traits: [
      /* disaster traits */ "per_aggressive",
      "per_gregarious",
      "per_sexaddict",
      "per_lunatic",
    ],
    restrictions: [/* requirement */ qres.Job("slaver")],

    skill_multis: {
      /* skill effects, sums to 3.0 */ knowledge: 2.0,
      arcane: 1.0,
    },
  },

  scholar: {
    name: "Scholar",
    crit_traits: [
      /* critical traits */ "bg_scholar",
      "bg_wiseman",
      "per_direct",
      "per_studious",
      "per_curious",
      "join_senior",
    ],
    disaster_traits: [
      /* disaster traits */ "bg_raider",
      "per_sly",
      "per_active",
      "per_stubborn",
      "join_junior",
    ],
    restrictions: [/* requirement */ qres.Job("slaver")],

    skill_multis: {
      /* skill effects, sums to 3.0 */ knowledge: 3.0,
    },
  },

  farmer: {
    name: "Farmer",
    crit_traits: [
      /* critical traits */ "bg_farmer",
      "skill_animal",
      "per_calm",
      "per_cautious",
      "magic_earth",
      "magic_earth_master",
    ],
    disaster_traits: [
      /* disaster traits */ "per_aggressive",
      "per_brave",
      "magic_wind",
      "magic_wind_master",
    ],
    restrictions: [/* requirement */ qres.Job("slaver")],

    skill_multis: {
      /* skill effects, sums to 3.0 */ knowledge: 2.0,
      sex: 1.0,
    },
  },
});
