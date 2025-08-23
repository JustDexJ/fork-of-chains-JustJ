import type { FurnitureDefinition } from "../../../classes/furniture/Furniture";

export default definitions<FurnitureDefinition>()({
  f_foodtray_none: {
    name: "floor",
    description: "Eat from the floor",
    value: 0,
    slot: "foodtray",
    tags: ["basic"],
    skillmods: {},
    texts: {
      bedchamber:
        "Perhaps you can find a more proper place for the slaves to eat.",
    },
  },

  f_foodtray_normal: {
    name: "pet food tray",
    description: "Doggy bowl for your slaves to eat from",
    value: "FURNITURE_PRICE_NORMAL",
    slot: "foodtray",
    tags: ["normal"],
    skillmods: {
      knowledge: "FURNITURE_SKILL_NORMAL",
    },
    texts: {
      ambience: ["the remains of food in the a|rep is blown away by the wind"],
      bedchamber:
        "Some of your slavers find it cute to watch slaves eating from their doggy bowls.",
    },
  },

  f_foodtray_good: {
    name: "gilded pet food tray",
    description: "Luxurious-looking doggy bowl for your slaves to eat from",
    value: "FURNITURE_PRICE_GOOD",
    slot: "foodtray",
    tags: ["good"],
    skillmods: {
      knowledge: "FURNITURE_SKILL_GOOD",
    },
    texts: {
      ambience: ["the remains of food in the a|rep is blown away by the wind"],
      bedchamber:
        "The slaves are taught to slurp whatever food is in their bowl clean lest they face punishment.",
    },
  },

  f_foodtray_master: {
    name: "PLACEHOLDER foodtray master title",
    description: "PLACEHOLDER foodtray master description",
    value: "FURNITURE_PRICE_MASTER",
    slot: "foodtray",
    tags: ["master"],
    skillmods: {
      knowledge: "FURNITURE_SKILL_MASTER",
    },
    texts: {},
  },

  f_foodtray_normal_hermit: {
    name: "wooden food bowl of wizardry",
    description:
      "An ordinary and worn-out food bowl, given to you by the infamous Hermit of the Crags. \
   No matter which angle you see it from, it looks nothing more than a worthless food bowl, \
   but every now and then it glows purple with strange magic",
    value: 100,
    slot: "foodtray",
    tags: ["normal"],
    skillmods: {
      knowledge: "FURNITURE_SKILL_NORMAL",
      arcane: 1,
    },
    texts: {
      ambience: [
        "the a|rep glows purple out of the sudden, before returning to its usual decrepit-looking color",
      ],
      bedchamber:
        "The wooden bowl looks old and decrepit, making it only slightly better for the slaves to eat from compared to the floor. It occasionally glows an unnerving dim purple glow when the lights are out.",
    },
  },
});
