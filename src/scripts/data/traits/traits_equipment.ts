import type { TraitDefinition } from "../../classes/trait/Trait";

setup.TraitHelper.EQUIPMENT_SLUTTY = [
  "eq_slutty",
  "eq_gagged",
  "eq_blind",
  "eq_collar",
  "eq_restrained",
  "eq_chastity",
  "eq_plug_anus",
  "eq_plug_vagina",
  "eq_pony",
  "eq_pet",
];

export default typedObject<TraitDefinition>()({
  eq_slutty: {
    name: "eq: slutty",
    description: "Wears a noticably slutty clothing",
    slave_value: 0,
    skill_bonuses: {},
    tags: ["equipment"],
    icon_settings: { tier: 1, colors: true },
  },

  eq_veryslutty: {
    name: "eq: very slutty",
    description: "Wears an extremely slutty clothing",
    slave_value: 0,
    skill_bonuses: {},
    tags: ["equipment"],
    icon_settings: { tier: 2, colors: true },
  },

  eq_valuable: {
    name: "eq: valuable",
    description: "Wears a valuable set of clothes",
    slave_value: 0,
    skill_bonuses: {},
    tags: ["equipment"],
    icon_settings: { tier: 1, colors: true },
  },

  eq_veryvaluable: {
    name: "eq: very valuable",
    description: "Wears an extremely valuable set of clothes",
    slave_value: 0,
    skill_bonuses: {},
    tags: ["equipment"],
    icon_settings: { tier: 2, colors: true },
  },

  eq_gagged: {
    name: "eq: gagged",
    description: "Mouth is obstructed and prevents speaking",
    slave_value: 0,
    skill_bonuses: {
      social: -0.7,
      intrigue: -0.7,
      arcane: -0.7,
    },
    tags: ["equipment"],
  },

  eq_blind: {
    name: "eq: blind",
    description: "Eyes is covered and is prevented seeing",
    slave_value: 0,
    skill_bonuses: {
      combat: -0.7,
      intrigue: -0.7,
      survival: -0.7,
      knowledge: -0.7,
      arcane: -0.7,
    },
    tags: ["equipment"],
  },

  eq_collar: {
    name: "eq: collar",
    description: "Collar on the neck, the mark of a slave",
    slave_value: 0,
    skill_bonuses: {
      slaving: -0.7,
      intrigue: -0.7,
      social: -0.7,
    },
    tags: ["equipment"],
  },

  eq_restrained: {
    name: "eq: restrained",
    description: "Restrained or tied up, and is prevented from moving",
    slave_value: 0,
    skill_bonuses: {
      combat: -0.7,
      brawn: -0.7,
      survival: -0.7,
      intrigue: -0.7,
      slaving: -0.7,
      aid: -0.7,
    },
    tags: ["equipment"],
  },

  eq_chastity: {
    name: "eq: chastity",
    description:
      "Equipped with a metallic device preventing their dick from becoming erect",
    slave_value: 0,
    skill_bonuses: {
      sex: -0.7,
    },
    tags: ["equipment"],
  },

  eq_plug_anus: {
    name: "eq: plug (ass)",
    description: "A dildo is plugged deep inside the ass",
    slave_value: 0,
    skill_bonuses: {
      combat: -0.7,
      survival: -0.7,
      intrigue: -0.7,
      knowledge: -0.7,
      arcane: -0.7,
    },
    tags: ["equipment"],
  },

  eq_plug_vagina: {
    name: "eq: plug (vagina)",
    description: "A dildo is plugged deep inside the vagina",
    slave_value: 0,
    skill_bonuses: {
      sex: -0.7,
    },
    tags: ["equipment"],
  },

  eq_pony: {
    name: "eq: pony",
    description: "Fitted with a set of pony gear",
    slave_value: 0,
    skill_bonuses: {
      combat: -0.7,
      survival: -0.7,
      intrigue: -0.7,
      slaving: -0.7,
      social: -0.7,
      knowledge: -0.7,
      aid: -0.7,
    },
    tags: ["equipment"],
  },

  eq_pet: {
    name: "eq: pet",
    description: "Fitted with a set of pet gear",
    slave_value: 0,
    skill_bonuses: {
      combat: -0.7,
      survival: -0.7,
      intrigue: -0.7,
      slaving: -0.7,
      social: -0.7,
      knowledge: -0.7,
      aid: -0.7,
    },
    tags: ["equipment"],
  },
});
