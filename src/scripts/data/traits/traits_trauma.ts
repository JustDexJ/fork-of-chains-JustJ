import type { TraitOrGroupDefinitions } from "../../classes/trait/Trait";
import { Constants } from "../../constants";

/* Trauma-related traits. These traits are temporary, and never permanent on a unit. Reduces value. */

export default {
  /* =========== */
  /*   TRAUMAS   */
  /* =========== */

  trauma_combat: {
    name: "traumatized",
    description: "Traumatized by prior engagement",
    slave_value: -Constants.MONEY_TRAIT_MEDIUM,
    skill_bonuses: { combat: Constants.TRAIT_TRAUMA_EFFECT },
    tags: ["trauma", "temporary"],
  },

  trauma_brawn: {
    name: "lethargy",
    description: "Difficulty sleeping which causes lack of energy",
    slave_value: -Constants.MONEY_TRAIT_MEDIUM,
    skill_bonuses: { brawn: Constants.TRAIT_TRAUMA_EFFECT },
    tags: ["trauma", "temporary"],
  },

  trauma_survival: {
    name: "depression",
    description: "Maybe life is not worth living",
    slave_value: -Constants.MONEY_TRAIT_MEDIUM,
    skill_bonuses: { survival: Constants.TRAIT_TRAUMA_EFFECT },
    tags: ["trauma", "temporary"],
  },

  trauma_intrigue: {
    name: "anxiety",
    description: "Nervous about everything",
    slave_value: -Constants.MONEY_TRAIT_MEDIUM,
    skill_bonuses: { intrigue: Constants.TRAIT_TRAUMA_EFFECT },
    tags: ["trauma", "temporary"],
  },

  trauma_slaving: {
    name: "meek",
    description: "Frightened by the smallest of things",
    slave_value: -Constants.MONEY_TRAIT_MEDIUM,
    skill_bonuses: { slaving: Constants.TRAIT_TRAUMA_EFFECT },
    tags: ["trauma", "temporary"],
  },

  trauma_knowledge: {
    name: "absent-minded",
    description: "Gaps in memory",
    slave_value: -Constants.MONEY_TRAIT_MEDIUM,
    skill_bonuses: { knowledge: Constants.TRAIT_TRAUMA_EFFECT },
    tags: ["trauma", "temporary"],
  },

  trauma_social: {
    name: "mistrustful",
    description: "Trust nobody",
    slave_value: -Constants.MONEY_TRAIT_MEDIUM,
    skill_bonuses: { social: Constants.TRAIT_TRAUMA_EFFECT },
    tags: ["trauma", "temporary"],
  },

  trauma_aid: {
    name: "cursed",
    description: "Followed by bad luck",
    slave_value: -Constants.MONEY_TRAIT_MEDIUM,
    skill_bonuses: { aid: Constants.TRAIT_TRAUMA_EFFECT },
    tags: ["trauma", "temporary"],
  },

  trauma_arcane: {
    name: "scatterbrained",
    description: "Inability to focus",
    slave_value: -Constants.MONEY_TRAIT_MEDIUM,
    skill_bonuses: { arcane: Constants.TRAIT_TRAUMA_EFFECT },
    tags: ["trauma", "temporary"],
  },

  trauma_sex: {
    name: "frigid",
    description: "Has no interest in sex",
    slave_value: -Constants.MONEY_TRAIT_MEDIUM,
    skill_bonuses: { sex: Constants.TRAIT_TRAUMA_EFFECT },
    tags: ["trauma", "temporary"],
  },

  /* ========= */
  /*   BOONS   */
  /* ========= */

  boon_combat: {
    name: "courageous",
    description: "There is nothing to fear",
    slave_value: 0,
    skill_bonuses: { combat: Constants.TRAIT_BOON_EFFECT },
    tags: ["boon", "temporary"],
  },

  boon_brawn: {
    name: "vigorous",
    description: "Limitless energy",
    slave_value: 0,
    skill_bonuses: { brawn: Constants.TRAIT_BOON_EFFECT },
    tags: ["boon", "temporary"],
  },

  boon_survival: {
    name: "full of life",
    description: "Life is a gift",
    slave_value: 0,
    skill_bonuses: { survival: Constants.TRAIT_BOON_EFFECT },
    tags: ["boon", "temporary"],
  },

  boon_intrigue: {
    name: "insightful",
    description: "Everyone has their secrets",
    slave_value: 0,
    skill_bonuses: { intrigue: Constants.TRAIT_BOON_EFFECT },
    tags: ["boon", "temporary"],
  },

  boon_slaving: {
    name: "menacing",
    description: "In control",
    slave_value: 0,
    skill_bonuses: { slaving: Constants.TRAIT_BOON_EFFECT },
    tags: ["boon", "temporary"],
  },

  boon_knowledge: {
    name: "clear-minded",
    description: "Arranged their thoughts in a clear fashion",
    slave_value: 0,
    skill_bonuses: { knowledge: Constants.TRAIT_BOON_EFFECT },
    tags: ["boon", "temporary"],
  },

  boon_social: {
    name: "joyful",
    description: "Never seems to be down",
    slave_value: 0,
    skill_bonuses: { social: Constants.TRAIT_BOON_EFFECT },
    tags: ["boon", "temporary"],
  },

  boon_aid: {
    name: "blessed",
    description: "Blessed by some higher plane",
    slave_value: 0,
    skill_bonuses: { aid: Constants.TRAIT_BOON_EFFECT },
    tags: ["boon", "temporary"],
  },

  boon_arcane: {
    name: "focused",
    description: "Mind on one task",
    slave_value: 0,
    skill_bonuses: { arcane: Constants.TRAIT_BOON_EFFECT },
    tags: ["boon", "temporary"],
  },

  boon_sex: {
    name: "passionate",
    description: "Express yourself",
    slave_value: 0,
    skill_bonuses: { sex: Constants.TRAIT_BOON_EFFECT },
    tags: ["boon", "temporary"],
  },
} satisfies TraitOrGroupDefinitions;
