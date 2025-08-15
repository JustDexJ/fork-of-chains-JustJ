export const initSkills = () => {
  new setup.Skill(
    "combat",
    "Combat",
    "The skill of fighting other humanlikes. " +
      "Helpful on missions where you are expected to fight other humanlikes.",
  );
  new setup.Skill(
    "brawn",
    "Brawn",
    "The measure of physical strength. " +
      "Helpful on missions requiring physical feats, and also helps combat to some extent.",
  );
  new setup.Skill(
    "survival",
    "Survival",
    "Skills for surviving, navigating, and conquering the wilds. " +
      "Helpful for scouting missions, as well as missions that venture far into the wilds.",
  );
  new setup.Skill(
    "intrigue",
    "Intrigue",
    "The art of planning, scheming, and manipulating the stage from the shadows. " +
      "Helpful for missions involving stealth, subterfuge, and infiltrations.",
  );
  new setup.Skill(
    "slaving",
    "Slaving",
    "The skill of efficiently breaking slaves. " +
      "Helpful for training slaves.",
  );
  /* 5-9 */

  new setup.Skill(
    "knowledge",
    "Knowledge",
    "The understanding of the world. " +
      "Helpful for most missions, as well as missions requiring expert knowledge.",
  );
  new setup.Skill(
    "social",
    "Social",
    "The skill of manipulating others into doing your bidding with words. " +
      "Helpful for diplomacy missions, as well as missions involving negotiations.",
  );
  new setup.Skill(
    "aid",
    "Aid",
    "The skill of healing and restoring spirit. " +
      "Helpful for rescue as well as missions involving long rounds of combat.",
  );
  new setup.Skill(
    "arcane",
    "Arcane",
    "The understanding of the otherworldly. " +
      "Helpful for mysterious missions.",
  );
  new setup.Skill(
    "sex",
    "Sex",
    "The ancient art of sex. " +
      "Helpful for sexual missions, as well as training slaves to some extent.",
  );
};
