import type { UnitActionDefinition } from "../../classes/unitaction/UnitAction";

export default definitions<UnitActionDefinition>()({
  purify_all: {
    tags: ["purification"],
    quest_template: "purify_all",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("temple"),
      setup.qres.NoTrait("race_demon"),
      setup.qres.CanPurify(),
    ],
  },

  purify_all_repeat: {
    repeat_self: true,
    tags: ["purification"],
    quest_template: "purify_all",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("temple"),
      setup.qres.NoTrait("race_demon"),
      setup.qres.CanPurify(),
    ],
  },

  purify_body: {
    tags: ["purification"],
    quest_template: "purify_body",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("prayerroom"),
      setup.qres.NoTrait("race_demon"),
      setup.qres.CanPurify("body"),
    ],
  },

  purify_arms: {
    tags: ["purification"],
    quest_template: "purify_arms",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("prayerroom"),
      setup.qres.NoTrait("race_demon"),
      setup.qres.CanPurify("arms"),
    ],
  },

  purify_legs: {
    tags: ["purification"],
    quest_template: "purify_legs",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("prayerroom"),
      setup.qres.NoTrait("race_demon"),
      setup.qres.CanPurify("legs"),
    ],
  },

  purify_eyes: {
    tags: ["purification"],
    quest_template: "purify_eyes",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("blessingroom"),
      setup.qres.NoTrait("race_demon"),
      setup.qres.CanPurify("eyes"),
    ],
  },

  purify_ears: {
    tags: ["purification"],
    quest_template: "purify_ears",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("blessingroom"),
      setup.qres.NoTrait("race_demon"),
      setup.qres.CanPurify("ears"),
    ],
  },

  purify_mouth: {
    tags: ["purification"],
    quest_template: "purify_mouth",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("blessingroom"),
      setup.qres.NoTrait("race_demon"),
      setup.qres.CanPurify("mouth"),
    ],
  },

  purify_tail: {
    tags: ["purification"],
    quest_template: "purify_tail",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("penitenceroom"),
      setup.qres.NoTrait("race_demon"),
      setup.qres.CanPurify("tail"),
    ],
  },

  purify_wings: {
    tags: ["purification"],
    quest_template: "purify_wings",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("penitenceroom"),
      setup.qres.NoTrait("race_demon"),
      setup.qres.CanPurify("wings"),
    ],
  },

  purify_dick: {
    tags: ["purification"],
    quest_template: "purify_dick",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("penitenceroom"),
      setup.qres.NoTrait("race_demon"),
      setup.qres.CanPurify("dick"),
    ],
  },
});
