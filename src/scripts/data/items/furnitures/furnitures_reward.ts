import type { FurnitureDefinition } from "../../../classes/furniture/Furniture";

export default definitions<FurnitureDefinition>()({
  f_reward_none: {
    name: "nothing",
    description: "Pets for your pets!",
    value: 0,
    slot: "reward",
    tags: ["basic"],
    skillmods: {},
    texts: {
      bedchamber:
        "They should focus all their attention servicing you instead.",
    },
  },

  f_reward_normal: {
    name: "ball",
    description:
      "A small ball your slaves can play with when their owners are not around",
    value: "FURNITURE_PRICE_NORMAL",
    slot: "reward",
    tags: ["normal"],
    skillmods: {
      aid: "FURNITURE_SKILL_NORMAL",
    },
    texts: {
      ambience: ["the a|rep rolls over slightly from the wind"],
      bedchamber: "The slaves can be taught to play fetch with the ball.",
    },
  },

  f_reward_good: {
    name: "[UNOBTAINABLE] climbing platform",
    description:
      "A monkey climbing platform for your slaves to amuse themselves when their owners are not around",
    value: "FURNITURE_PRICE_GOOD",
    slot: "reward",
    tags: ["good"],
    skillmods: {
      aid: "FURNITURE_SKILL_GOOD",
    },
    texts: {
      ambience: ["the well-used a|rep is abandoned for once"],
      bedchamber:
        "The climbing wall is perfect for the pets living in the room.",
    },
  },

  f_reward_master: {
    name: "PLACEHOLDER reward master title",
    description: "PLACEHOLDER reward master description",
    value: "FURNITURE_PRICE_MASTER",
    slot: "reward",
    tags: ["master"],
    skillmods: {
      aid: "FURNITURE_SKILL_MASTER",
    },
    texts: {},
  },

  f_reward_other_indoor_garden: {
    name: "indoor garden",
    description: "A beautiful exotic indoor garden",
    value: 0,
    slot: "reward",
    tags: ["unobtainable"],
    skillmods: {},
    texts: {
      ambience: [
        "sunlight shines brightly from the glass roof down into the small a|rep",
        `the a|rep adds a refreshing smell, washing away the rigid smell of sex`,
      ],
      bedchamber:
        "It is quite beautiful to look at, especially when the sun is shining down on it.",
    },
  },
});
