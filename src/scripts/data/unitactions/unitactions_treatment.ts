import type { UnitActionDefinition } from "../../classes/unitaction/UnitAction";

export default definitions<UnitActionDefinition>()({
  treatment_heal_basic: {
    tags: ["treatment"],
    quest_template: "treatment_heal_basic",
    prerequisites: [],
    unit_requirements: [
      setup.qres.HasItem("healing_potion"),
      setup.qres.Building("treatmentroom"),
      setup.qres.IsInjured(),
    ],
    is_allow_injured: true,
  },

  treatment_heal_advanced: {
    tags: ["treatment"],
    quest_template: "treatment_heal_advanced",
    prerequisites: [],
    unit_requirements: [
      setup.qres.HasItem("healing_potion_greater"),
      setup.qres.Building("treatmentroom"),
      setup.qres.IsInjured(),
    ],
    is_allow_injured: true,
  },

  treatment_blank: {
    tags: ["treatment"],
    quest_template: "treatment_blank",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Job("slave"),
      setup.qres.AnyTrait(setup.TraitHelper.TRAINING_ALL()),
      setup.qres.HasItem("blank_potion"),
      setup.qres.Building("treatmentroomblank"),
      setup.qres.Available(),
    ],
  },

  treatment_resetlevel: {
    tags: ["treatment"],
    quest_template: "treatment_resetlevel",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Job("slaver"),
      setup.qres.HasItem("reset_potion"),
      setup.qres.Building("treatmentroomresetlevel"),
      setup.qres.Available(),
    ],
  },

  treatment_mindmend: {
    tags: ["treatment"],
    quest_template: "treatment_mindmend",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Trait("training_mindbreak"),
      setup.qres.HasItem("mindmend_potion"),
      setup.qres.Building("treatmentroommindmend"),
      setup.qres.Available(),
    ],
  },

  treatment_memoryisolation: {
    tags: ["treatment"],
    quest_template: "treatmentmemory_isolation",
    prerequisites: [],
    unit_requirements: [
      setup.qres.HasItem("potion_isolation"),
      setup.qres.Building("treatmentroomisolation"),
      setup.qres.Available(),
    ],
  },

  treatment_hate: {
    tags: ["treatment"],
    quest_template: "treatment_hate",
    prerequisites: [],
    unit_requirements: [
      setup.qres.HasItem("hate_potion"),
      setup.qres.Building("treatmentroomhate"),
      setup.qres.Available(),
    ],
  },

  treatment_love: {
    tags: ["treatment"],
    quest_template: "treatment_love",
    prerequisites: [],
    unit_requirements: [
      setup.qres.HasItem("love_potion"),
      setup.qres.Building("treatmentroomlove"),
      setup.qres.Available(),
    ],
  },

  treatment_lovetrue: {
    tags: ["treatment"],
    quest_template: "treatment_love_true",
    prerequisites: [],
    unit_requirements: [
      setup.qres.HasItem("love_potion_true"),
      setup.qres.Building("treatmentroomlovetrue"),
      setup.qres.Available(),
    ],
  },

  treatment_forget: {
    tags: ["treatment"],
    quest_template: "treatment_forget",
    prerequisites: [],
    unit_requirements: [
      setup.qres.HasItem("forget_potion"),
      setup.qres.Building("treatmentroomforget"),
      setup.qres.Available(),
    ],
  },

  treatment_transformation: {
    tags: ["treatment"],
    quest_template: "treatment_transformation",
    prerequisites: [],
    unit_requirements: [
      setup.qres.HasItem("potion_transformation"),
      setup.qres.Building("treatmentroomtransformation"),
      setup.qres.NoTrait("race_demon"),
      setup.qres.Available(),
    ],
  },

  treatment_alternative: {
    tags: ["treatment"],
    quest_template: "treatment_alternative",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Job("slaver"),
      setup.qres.HasItem("potion_alternative"),
      setup.qres.Building("treatmentroomalternative"),
      setup.qres.Available(),
    ],
  },
});
