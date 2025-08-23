import type { FurnitureDefinition } from "../../../classes/furniture/Furniture";

export default definitions<FurnitureDefinition>()({
  f_tile_none: {
    name: "floor",
    description: "Dirty floor with nothing covering it",
    value: 0,
    slot: "tile",
    tags: ["basic"],
    skillmods: {},
    texts: {
      ambience: [
        "the dirty floor is waiting for more questionable stain to be spilled all over it",
      ],
      bedchamber:
        "Perhaps it would be nicer if there are something to cover the cracks and dust on the floor.",
    },
  },

  f_tile_normal: {
    name: "rug",
    description: "Some cheap-looking rug keeping the floor nice and tidy",
    value: "FURNITURE_PRICE_NORMAL",
    slot: "tile",
    tags: ["normal"],
    skillmods: {
      combat: "FURNITURE_SKILL_NORMAL",
    },
    texts: {
      ambience: ["the a|rep hides the dirty floor underneath"],
      bedchamber:
        "The rug makes a great place for the slaves to play rough at.",
    },
  },

  f_tile_good: {
    name: "plush rug",
    description: "Plush rug that makes for a beautiful decoration",
    value: "FURNITURE_PRICE_GOOD",
    slot: "tile",
    tags: ["good"],
    skillmods: {
      combat: "FURNITURE_SKILL_GOOD",
    },
    texts: {
      ambience: ["the a|rep looks almost out of place in the degeneracy"],
      bedchamber: "The beautiful rug lifts the overall beauty of the room.",
    },
  },

  f_tile_master: {
    name: "PLACEHOLDER tile master title",
    description: "PLACEHOLDER tile master description",
    value: "FURNITURE_PRICE_MASTER",
    slot: "tile",
    tags: ["master"],
    skillmods: {
      combat: "FURNITURE_SKILL_MASTER",
    },
    texts: {},
  },

  f_tile_good_slaver: {
    name: "company rug",
    description: "A rug embroided with the logo of your company",
    value: "FURNITURE_PRICE_GOOD",
    slot: "tile",
    tags: ["good"],
    skillmods: {
      slaving: 1,
      combat: "FURNITURE_SKILL_NORMAL",
    },
    texts: {
      ambience: [
        "the a|rep draws attention to the logo of your company embroided on it",
      ],
      bedchamber: "Your company logo is proudly embroided on it.",
    },
  },
});
