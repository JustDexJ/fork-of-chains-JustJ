import type { TraitDefinition } from "../../classes/trait/Trait";

/* Trauma-related traits. These traits are temporary, and never permanent on a unit. Reduces value. */

export default typedObject<TraitDefinition>()({
  /* =========== */
  /*   TRAUMAS   */
  /* =========== */

  trauma_combat: {
    name: "traumatized",
    description: "Traumatized by prior engagement",
    slave_value: -setup.MONEY_TRAIT_MEDIUM,
    skill_bonuses: { combat: setup.TRAIT_TRAUMA_EFFECT },
    tags: ["trauma", "temporary"],
  },

  trauma_brawn: {
    name: "lethargy",
    description: "Difficulty sleeping which causes lack of energy",
    slave_value: -setup.MONEY_TRAIT_MEDIUM,
    skill_bonuses: { brawn: setup.TRAIT_TRAUMA_EFFECT },
    tags: ["trauma", "temporary"],
  },

  trauma_survival: {
    name: "depression",
    description: "Maybe life is not worth living",
    slave_value: -setup.MONEY_TRAIT_MEDIUM,
    skill_bonuses: { survival: setup.TRAIT_TRAUMA_EFFECT },
    tags: ["trauma", "temporary"],
  },

  trauma_intrigue: {
    name: "anxiety",
    description: "Nervous about everything",
    slave_value: -setup.MONEY_TRAIT_MEDIUM,
    skill_bonuses: { intrigue: setup.TRAIT_TRAUMA_EFFECT },
    tags: ["trauma", "temporary"],
  },

  trauma_slaving: {
    name: "meek",
    description: "Frightened by the smallest of things",
    slave_value: -setup.MONEY_TRAIT_MEDIUM,
    skill_bonuses: { slaving: setup.TRAIT_TRAUMA_EFFECT },
    tags: ["trauma", "temporary"],
  },

  trauma_knowledge: {
    name: "absent-minded",
    description: "Gaps in memory",
    slave_value: -setup.MONEY_TRAIT_MEDIUM,
    skill_bonuses: { knowledge: setup.TRAIT_TRAUMA_EFFECT },
    tags: ["trauma", "temporary"],
  },

  trauma_social: {
    name: "mistrustful",
    description: "Trust nobody",
    slave_value: -setup.MONEY_TRAIT_MEDIUM,
    skill_bonuses: { social: setup.TRAIT_TRAUMA_EFFECT },
    tags: ["trauma", "temporary"],
  },

  trauma_aid: {
    name: "cursed",
    description: "Followed by bad luck",
    slave_value: -setup.MONEY_TRAIT_MEDIUM,
    skill_bonuses: { aid: setup.TRAIT_TRAUMA_EFFECT },
    tags: ["trauma", "temporary"],
  },

  trauma_arcane: {
    name: "scatterbrained",
    description: "Inability to focus",
    slave_value: -setup.MONEY_TRAIT_MEDIUM,
    skill_bonuses: { arcane: setup.TRAIT_TRAUMA_EFFECT },
    tags: ["trauma", "temporary"],
  },

  trauma_sex: {
    name: "frigid",
    description: "Has no interest in sex",
    slave_value: -setup.MONEY_TRAIT_MEDIUM,
    skill_bonuses: { sex: setup.TRAIT_TRAUMA_EFFECT },
    tags: ["trauma", "temporary"],
  },

  /* ========= */
  /*   BOONS   */
  /* ========= */

  boon_combat: {
    name: "courageous",
    description: "There is nothing to fear",
    slave_value: 0,
    skill_bonuses: { combat: setup.TRAIT_BOON_EFFECT },
    tags: ["boon", "temporary"],
  },

  boon_brawn: {
    name: "vigorous",
    description: "Limitless energy",
    slave_value: 0,
    skill_bonuses: { brawn: setup.TRAIT_BOON_EFFECT },
    tags: ["boon", "temporary"],
  },

  boon_survival: {
    name: "full of life",
    description: "Life is a gift",
    slave_value: 0,
    skill_bonuses: { survival: setup.TRAIT_BOON_EFFECT },
    tags: ["boon", "temporary"],
  },

  boon_intrigue: {
    name: "insightful",
    description: "Everyone has their secrets",
    slave_value: 0,
    skill_bonuses: { intrigue: setup.TRAIT_BOON_EFFECT },
    tags: ["boon", "temporary"],
  },

  boon_slaving: {
    name: "menacing",
    description: "In control",
    slave_value: 0,
    skill_bonuses: { slaving: setup.TRAIT_BOON_EFFECT },
    tags: ["boon", "temporary"],
  },

  boon_knowledge: {
    name: "clear-minded",
    description: "Arranged their thoughts in a clear fashion",
    slave_value: 0,
    skill_bonuses: { knowledge: setup.TRAIT_BOON_EFFECT },
    tags: ["boon", "temporary"],
  },

  boon_social: {
    name: "joyful",
    description: "Never seems to be down",
    slave_value: 0,
    skill_bonuses: { social: setup.TRAIT_BOON_EFFECT },
    tags: ["boon", "temporary"],
  },

  boon_aid: {
    name: "blessed",
    description: "Blessed by some higher plane",
    slave_value: 0,
    skill_bonuses: { aid: setup.TRAIT_BOON_EFFECT },
    tags: ["boon", "temporary"],
  },

  boon_arcane: {
    name: "focused",
    description: "Mind on one task",
    slave_value: 0,
    skill_bonuses: { arcane: setup.TRAIT_BOON_EFFECT },
    tags: ["boon", "temporary"],
  },

  boon_sex: {
    name: "passionate",
    description: "Express yourself",
    slave_value: 0,
    skill_bonuses: { sex: setup.TRAIT_BOON_EFFECT },
    tags: ["boon", "temporary"],
  },
});
