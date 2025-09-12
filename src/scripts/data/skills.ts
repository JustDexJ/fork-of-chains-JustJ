import { SkillDefinition } from "../classes/Skill";

export const SKILL_DEFINITIONS = definitions<SkillDefinition>()({
  combat: {
    name: "Combat",
    color: "#ff0000",
    description:
      "The skill of fighting other humanlikes. " +
      "Helpful on missions where you are expected to fight other humanlikes.",
  },
  brawn: {
    name: "Brawn",
    color: "#ff6600",
    description:
      "The measure of physical strength. " +
      "Helpful on missions requiring physical feats, and also helps combat to some extent.",
  },
  survival: {
    name: "Survival",
    color: "#03ff00",
    description:
      "Skills for surviving, navigating, and conquering the wilds. " +
      "Helpful for scouting missions, as well as missions that venture far into the wilds.",
  },
  intrigue: {
    name: "Intrigue",
    color: "#8a6f91",
    description:
      "The art of planning, scheming, and manipulating the stage from the shadows. " +
      "Helpful for missions involving stealth, subterfuge, and infiltrations.",
  },
  slaving: {
    name: "Slaving",
    color: "#b3b3b3",
    description:
      "The skill of efficiently breaking slaves. " +
      "Helpful for training slaves.",
  },
  knowledge: {
    name: "Knowledge",
    color: "#03ffff",
    description:
      "The understanding of the world. " +
      "Helpful for most missions, as well as missions requiring expert knowledge.",
  },
  social: {
    name: "Social",
    color: "#5f8dd3",
    description:
      "The skill of manipulating others into doing your bidding with words. " +
      "Helpful for diplomacy missions, as well as missions involving negotiations.",
  },
  aid: {
    name: "Aid",
    color: "#e9afaf",
    description:
      "The skill of healing and restoring spirit. " +
      "Helpful for rescue as well as missions involving long rounds of combat.",
  },
  arcane: {
    name: "Arcane",
    color: "#ff00ff",
    description:
      "The understanding of the otherworldly. " +
      "Helpful for mysterious missions.",
  },
  sex: {
    name: "Sex",
    color: "#ffff00",
    description:
      "The ancient art of sex. " +
      "Helpful for sexual missions, as well as training slaves to some extent.",
  },
});
