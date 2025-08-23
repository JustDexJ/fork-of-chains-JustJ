import { qres } from "../../_init/preinit_costrestrictions";
import type { UnitCriteriaDefinition } from "../../classes/criteria/UnitCriteria";

export default definitions<UnitCriteriaDefinition>()({
  slave: {
    name: "Slave",
    crit_traits: [],
    disaster_traits: [],
    restrictions: [qres.Job("slave")] /* requirement */,

    skill_multis: {
      /* skill effects, sums to 3.0 */
    },
  },

  offeringslave: {
    name: "Offering Slave",
    crit_traits: [],
    disaster_traits: [],
    restrictions: [/* requirement */ qres.IsCanBeSold(), qres.Job("slave")],

    skill_multis: {
      /* skill effects, sums to 3.0 */
    },
  },

  fuckholeslave: {
    name: "Fuckhole Slave",
    crit_traits: [
      /* critical traits */ "per_sexaddict",
      "per_submissive",
      "anus_loose",
      "training_endurance_basic",
      "training_endurance_advanced",
      "training_endurance_master",
      "training_vagina_basic",
      "training_vagina_advanced",
      "training_vagina_master",
      "training_anal_basic",
      "training_anal_advanced",
      "training_anal_master",
    ],
    disaster_traits: [
      "subrace_humanvale",
      "per_dominant",
      "training_mindbreak",
    ],
    restrictions: [qres.Job("slave")] /* requirement */,

    skill_multis: {
      /* skill effects, sums to 3.0 */
    },
  },

  slavepet: {
    name: "Pet",
    crit_traits: [
      /* critical traits */ "race_wolfkin",
      "race_catkin",
      "race_lizardkin",
      "vagina_gape",
      "anus_gape",
      "tough_nimble",
      "per_calm",
      "per_loyal",
      "per_curious",
      "per_playful",
      "per_submissive",
      "skill_animal",
      "training_pet_master",
      "eq_slutty",
      "eq_veryslutty",
      "eq_valuable",
      "eq_veryvaluable",
    ],
    disaster_traits: [
      "race_human",
      "per_aggressive",
      "per_independent",
      "per_stubborn",
      "per_serious",
      "per_dominant",
      "magic_wind",
      "magic_wind_master",
    ],
    restrictions: [
      qres.Job("slave"),
      qres.Trait("training_pet_basic"),
      qres.Trait("eq_pet"),
    ] /* requirement */,

    skill_multis: {
      /* skill effects, sums to 3.0 */
    },
  },

  slavegeneric: {
    name: "Slave (generic)",
    crit_traits: [
      /* critical traits */ "per_loyal",
      "per_lustful",
      "per_sexaddict",
      "per_submissive",
      "training_obedience_advanced",
      "training_obedience_master",
      "eq_valuable",
      "eq_veryvaluable",
    ],
    disaster_traits: [
      "per_loner",
      "per_stubborn",
      "per_chaste",
      "per_dominant",
      "magic_wind",
      "magic_wind_master",
    ],
    restrictions: [qres.Job("slave")] /* requirement */,

    skill_multis: {
      /* skill effects, sums to 3.0 */
    },
  },

  slavefurniture: {
    name: "Furniture",
    crit_traits: [
      /* critical traits */ "race_greenskin",
      "muscle_verystrong",
      "muscle_extremelystrong",
      "tough_tough",
      "per_stubborn",
      "per_masochistic",
      "magic_earth",
      "magic_earth_master",
      "training_endurance_master",
      "eq_restrained",
      "eq_valuable",
      "eq_veryvaluable",
    ],
    disaster_traits: [
      "race_elf",
      "muscle_verythin",
      "muscle_extremelythin",
      "per_aggressive",
      "per_gregarious",
      "per_sexaddict",
      "magic_wind",
      "magic_wind_master",
    ],
    restrictions: [
      qres.Job("slave"),
      qres.Trait("training_endurance_basic"),
    ] /* requirement */,

    skill_multis: {
      /* skill effects, sums to 3.0 */
    },
  },

  slavepony: {
    name: "Pony",
    crit_traits: [
      /* critical traits */ "race_lizardkin",
      "muscle_verystrong",
      "muscle_extremelystrong",
      "tough_tough",
      "per_active",
      "per_lustful",
      "per_sexaddict",
      "skill_animal",
      "magic_fire",
      "magic_fire_master",
      "training_pony_master",
      "eq_valuable",
      "eq_veryvaluable",
    ],
    disaster_traits: [
      "muscle_verythin",
      "muscle_extremelythin",
      "tough_nimble",
      "per_studious",
      "per_chaste",
      "magic_water",
      "magic_water_master",
    ],
    restrictions: [
      qres.Job("slave"),
      qres.Trait("training_pony_basic"),
      qres.Trait("eq_pony"),
    ] /* requirement */,

    skill_multis: {
      /* skill effects, sums to 3.0 */
    },
  },

  slavecow: {
    name: "Cum/Milk Slave",
    crit_traits: [
      /* critical traits */ "race_greenskin",
      "balls_large",
      "balls_huge",
      "balls_titanic",
      "breast_large",
      "breast_huge",
      "breast_titanic",
      "per_sexaddict",
      "skill_animal",
      "eq_restrained",
      "eq_plug_anus",
      "eq_plug_vagina",
      "eq_gagged",
      "training_mindbreak",
    ],
    disaster_traits: [
      "race_demon",
      "balls_tiny",
      "balls_small",
      "breast_tiny",
      "breast_small",
      "height_giant",
      "corrupted",
      "corruptedfull",
      "per_chaste",
      "eq_chastity",
    ],
    restrictions: [
      qres.Job("slave"),
      qres.AnyTrait(["dick_small", "breast_small"]),
    ] /* requirement */,

    skill_multis: {
      /* skill effects, sums to 3.0 */
    },
  },

  slaveoral: {
    name: "Oral Slave",
    crit_traits: [
      /* critical traits */ "face_attractive",
      "face_beautiful",
      "per_active",
      "per_lavish",
      "eq_gagged",
      "training_oral_advanced",
      "training_oral_master",
    ],
    disaster_traits: [
      "face_scary",
      "face_hideous",
      "per_studious",
      "per_frugal",
      "per_lunatic",
    ],
    restrictions: [
      qres.Job("slave"),
      qres.Trait("training_oral_basic"),
    ] /* requirement */,

    skill_multis: {
      /* skill effects, sums to 3.0 */
    },
  },

  slaveobedient: {
    name: "Slave (Obedient)",
    crit_traits: [
      /* critical traits */ "per_loyal",
      "per_lustful",
      "per_sexaddict",
      "per_submissive",
      "eq_valuable",
      "eq_veryvaluable",
    ],
    disaster_traits: [
      "corrupted",
      "corruptedfull",
      "per_loner",
      "per_stubborn",
      "per_chaste",
      "per_dominant",
    ],
    restrictions: [
      qres.Job("slave"),
      qres.Trait("training_obedience_basic"),
    ] /* requirement */,

    skill_multis: {
      /* skill effects, sums to 3.0 */
    },
  },
});
