import { SkillDefinition } from "../classes/Skill";

export const SKILL_DEFINITIONS = typedObject<SkillDefinition>()({
  combat: {
    keyword: "combat",
    name: "Combat",
    description:
      "The skill of fighting other humanlikes. " +
      "Helpful on missions where you are expected to fight other humanlikes.",
  },
  brawn: {
    keyword: "brawn",
    name: "Brawn",
    description:
      "The measure of physical strength. " +
      "Helpful on missions requiring physical feats, and also helps combat to some extent.",
  },
  survival: {
    keyword: "survival",
    name: "Survival",
    description:
      "Skills for surviving, navigating, and conquering the wilds. " +
      "Helpful for scouting missions, as well as missions that venture far into the wilds.",
  },
  intrigue: {
    keyword: "intrigue",
    name: "Intrigue",
    description:
      "The art of planning, scheming, and manipulating the stage from the shadows. " +
      "Helpful for missions involving stealth, subterfuge, and infiltrations.",
  },
  slaving: {
    keyword: "slaving",
    name: "Slaving",
    description:
      "The skill of efficiently breaking slaves. " +
      "Helpful for training slaves.",
  },
  /* 5-9 */

  knowledge: {
    keyword: "knowledge",
    name: "Knowledge",
    description:
      "The understanding of the world. " +
      "Helpful for most missions, as well as missions requiring expert knowledge.",
  },
  social: {
    keyword: "social",
    name: "Social",
    description:
      "The skill of manipulating others into doing your bidding with words. " +
      "Helpful for diplomacy missions, as well as missions involving negotiations.",
  },
  aid: {
    keyword: "aid",
    name: "Aid",
    description:
      "The skill of healing and restoring spirit. " +
      "Helpful for rescue as well as missions involving long rounds of combat.",
  },
  arcane: {
    keyword: "arcane",
    name: "Arcane",
    description:
      "The understanding of the otherworldly. " +
      "Helpful for mysterious missions.",
  },
  sex: {
    keyword: "sex",
    name: "Sex",
    description:
      "The ancient art of sex. " +
      "Helpful for sexual missions, as well as training slaves to some extent.",
  },
});
