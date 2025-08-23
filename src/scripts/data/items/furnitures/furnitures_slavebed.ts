import type { FurnitureDefinition } from "../../../classes/furniture/Furniture";

export default definitions<FurnitureDefinition>()({
  f_slavebed_none: {
    name: "floor",
    description: "Sleep on the floor",
    value: 0,
    slot: "slavebed",
    tags: ["basic"],
    skillmods: {},
    texts: {
      bedchamber:
        "If you are feeling generous, you can replace it with something nicer.",
    },
  },

  f_slavebed_normal: {
    name: "iron cages",
    description: "Iron cages to keep your slaves comfortable inside",
    value: "FURNITURE_PRICE_NORMAL",
    slot: "slavebed",
    tags: ["normal"],
    skillmods: {
      intrigue: "FURNITURE_SKILL_NORMAL",
    },
    texts: {
      bedchamber: "The slaves are locked inside every night.",
    },
  },

  f_slavebed_good: {
    name: "gilded cages",
    description: "Gilded cages to keep and showcase your slaves inside",
    value: "FURNITURE_PRICE_GOOD",
    slot: "slavebed",
    tags: ["good"],
    skillmods: {
      intrigue: "FURNITURE_SKILL_GOOD",
    },
    texts: {
      bedchamber:
        "As nice as the cages are, the slaves are still confined inside every night.",
    },
  },

  f_slavebed_master: {
    name: "morphing cages",
    description:
      "A magical cage who can be shaped, distorted, and modeled by imbuing it with magic",
    value: "FURNITURE_PRICE_MASTER",
    slot: "slavebed",
    tags: ["master"],
    skillmods: {
      intrigue: "FURNITURE_SKILL_MASTER",
    },
    texts: {
      bedchamber:
        "The cages change shape every night, in such a way that forces the slave to spend the night while training their posture.",
    },
  },

  f_slavebed_good_slaver: {
    name: "bondage cage",
    description:
      "An iron cage equipped with slots to secure the slave's limbs and neck, for maximum bondage.",
    value: "FURNITURE_PRICE_GOOD",
    slot: "slavebed",
    tags: ["good"],
    skillmods: {
      slaving: 1,
      intrigue: "FURNITURE_SKILL_NORMAL",
    },
    texts: {
      bedchamber:
        "When the slaves are in need of punishment, their limbs can be further secured inside the cage at night, forcing them in a doggy-style position all night long.",
    },
  },
});
