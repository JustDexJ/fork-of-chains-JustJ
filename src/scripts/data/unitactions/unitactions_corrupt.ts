import { UnitActionDefinition } from "../../classes/unitaction/UnitAction";

export default definitions<UnitActionDefinition>()({
  slavecorrupt_all: {
    tags: ["corruption"],
    quest_template: "slavecorrupt_all",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("ritualchamber"),
      setup.qres.Job("slave"),
      setup.qres.NoTrait("race_demon"),
    ],
  },

  slavecorrupt_body: {
    tags: ["corruption"],
    quest_template: "slavecorrupt_body",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("mirrorofthedamned"),
      setup.qres.Job("slave"),
      setup.qres.NoTrait("race_demon"),
    ],
  },

  slavecorrupt_arms: {
    tags: ["corruption"],
    quest_template: "slavecorrupt_arms",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("mirrorofthedamned"),
      setup.qres.Job("slave"),
      setup.qres.NoTrait("race_demon"),
    ],
  },

  slavecorrupt_legs: {
    tags: ["corruption"],
    quest_template: "slavecorrupt_legs",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("mirrorofthedamned"),
      setup.qres.Job("slave"),
      setup.qres.NoTrait("race_demon"),
    ],
  },

  slavecorrupt_eyes: {
    tags: ["corruption"],
    quest_template: "slavecorrupt_eyes",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("poolofmist"),
      setup.qres.Job("slave"),
      setup.qres.NoTrait("race_demon"),
    ],
  },

  slavecorrupt_ears: {
    tags: ["corruption"],
    quest_template: "slavecorrupt_ears",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("poolofmist"),
      setup.qres.Job("slave"),
      setup.qres.NoTrait("race_demon"),
    ],
  },

  slavecorrupt_mouth: {
    tags: ["corruption"],
    quest_template: "slavecorrupt_mouth",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("poolofmist"),
      setup.qres.Job("slave"),
      setup.qres.NoTrait("race_demon"),
    ],
  },

  slavecorrupt_tail: {
    tags: ["corruption"],
    quest_template: "slavecorrupt_tail",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("altarofdarkness"),
      setup.qres.Job("slave"),
      setup.qres.NoTrait("race_demon"),
    ],
  },

  slavecorrupt_wings: {
    tags: ["corruption"],
    quest_template: "slavecorrupt_wings",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("altarofdarkness"),
      setup.qres.Job("slave"),
      setup.qres.NoTrait("race_demon"),
    ],
  },

  slavecorrupt_dick: {
    tags: ["corruption"],
    quest_template: "slavecorrupt_dick",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("altarofdarkness"),
      setup.qres.Job("slave"),
      setup.qres.NoTrait("race_demon"),
    ],
  },

  /* SLAVER CORRUPTION STARTS HERE */

  slavercorrupt_all: {
    tags: ["corruption"],
    quest_template: "slavercorrupt_all",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("deepritualchamber"),
      setup.qres.Job("slaver"),
      setup.qres.NoTrait("race_demon"),
    ],
  },

  slavercorrupt_body: {
    tags: ["corruption"],
    quest_template: "slavercorrupt_body",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("deepmirrorofthedamned"),
      setup.qres.Job("slaver"),
      setup.qres.NoTrait("race_demon"),
    ],
  },

  slavercorrupt_arms: {
    tags: ["corruption"],
    quest_template: "slavercorrupt_arms",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("deepmirrorofthedamned"),
      setup.qres.Job("slaver"),
      setup.qres.NoTrait("race_demon"),
    ],
  },

  slavercorrupt_legs: {
    tags: ["corruption"],
    quest_template: "slavercorrupt_legs",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("deepmirrorofthedamned"),
      setup.qres.Job("slaver"),
      setup.qres.NoTrait("race_demon"),
    ],
  },

  slavercorrupt_eyes: {
    tags: ["corruption"],
    quest_template: "slavercorrupt_eyes",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("deeppoolofmist"),
      setup.qres.Job("slaver"),
      setup.qres.NoTrait("race_demon"),
    ],
  },

  slavercorrupt_ears: {
    tags: ["corruption"],
    quest_template: "slavercorrupt_ears",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("deeppoolofmist"),
      setup.qres.Job("slaver"),
      setup.qres.NoTrait("race_demon"),
    ],
  },

  slavercorrupt_mouth: {
    tags: ["corruption"],
    quest_template: "slavercorrupt_mouth",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("deeppoolofmist"),
      setup.qres.Job("slaver"),
      setup.qres.NoTrait("race_demon"),
    ],
  },

  slavercorrupt_tail: {
    tags: ["corruption"],
    quest_template: "slavercorrupt_tail",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("deepaltarofdarkness"),
      setup.qres.Job("slaver"),
      setup.qres.NoTrait("race_demon"),
    ],
  },

  slavercorrupt_wings: {
    tags: ["corruption"],
    quest_template: "slavercorrupt_wings",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("deepaltarofdarkness"),
      setup.qres.Job("slaver"),
      setup.qres.NoTrait("race_demon"),
    ],
  },

  slavercorrupt_dick: {
    tags: ["corruption"],
    quest_template: "slavercorrupt_dick",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("deepaltarofdarkness"),
      setup.qres.Job("slaver"),
      setup.qres.NoTrait("race_demon"),
      setup.qres.Trait("dick_tiny"),
    ],
  },
});
