import type { UnitActionDefinition } from "../../classes/unitaction/UnitAction";

export default definitions<UnitActionDefinition>()({
  fleshshape_breast_grow: {
    tags: ["fleshshape"],
    quest_template: "fleshshape_breast_grow",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("breastlab"),
      setup.qres.Job("slave"),
      setup.qres.AnyTrait(["training_mindbreak", "training_obedience_basic"]),
      setup.qres.NoTrait("breast_large"),
      setup.qres.Trait("breast_tiny"),
    ],
    is_multitrain: true,
    result_traits: ["breast_large"],
    prerequisite_traits: ["training_obedience_basic"],
  },

  fleshshape_breast_shrink: {
    tags: ["fleshshape"],
    quest_template: "fleshshape_breast_shrink",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("breastlab"),
      setup.qres.Job("slave"),
      setup.qres.AnyTrait(["training_mindbreak", "training_obedience_basic"]),
      setup.qres.Trait("breast_small"),
    ],
    is_multitrain: true,
    is_decrease: true,
    result_traits: ["breast_tiny"],
    prerequisite_traits: ["training_obedience_basic"],
  },

  fleshshape_dick_grow: {
    tags: ["fleshshape"],
    quest_template: "fleshshape_dick_grow",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("dicklab"),
      setup.qres.Job("slave"),
      setup.qres.AnyTrait(["training_mindbreak", "training_obedience_basic"]),
      setup.qres.Trait("dick_tiny"),
      setup.qres.NoTrait("dick_large"),
    ],
    is_multitrain: true,
    result_traits: ["dick_large"],
    prerequisite_traits: ["training_obedience_basic"],
  },

  fleshshape_dick_shrink: {
    tags: ["fleshshape"],
    quest_template: "fleshshape_dick_shrink",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("dicklab"),
      setup.qres.Job("slave"),
      setup.qres.AnyTrait(["training_mindbreak", "training_obedience_basic"]),
      setup.qres.Trait("dick_medium"),
    ],
    is_multitrain: true,
    is_decrease: true,
    result_traits: ["dick_small"],
    prerequisite_traits: ["training_obedience_basic"],
  },

  fleshshape_balls_grow: {
    tags: ["fleshshape"],
    quest_template: "fleshshape_balls_grow",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("ballslab"),
      setup.qres.Job("slave"),
      setup.qres.AnyTrait(["training_mindbreak", "training_obedience_basic"]),
      setup.qres.Trait("balls_tiny"),
      setup.qres.NoTrait("balls_large"),
    ],
    is_multitrain: true,
    result_traits: ["balls_large"],
    prerequisite_traits: ["training_obedience_basic"],
  },

  fleshshape_balls_shrink: {
    tags: ["fleshshape"],
    quest_template: "fleshshape_balls_shrink",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("ballslab"),
      setup.qres.Job("slave"),
      setup.qres.AnyTrait(["training_mindbreak", "training_obedience_basic"]),
      setup.qres.Trait("balls_medium"),
    ],
    is_multitrain: true,
    is_decrease: true,
    result_traits: ["balls_small"],
    prerequisite_traits: ["training_obedience_basic"],
  },

  fleshshape_muscle_grow: {
    tags: ["fleshshape"],
    quest_template: "fleshshape_muscle_grow",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("biolab"),
      setup.qres.Job("slave"),
      setup.qres.AnyTrait(["training_mindbreak", "training_obedience_basic"]),
      setup.qres.NoTrait("muscle_strong"),
    ],
    is_multitrain: true,
    result_traits: ["muscle_strong"],
    prerequisite_traits: ["training_obedience_basic"],
  },

  fleshshape_muscle_shrink: {
    tags: ["fleshshape"],
    quest_template: "fleshshape_muscle_shrink",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("biolab"),
      setup.qres.Job("slave"),
      setup.qres.AnyTrait(["training_mindbreak", "training_obedience_basic"]),
      setup.qres.Trait(null, "muscle"),
    ],
    is_multitrain: true,
    is_decrease: true,
    result_traits: ["muscle_thin"],
    prerequisite_traits: ["training_obedience_basic"],
  },

  fleshshape_anus_tighten: {
    tags: ["fleshshape"],
    quest_template: "fleshshape_anus_tighten",
    prerequisites: [],
    unit_requirements: [
      setup.qres.HasItem("potion_tight"),
      setup.qres.Building("anuslab"),
      setup.qres.Job("slave"),
      setup.qres.AnyTrait(["training_mindbreak", "training_obedience_basic"]),
      setup.qres.Trait("anus_loose"),
    ],
    is_multitrain: true,
    is_decrease: true,
    result_traits: ["anus_tight"],
    prerequisite_traits: ["training_obedience_basic"],
  },

  fleshshape_anus_loosen: {
    tags: ["fleshshape"],
    quest_template: "fleshshape_anus_loosen",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("anuslab"),
      setup.qres.Job("slave"),
      setup.qres.AnyTrait(["training_mindbreak", "training_obedience_basic"]),
      setup.qres.NoTrait("anus_gape"),
    ],
    is_multitrain: true,
    result_traits: ["anus_gape"],
    prerequisite_traits: ["training_obedience_basic"],
  },

  fleshshape_vagina_tighten: {
    tags: ["fleshshape"],
    quest_template: "fleshshape_vagina_tighten",
    prerequisites: [],
    unit_requirements: [
      setup.qres.HasItem("potion_tight"),
      setup.qres.Building("vaginalab"),
      setup.qres.Job("slave"),
      setup.qres.AnyTrait(["training_mindbreak", "training_obedience_basic"]),
      setup.qres.Trait("vagina_loose"),
    ],
    is_multitrain: true,
    is_decrease: true,
    result_traits: ["vagina_tight"],
    prerequisite_traits: ["training_obedience_basic"],
  },

  fleshshape_vagina_loosen: {
    tags: ["fleshshape"],
    quest_template: "fleshshape_vagina_loosen",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("vaginalab"),
      setup.qres.Job("slave"),
      setup.qres.AnyTrait(["training_mindbreak", "training_obedience_basic"]),
      setup.qres.NoTrait("vagina_gape"),
      setup.qres.Trait("vagina_tight"),
    ],
    is_multitrain: true,
    result_traits: ["vagina_loose"],
    prerequisite_traits: ["training_obedience_basic"],
  },
});
