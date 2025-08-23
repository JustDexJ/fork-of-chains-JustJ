import type { UnitActionDefinition } from "../../classes/unitaction/UnitAction";

export default definitions<UnitActionDefinition>()({
  surgery_breast_grow: {
    tags: ["fleshshape"],
    quest_template: "surgery_breast_grow",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("surgerybreast"),
      setup.qres.Job("slaver"),
      setup.qres.NoTrait("breast_large"),
      setup.qres.Trait("breast_tiny"),
    ],
    is_multitrain: true,
    result_traits: ["breast_large"],
    prerequisite_traits: [],
  },

  surgery_breast_shrink: {
    tags: ["fleshshape"],
    quest_template: "surgery_breast_shrink",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("surgerybreast"),
      setup.qres.Job("slaver"),
      setup.qres.Trait("breast_small"),
    ],
    is_multitrain: true,
    result_traits: ["breast_tiny"],
    prerequisite_traits: [],
  },

  surgery_dick_grow: {
    tags: ["fleshshape"],
    quest_template: "surgery_dick_grow",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("surgerydick"),
      setup.qres.Job("slaver"),
      setup.qres.Trait("dick_tiny"),
      setup.qres.NoTrait("dick_large"),
    ],
    is_multitrain: true,
    result_traits: ["dick_large"],
    prerequisite_traits: [],
  },

  surgery_dick_shrink: {
    tags: ["fleshshape"],
    quest_template: "surgery_dick_shrink",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("surgerydick"),
      setup.qres.Job("slaver"),
      setup.qres.Trait("dick_medium"),
    ],
    is_multitrain: true,
    result_traits: ["dick_small"],
    prerequisite_traits: [],
  },

  surgery_balls_grow: {
    tags: ["fleshshape"],
    quest_template: "surgery_balls_grow",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("surgeryballs"),
      setup.qres.Job("slaver"),
      setup.qres.Trait("balls_tiny"),
      setup.qres.NoTrait("balls_large"),
    ],
    is_multitrain: true,
    result_traits: ["balls_large"],
    prerequisite_traits: [],
  },

  surgery_balls_shrink: {
    tags: ["fleshshape"],
    quest_template: "surgery_balls_shrink",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("surgeryballs"),
      setup.qres.Job("slaver"),
      setup.qres.Trait("balls_medium"),
    ],
    is_multitrain: true,
    result_traits: ["balls_small"],
    prerequisite_traits: [],
  },

  surgery_muscle_grow: {
    tags: ["fleshshape"],
    quest_template: "surgery_muscle_grow",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("surgery"),
      setup.qres.Job("slaver"),
      setup.qres.NoTrait("muscle_strong"),
    ],
    is_multitrain: true,
    result_traits: ["muscle_strong"],
    prerequisite_traits: [],
  },

  surgery_muscle_shrink: {
    tags: ["fleshshape"],
    quest_template: "surgery_muscle_shrink",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("surgery"),
      setup.qres.Job("slaver"),
      setup.qres.Trait(null, "muscle"),
    ],
    is_multitrain: true,
    result_traits: ["muscle_thin"],
    prerequisite_traits: [],
  },

  surgery_anus_tighten: {
    tags: ["fleshshape"],
    quest_template: "surgery_anus_tighten",
    prerequisites: [],
    unit_requirements: [
      setup.qres.HasItem("potion_tight"),
      setup.qres.Building("surgeryanus"),
      setup.qres.Job("slaver"),
      setup.qres.Trait("anus_loose"),
    ],
    is_decrease: true,
    is_multitrain: true,
    result_traits: ["anus_tight"],
    prerequisite_traits: [],
  },

  surgery_anus_loosen: {
    tags: ["fleshshape"],
    quest_template: "surgery_anus_loosen",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("surgeryanus"),
      setup.qres.Job("slaver"),
      setup.qres.NoTrait("anus_gape"),
    ],
    is_multitrain: true,
    result_traits: ["anus_gape"],
    prerequisite_traits: [],
  },

  surgery_vagina_tighten: {
    tags: ["fleshshape"],
    quest_template: "surgery_vagina_tighten",
    prerequisites: [],
    unit_requirements: [
      setup.qres.HasItem("potion_tight"),
      setup.qres.Building("surgeryvagina"),
      setup.qres.Job("slaver"),
      setup.qres.Trait("vagina_loose"),
    ],
    is_decrease: true,
    is_multitrain: true,
    result_traits: ["vagina_tight"],
    prerequisite_traits: [],
  },

  surgery_vagina_loosen: {
    tags: ["fleshshape"],
    quest_template: "surgery_vagina_loosen",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("surgeryvagina"),
      setup.qres.Job("slaver"),
      setup.qres.NoTrait("vagina_gape"),
      setup.qres.Trait("vagina_tight"),
    ],
    is_multitrain: true,
    result_traits: ["vagina_gape"],
    prerequisite_traits: [],
  },
});
