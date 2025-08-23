import { qres } from "../../_init/preinit_costrestrictions";
import type { UnitCriteriaDefinition } from "../../classes/criteria/UnitCriteria";

export default definitions<UnitCriteriaDefinition>()({
  arcanefire: {
    name: "Arcane (Fire)",
    crit_traits: [
      /* critical traits */ "tough_tough",
      "per_aggressive",
      "per_proud",
      "per_serious",
      "skill_ambidextrous",
      "magic_fire",
      "magic_fire_master",
    ],
    disaster_traits: [
      /* disaster traits */ "tough_nimble",
      "per_calm",
      "per_humble",
      "per_playful",
      "skill_creative",
      "magic_water",
      "magic_water_master",
    ],
    restrictions: [qres.Job("slaver")] /* requirement */,

    skill_multis: {
      /* skill effects, sums to 3.0 */ arcane: 2.0,
      combat: 1.0,
    },
  },

  arcanewater: {
    name: "Arcane (Water)",
    crit_traits: [
      /* critical traits */ "tough_nimble",
      "per_calm",
      "per_humble",
      "per_playful",
      "skill_creative",
      "magic_water",
      "magic_water_master",
    ],
    disaster_traits: [
      /* disaster traits */ "tough_tough",
      "per_aggressive",
      "per_proud",
      "per_serious",
      "skill_ambidextrous",
      "magic_fire",
      "magic_fire_master",
    ],
    restrictions: [qres.Job("slaver")] /* requirement */,

    skill_multis: {
      /* skill effects, sums to 3.0 */ arcane: 2.0,
      knowledge: 1.0,
    },
  },

  arcanewind: {
    name: "Arcane (Wind)",
    crit_traits: [
      /* critical traits */ "per_gregarious",
      "per_frugal",
      "per_playful",
      "per_empath",
      "skill_connected",
      "magic_wind",
      "magic_wind_master",
    ],
    disaster_traits: [
      /* disaster traits */ "per_loner",
      "per_lavish",
      "per_serious",
      "per_logical",
      "skill_alchemy",
      "magic_earth",
      "magic_earth_master",
    ],
    restrictions: [qres.Job("slaver")] /* requirement */,

    skill_multis: {
      /* skill effects, sums to 3.0 */ arcane: 2.0,
      social: 1.0,
    },
  },

  arcaneearth: {
    name: "Arcane (Earth)",
    crit_traits: [
      /* critical traits */ "per_loner",
      "per_lavish",
      "per_serious",
      "per_logical",
      "skill_alchemy",
      "magic_earth",
      "magic_earth_master",
    ],
    disaster_traits: [
      /* disaster traits */ "per_gregarious",
      "per_frugal",
      "per_playful",
      "per_empath",
      "skill_connected",
      "magic_wind",
      "magic_wind_master",
    ],
    restrictions: [qres.Job("slaver")] /* requirement */,

    skill_multis: {
      /* skill effects, sums to 3.0 */ arcane: 2.0,
      survival: 1.0,
    },
  },

  arcanelight: {
    name: "Arcane (Light)",
    crit_traits: [
      /* critical traits */ "per_loyal",
      "per_kind",
      "per_chaste",
      "per_honorable",
      "skill_alchemy",
      "magic_light",
      "magic_light_master",
    ],
    disaster_traits: [
      /* disaster traits */ "per_independent",
      "per_cruel",
      "per_lustful",
      "per_sexaddict",
      "per_evil",
      "skill_intimidating",
      "magic_dark",
      "magic_dark_master",
    ],
    restrictions: [qres.Job("slaver")] /* requirement */,

    skill_multis: {
      /* skill effects, sums to 3.0 */ arcane: 2.0,
      aid: 1.0,
    },
  },

  arcanedark: {
    name: "Arcane (Dark)",
    crit_traits: [
      /* critical traits */ "bg_mist",
      "per_independent",
      "per_cruel",
      "per_lustful",
      "per_sexaddict",
      "per_evil",
      "skill_intimidating",
      "magic_dark",
      "magic_dark_master",
    ],
    disaster_traits: [
      /* disaster traits */ "per_loyal",
      "per_kind",
      "per_chaste",
      "per_honorable",
      "skill_alchemy",
      "magic_light",
      "magic_light_master",
    ],
    restrictions: [qres.Job("slaver")] /* requirement */,

    skill_multis: {
      /* skill effects, sums to 3.0 */ arcane: 2.0,
      sex: 1.0,
    },
  },

  arcanefireveteran: {
    name: "Arcane Veteran (Fire)",
    crit_traits: [
      /* critical traits */ "tough_tough",
      "per_aggressive",
      "per_proud",
      "per_serious",
      "skill_ambidextrous",
      "magic_fire_master",
    ],
    disaster_traits: [
      /* disaster traits */ "tough_nimble",
      "per_calm",
      "per_humble",
      "per_playful",
      "skill_creative",
      "magic_water",
      "magic_water_master",
    ],
    restrictions: [
      qres.Job("slaver"),
      qres.Trait("magic_fire"),
    ] /* requirement */,

    skill_multis: {
      /* skill effects, sums to 3.0 */ arcane: 2.0,
      combat: 1.0,
    },
  },

  arcanewaterveteran: {
    name: "Arcane Veteran (Water)",
    crit_traits: [
      /* critical traits */ "tough_nimble",
      "per_calm",
      "per_humble",
      "per_playful",
      "skill_creative",
      "magic_water_master",
    ],
    disaster_traits: [
      /* disaster traits */ "tough_tough",
      "per_aggressive",
      "per_proud",
      "per_serious",
      "skill_ambidextrous",
      "magic_fire",
      "magic_fire_master",
    ],
    restrictions: [
      qres.Job("slaver"),
      qres.Trait("magic_water"),
    ] /* requirement */,

    skill_multis: {
      /* skill effects, sums to 3.0 */ arcane: 2.0,
      knowledge: 1.0,
    },
  },

  arcanewindveteran: {
    name: "Arcane Veteran (Wind)",
    crit_traits: [
      /* critical traits */ "per_gregarious",
      "per_frugal",
      "per_playful",
      "per_empath",
      "skill_connected",
      "magic_wind",
      "magic_wind_master",
    ],
    disaster_traits: [
      /* disaster traits */ "per_loner",
      "per_lavish",
      "per_serious",
      "per_logical",
      "skill_alchemy",
      "magic_earth",
      "magic_earth_master",
    ],
    restrictions: [
      /* requirement */ qres.Job("slaver"),
      qres.Trait("magic_wind"),
    ],

    skill_multis: {
      /* skill effects, sums to 3.0 */ arcane: 2.0,
      social: 1.0,
    },
  },

  arcaneearthveteran: {
    name: "Arcane Veteran (Earth)",
    crit_traits: [
      /* critical traits */ "per_loner",
      "per_lavish",
      "per_serious",
      "per_logical",
      "skill_alchemy",
      "magic_earth_master",
    ],
    disaster_traits: [
      /* disaster traits */ "per_gregarious",
      "per_frugal",
      "per_playful",
      "per_empath",
      "skill_connected",
      "magic_wind",
      "magic_wind_master",
    ],
    restrictions: [
      /* requirement */ qres.Job("slaver"),
      qres.Trait("magic_earth"),
    ],

    skill_multis: {
      /* skill effects, sums to 3.0 */ arcane: 2.0,
      survival: 1.0,
    },
  },

  arcanelightveteran: {
    name: "Arcane Veteran (Light)",
    crit_traits: [
      /* critical traits */ "per_loyal",
      "per_kind",
      "per_chaste",
      "per_honorable",
      "skill_alchemy",
      "magic_light_master",
    ],
    disaster_traits: [
      /* disaster traits */ "per_independent",
      "per_cruel",
      "per_lustful",
      "per_sexaddict",
      "per_evil",
      "skill_intimidating",
      "magic_dark",
      "magic_dark_master",
    ],
    restrictions: [
      /* requirement */ qres.Job("slaver"),
      qres.Trait("magic_light"),
    ],

    skill_multis: {
      /* skill effects, sums to 3.0 */ arcane: 2.0,
      aid: 1.0,
    },
  },

  arcanedarkveteran: {
    name: "Arcane Veteran (Dark)",
    crit_traits: [
      /* critical traits */ "bg_mist",
      "per_independent",
      "per_cruel",
      "per_lustful",
      "per_sexaddict",
      "per_evil",
      "skill_intimidating",
      "magic_dark_master",
    ],
    disaster_traits: [
      /* disaster traits */ "per_loyal",
      "per_kind",
      "per_chaste",
      "per_honorable",
      "skill_alchemy",
      "magic_light_master",
    ],
    restrictions: [
      /* requirement */ qres.Job("slaver"),
      qres.Trait("magic_dark"),
    ],

    skill_multis: {
      /* skill effects, sums to 3.0 */ arcane: 2.0,
      sex: 1.0,
    },
  },
});
