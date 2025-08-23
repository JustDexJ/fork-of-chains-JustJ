import type { UnitActionDefinition } from "../../classes/unitaction/UnitAction";

export default definitions<UnitActionDefinition>()({
  obedience_basic: {
    tags: ["training"],
    quest_template: "training_obedience_basic",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("trainingchamber"),
      setup.qres.Job("slave"),
      setup.qres.NoTrait("training_obedience_basic"),
      setup.qres.NoTrait("training_mindbreak"),
    ],
    is_multitrain: true,
    result_traits: ["training_obedience_basic"],
    prerequisite_traits: [],
  },

  obedience_advanced: {
    tags: ["training"],
    quest_template: "training_obedience_advanced",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("trainingchamber"),
      setup.qres.Job("slave"),
      setup.qres.TraitExact("training_obedience_basic"),
      setup.qres.NoTrait("training_mindbreak"),
    ],
    is_multitrain: true,
    result_traits: ["training_obedience_advanced"],
    prerequisite_traits: ["training_obedience_basic"],
  },

  obedience_master: {
    tags: ["training"],
    quest_template: "training_obedience_master",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("obediencetrainingroom"),
      setup.qres.Job("slave"),
      setup.qres.TraitExact("training_obedience_advanced"),
      setup.qres.NoTraitsWithTag("trmaster"),
      setup.qres.NoTrait("training_mindbreak"),
    ],
    is_multitrain: true,
    result_traits: ["training_obedience_master"],
    prerequisite_traits: ["training_obedience_advanced"],
  },

  domestic_basic: {
    tags: ["training"],
    quest_template: "training_domestic_basic",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("milkerroom"),
      setup.qres.Job("slave"),
      setup.qres.Trait("training_obedience_basic"),
      setup.qres.NoTrait("training_domestic_basic"),
      setup.qres.NoTrait("training_mindbreak"),
    ],
    is_multitrain: true,
    result_traits: ["training_domestic_basic"],
    prerequisite_traits: ["training_obedience_basic"],
  },

  domestic_advanced: {
    tags: ["training"],
    quest_template: "training_domestic_advanced",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("milkerroom"),
      setup.qres.Job("slave"),
      setup.qres.Trait("training_obedience_advanced"),
      setup.qres.TraitExact("training_domestic_basic"),
      setup.qres.NoTrait("training_mindbreak"),
    ],
    is_multitrain: true,
    result_traits: ["training_domestic_advanced"],
    prerequisite_traits: [
      "training_domestic_basic",
      "training_obedience_advanced",
    ],
  },

  domestic_master: {
    tags: ["training"],
    quest_template: "training_domestic_master",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("domestictrainingroom"),
      setup.qres.Job("slave"),
      setup.qres.TraitExact("training_domestic_advanced"),
      setup.qres.NoTraitsWithTag("trmaster"),
      setup.qres.NoTrait("training_mindbreak"),
    ],
    is_multitrain: true,
    result_traits: ["training_domestic_master"],
    prerequisite_traits: [
      "training_domestic_advanced",
      "training_obedience_advanced",
    ],
  },

  endurance_basic: {
    tags: ["training"],
    quest_template: "training_endurance_basic",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("trainingfield"),
      setup.qres.Job("slave"),
      setup.qres.Trait("training_obedience_basic"),
      setup.qres.NoTrait("training_endurance_basic"),
      setup.qres.NoTrait("training_mindbreak"),
    ],
    is_multitrain: true,
    result_traits: ["training_endurance_basic"],
    prerequisite_traits: ["training_obedience_basic"],
  },

  endurance_advanced: {
    tags: ["training"],
    quest_template: "training_endurance_advanced",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("trainingfield"),
      setup.qres.Job("slave"),
      setup.qres.Trait("training_obedience_advanced"),
      setup.qres.TraitExact("training_endurance_basic"),
      setup.qres.NoTrait("training_mindbreak"),
    ],
    is_multitrain: true,
    result_traits: ["training_endurance_advanced"],
    prerequisite_traits: [
      "training_endurance_basic",
      "training_obedience_advanced",
    ],
  },

  endurance_master: {
    tags: ["training"],
    quest_template: "training_endurance_master",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("endurancetrainingroom"),
      setup.qres.Job("slave"),
      setup.qres.TraitExact("training_endurance_advanced"),
      setup.qres.NoTraitsWithTag("trmaster"),
      setup.qres.NoTrait("training_mindbreak"),
    ],
    is_multitrain: true,
    result_traits: ["training_endurance_master"],
    prerequisite_traits: [
      "training_endurance_advanced",
      "training_obedience_advanced",
    ],
  },

  oral_basic: {
    tags: ["training"],
    quest_template: "training_oral_basic",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("trainingbedroom"),
      setup.qres.Job("slave"),
      setup.qres.Trait("training_obedience_basic"),
      setup.qres.NoTrait("training_oral_basic"),
      setup.qres.NoTrait("training_mindbreak"),
    ],
    is_multitrain: true,
    result_traits: ["training_oral_basic"],
    prerequisite_traits: ["training_obedience_basic"],
  },

  oral_advanced: {
    tags: ["training"],
    quest_template: "training_oral_advanced",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("trainingbedroom"),
      setup.qres.Job("slave"),
      setup.qres.Trait("training_obedience_advanced"),
      setup.qres.TraitExact("training_oral_basic"),
      setup.qres.NoTrait("training_mindbreak"),
    ],
    is_multitrain: true,
    result_traits: ["training_oral_advanced"],
    prerequisite_traits: ["training_oral_basic", "training_obedience_advanced"],
  },

  oral_master: {
    tags: ["training"],
    quest_template: "training_oral_master",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("oraltrainingroom"),
      setup.qres.Job("slave"),
      setup.qres.TraitExact("training_oral_advanced"),
      setup.qres.NoTraitsWithTag("trmaster"),
      setup.qres.NoTrait("training_mindbreak"),
    ],
    is_multitrain: true,
    result_traits: ["training_oral_master"],
    prerequisite_traits: [
      "training_oral_advanced",
      "training_obedience_advanced",
    ],
  },

  vagina_basic: {
    tags: ["training"],
    quest_template: "training_vagina_basic",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("trainingbedroom"),
      setup.qres.Job("slave"),
      setup.qres.Trait("vagina_tight"),
      setup.qres.Trait("training_obedience_basic"),
      setup.qres.NoTrait("training_vagina_basic"),
      setup.qres.NoTrait("training_mindbreak"),
    ],
    is_multitrain: true,
    result_traits: ["training_vagina_basic"],
    prerequisite_traits: ["training_obedience_basic"],
  },

  vagina_advanced: {
    tags: ["training"],
    quest_template: "training_vagina_advanced",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("trainingbedroom"),
      setup.qres.Job("slave"),
      setup.qres.Trait("vagina_tight"),
      setup.qres.Trait("training_obedience_advanced"),
      setup.qres.TraitExact("training_vagina_basic"),
      setup.qres.NoTrait("training_mindbreak"),
    ],
    is_multitrain: true,
    result_traits: ["training_vagina_advanced"],
    prerequisite_traits: [
      "training_vagina_basic",
      "training_obedience_advanced",
    ],
  },

  vagina_master: {
    tags: ["training"],
    quest_template: "training_vagina_master",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("vaginatrainingroom"),
      setup.qres.Job("slave"),
      setup.qres.Trait("vagina_tight"),
      setup.qres.TraitExact("training_vagina_advanced"),
      setup.qres.NoTraitsWithTag("trmaster"),
      setup.qres.NoTrait("training_mindbreak"),
    ],
    is_multitrain: true,
    result_traits: ["training_vagina_master"],
    prerequisite_traits: [
      "training_vagina_advanced",
      "training_obedience_advanced",
    ],
  },

  anal_basic: {
    tags: ["training"],
    quest_template: "training_anal_basic",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("trainingbedroom"),
      setup.qres.Job("slave"),
      setup.qres.Trait("training_obedience_basic"),
      setup.qres.NoTrait("training_anal_basic"),
      setup.qres.NoTrait("training_mindbreak"),
    ],
    is_multitrain: true,
    result_traits: ["training_anal_basic"],
    prerequisite_traits: ["training_obedience_basic"],
  },

  anal_advanced: {
    tags: ["training"],
    quest_template: "training_anal_advanced",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("trainingbedroom"),
      setup.qres.Job("slave"),
      setup.qres.Trait("training_obedience_advanced"),
      setup.qres.TraitExact("training_anal_basic"),
      setup.qres.NoTrait("training_mindbreak"),
    ],
    is_multitrain: true,
    result_traits: ["training_anal_advanced"],
    prerequisite_traits: ["training_anal_basic", "training_obedience_advanced"],
  },

  anal_master: {
    tags: ["training"],
    quest_template: "training_anal_master",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("analtrainingroom"),
      setup.qres.Job("slave"),
      setup.qres.TraitExact("training_anal_advanced"),
      setup.qres.NoTraitsWithTag("trmaster"),
      setup.qres.NoTrait("training_mindbreak"),
    ],
    is_multitrain: true,
    result_traits: ["training_anal_master"],
    prerequisite_traits: [
      "training_anal_advanced",
      "training_obedience_advanced",
    ],
  },

  dominance_basic: {
    tags: ["training"],
    quest_template: "training_dominance_basic",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("torturechamber"),
      setup.qres.Job("slave"),
      setup.qres.Trait("training_obedience_advanced"),
      setup.qres.NoTrait("training_dominance_basic"),
      setup.qres.NoTrait("training_mindbreak"),
    ],
    is_multitrain: true,
    result_traits: ["training_dominance_basic"],
    prerequisite_traits: ["training_obedience_advanced"],
  },

  dominance_advanced: {
    tags: ["training"],
    quest_template: "training_dominance_advanced",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("torturechamber"),
      setup.qres.Job("slave"),
      setup.qres.Trait("training_obedience_advanced"),
      setup.qres.TraitExact("training_dominance_basic"),
      setup.qres.NoTrait("training_mindbreak"),
    ],
    is_multitrain: true,
    result_traits: ["training_dominance_advanced"],
    prerequisite_traits: [
      "training_dominance_basic",
      "training_obedience_advanced",
    ],
  },

  dominance_master: {
    tags: ["training"],
    quest_template: "training_dominance_master",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("dominancetrainingroom"),
      setup.qres.Job("slave"),
      setup.qres.TraitExact("training_dominance_advanced"),
      setup.qres.NoTraitsWithTag("trmaster"),
      setup.qres.NoTrait("training_mindbreak"),
    ],
    is_multitrain: true,
    result_traits: ["training_dominance_master"],
    prerequisite_traits: [
      "training_dominance_advanced",
      "training_obedience_advanced",
    ],
  },

  masochist_basic: {
    tags: ["training"],
    quest_template: "training_masochist_basic",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("torturechamber"),
      setup.qres.Job("slave"),
      setup.qres.Trait("training_obedience_basic"),
      setup.qres.NoTrait("training_masochist_basic"),
      setup.qres.NoTrait("training_mindbreak"),
    ],
    is_multitrain: true,
    result_traits: ["training_masochist_basic"],
    prerequisite_traits: ["training_obedience_basic"],
  },

  masochist_advanced: {
    tags: ["training"],
    quest_template: "training_masochist_advanced",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("torturechamber"),
      setup.qres.Job("slave"),
      setup.qres.Trait("training_obedience_advanced"),
      setup.qres.TraitExact("training_masochist_basic"),
      setup.qres.NoTrait("training_mindbreak"),
    ],
    is_multitrain: true,
    result_traits: ["training_masochist_advanced"],
    prerequisite_traits: [
      "training_masochist_basic",
      "training_obedience_advanced",
    ],
  },

  masochist_master: {
    tags: ["training"],
    quest_template: "training_masochist_master",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("masochisttrainingroom"),
      setup.qres.Job("slave"),
      setup.qres.TraitExact("training_masochist_advanced"),
      setup.qres.NoTraitsWithTag("trmaster"),
      setup.qres.NoTrait("training_mindbreak"),
    ],
    is_multitrain: true,
    result_traits: ["training_masochist_master"],
    prerequisite_traits: [
      "training_masochist_advanced",
      "training_obedience_advanced",
    ],
  },

  toilet_basic: {
    tags: ["training"],
    quest_template: "training_toilet_basic",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("fetishtrainingroom"),
      setup.qres.Job("slave"),
      setup.qres.Trait("training_obedience_basic"),
      setup.qres.NoTrait("training_toilet_basic"),
      setup.qres.NoTrait("training_mindbreak"),
    ],
    is_multitrain: true,
    result_traits: ["training_toilet_basic"],
    prerequisite_traits: ["training_obedience_basic"],
  },

  toilet_advanced: {
    tags: ["training"],
    quest_template: "training_toilet_advanced",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("fetishtrainingroom"),
      setup.qres.Job("slave"),
      setup.qres.Trait("training_obedience_advanced"),
      setup.qres.TraitExact("training_toilet_basic"),
      setup.qres.NoTrait("training_mindbreak"),
    ],
    is_multitrain: true,
    result_traits: ["training_toilet_advanced"],
    prerequisite_traits: [
      "training_toilet_basic",
      "training_obedience_advanced",
    ],
  },

  toilet_master: {
    tags: ["training"],
    quest_template: "training_toilet_master",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("toilettrainingroom"),
      setup.qres.Job("slave"),
      setup.qres.TraitExact("training_toilet_advanced"),
      setup.qres.NoTraitsWithTag("trmaster"),
      setup.qres.NoTrait("training_mindbreak"),
    ],
    is_multitrain: true,
    result_traits: ["training_toilet_master"],
    prerequisite_traits: [
      "training_toilet_advanced",
      "training_obedience_advanced",
    ],
  },

  horny_basic: {
    tags: ["training"],
    quest_template: "training_horny_basic",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("milkerroom"),
      setup.qres.Job("slave"),
      setup.qres.Trait("training_obedience_basic"),
      setup.qres.NoTrait("training_horny_basic"),
      setup.qres.NoTrait("training_mindbreak"),
    ],
    is_multitrain: true,
    result_traits: ["training_horny_basic"],
    prerequisite_traits: ["training_obedience_basic"],
  },

  horny_advanced: {
    tags: ["training"],
    quest_template: "training_horny_advanced",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("milkerroom"),
      setup.qres.Job("slave"),
      setup.qres.Trait("training_obedience_advanced"),
      setup.qres.TraitExact("training_horny_basic"),
      setup.qres.NoTrait("training_mindbreak"),
    ],
    is_multitrain: true,
    result_traits: ["training_horny_advanced"],
    prerequisite_traits: [
      "training_horny_basic",
      "training_obedience_advanced",
    ],
  },

  horny_master: {
    tags: ["training"],
    quest_template: "training_horny_master",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("hornytrainingroom"),
      setup.qres.Job("slave"),
      setup.qres.TraitExact("training_horny_advanced"),
      setup.qres.NoTraitsWithTag("trmaster"),
      setup.qres.NoTrait("training_mindbreak"),
    ],
    is_multitrain: true,
    result_traits: ["training_horny_master"],
    prerequisite_traits: [
      "training_horny_advanced",
      "training_obedience_advanced",
    ],
  },

  roleplay_basic: {
    tags: ["training"],
    quest_template: "training_roleplay_basic",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("fetishtrainingroom"),
      setup.qres.Job("slave"),
      setup.qres.Trait("training_obedience_basic"),
      setup.qres.NoTrait("training_roleplay_basic"),
      setup.qres.NoTrait("training_mindbreak"),
    ],
    is_multitrain: true,
    result_traits: ["training_roleplay_basic"],
    prerequisite_traits: ["training_obedience_basic"],
  },

  roleplay_advanced: {
    tags: ["training"],
    quest_template: "training_roleplay_advanced",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("fetishtrainingroom"),
      setup.qres.Job("slave"),
      setup.qres.Trait("training_obedience_advanced"),
      setup.qres.TraitExact("training_roleplay_basic"),
      setup.qres.NoTrait("training_mindbreak"),
    ],
    is_multitrain: true,
    result_traits: ["training_roleplay_advanced"],
    prerequisite_traits: [
      "training_roleplay_basic",
      "training_obedience_advanced",
    ],
  },

  roleplay_master: {
    tags: ["training"],
    quest_template: "training_roleplay_master",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("roleplaytrainingroom"),
      setup.qres.Job("slave"),
      setup.qres.TraitExact("training_roleplay_advanced"),
      setup.qres.NoTraitsWithTag("trmaster"),
      setup.qres.NoTrait("training_mindbreak"),
    ],
    is_multitrain: true,
    result_traits: ["training_roleplay_master"],
    prerequisite_traits: [
      "training_roleplay_advanced",
      "training_obedience_advanced",
    ],
  },

  sissy_basic: {
    tags: ["training"],
    quest_template: "training_sissy_basic",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("fetishtrainingroom"),
      setup.qres.Job("slave"),
      setup.qres.Trait("gender_male"),
      setup.qres.Trait("training_obedience_basic"),
      setup.qres.NoTrait("training_sissy_basic"),
      setup.qres.NoTrait("training_mindbreak"),
    ],
    is_multitrain: true,
    result_traits: ["training_sissy_basic"],
    prerequisite_traits: ["training_obedience_basic"],
  },

  sissy_advanced: {
    tags: ["training"],
    quest_template: "training_sissy_advanced",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("fetishtrainingroom"),
      setup.qres.Job("slave"),
      setup.qres.Trait("gender_male"),
      setup.qres.Trait("training_obedience_advanced"),
      setup.qres.TraitExact("training_sissy_basic"),
      setup.qres.NoTrait("training_mindbreak"),
    ],
    is_multitrain: true,
    result_traits: ["training_sissy_advanced"],
    prerequisite_traits: [
      "training_sissy_basic",
      "training_obedience_advanced",
    ],
  },

  sissy_master: {
    tags: ["training"],
    quest_template: "training_sissy_master",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("sissytrainingroom"),
      setup.qres.Job("slave"),
      setup.qres.Trait("gender_male"),
      setup.qres.TraitExact("training_sissy_advanced"),
      setup.qres.NoTraitsWithTag("trmaster"),
      setup.qres.NoTrait("training_mindbreak"),
    ],
    is_multitrain: true,
    result_traits: ["training_sissy_master"],
    prerequisite_traits: [
      "training_sissy_advanced",
      "training_obedience_advanced",
    ],
  },

  pet_basic: {
    tags: ["training"],
    quest_template: "training_pet_basic",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("trainingfield"),
      setup.qres.Job("slave"),
      setup.qres.Trait("training_obedience_basic"),
      setup.qres.NoTrait("training_pet_basic"),
      setup.qres.NoTrait("training_mindbreak"),
    ],
    is_multitrain: true,
    result_traits: ["training_pet_basic"],
    prerequisite_traits: ["training_obedience_basic"],
  },

  pet_advanced: {
    tags: ["training"],
    quest_template: "training_pet_advanced",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("trainingfield"),
      setup.qres.Job("slave"),
      setup.qres.Trait("training_obedience_advanced"),
      setup.qres.TraitExact("training_pet_basic"),
      setup.qres.NoTrait("training_mindbreak"),
    ],
    is_multitrain: true,
    result_traits: ["training_pet_advanced"],
    prerequisite_traits: ["training_pet_basic", "training_obedience_advanced"],
  },

  pet_master: {
    tags: ["training"],
    quest_template: "training_pet_master",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("pettrainingroom"),
      setup.qres.Job("slave"),
      setup.qres.TraitExact("training_pet_advanced"),
      setup.qres.NoTraitsWithTag("trmaster"),
      setup.qres.NoTrait("training_mindbreak"),
    ],
    is_multitrain: true,
    result_traits: ["training_pet_master"],
    prerequisite_traits: [
      "training_pet_advanced",
      "training_obedience_advanced",
    ],
  },

  pony_basic: {
    tags: ["training"],
    quest_template: "training_pony_basic",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("trainingfield"),
      setup.qres.Job("slave"),
      setup.qres.Trait("training_endurance_basic"),
      setup.qres.Trait("training_obedience_basic"),
      setup.qres.NoTrait("training_pony_basic"),
      setup.qres.NoTrait("training_mindbreak"),
    ],
    is_multitrain: true,
    result_traits: ["training_pony_basic"],
    prerequisite_traits: [
      "training_obedience_basic",
      "training_endurance_basic",
    ],
  },

  pony_advanced: {
    tags: ["training"],
    quest_template: "training_pony_advanced",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("trainingfield"),
      setup.qres.Job("slave"),
      setup.qres.Trait("training_endurance_advanced"),
      setup.qres.Trait("training_obedience_advanced"),
      setup.qres.TraitExact("training_pony_basic"),
      setup.qres.NoTrait("training_mindbreak"),
    ],
    is_multitrain: true,
    result_traits: ["training_pony_advanced"],
    prerequisite_traits: [
      "training_pony_basic",
      "training_endurance_advanced",
      "training_obedience_advanced",
    ],
  },

  pony_master: {
    tags: ["training"],
    quest_template: "training_pony_master",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("ponytrainingroom"),
      setup.qres.Job("slave"),
      setup.qres.Trait("training_endurance_advanced"),
      setup.qres.TraitExact("training_pony_advanced"),
      setup.qres.NoTraitsWithTag("trmaster"),
      setup.qres.NoTrait("training_mindbreak"),
    ],
    is_multitrain: true,
    result_traits: ["training_pony_master"],
    prerequisite_traits: [
      "training_pony_advanced",
      "training_endurance_advanced",
      "training_obedience_advanced",
    ],
  },

  mindbreak: {
    tags: ["training"],
    quest_template: "training_mindbreak",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("torturechamber"),
      setup.qres.Job("slave"),
      setup.qres.NoTraitsWithTag("trmaster"),
      setup.qres.NoTrait("training_mindbreak"),
    ],
    result_traits: ["training_mindbreak"],
    prerequisite_traits: [],
  },

  willbreak: {
    tags: ["training"],
    quest_template: "search_for_a_willbreaker",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("researchroom"),
      setup.qres.Job("slave"),
      setup.qres.AllowDefiant(),
      setup.qres.Trait("will_defiant"),
      setup.qres.Through(
        setup.qres.And([
          setup.qres.NoQuest("search_for_a_willbreaker"),
          setup.qres.NoUnitWithTag("in_training_defiant_slave"),
        ]),
        "You can only break one slave at a time.",
      ),
    ],
    result_traits: [],
    prerequisite_traits: ["will_defiant"],
  },

  convince: {
    tags: ["training"],
    quest_template: "training_convince",
    prerequisites: [],
    unit_requirements: [
      setup.qres.Building("convincingroom"),
      setup.qres.Job("slave"),
      setup.qres.Trait("training_none"),
    ],
  },

  brainwash: {
    tags: ["training"],
    quest_template: "training_brainwash",
    prerequisites: [],
    unit_requirements: [
      setup.qres.HasItem("potion_slavertraining"),
      setup.qres.Building("brainwashingroom"),
      setup.qres.Job("slave"),
      setup.qres.NoTrait("training_mindbreak"),
      setup.qres.NoTraitsWithTag("trmaster"),
    ],
  },
});
