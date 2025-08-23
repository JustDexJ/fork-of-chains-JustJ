import type { FurnitureDefinition } from "../../../classes/furniture/Furniture";

export default definitions<FurnitureDefinition>()({
  f_slaverbed_none: {
    name: "bedroll",
    description: "A worn-out bedroll",
    value: 0,
    slot: "slaverbed",
    tags: ["basic"],
    skillmods: {},
    texts: {
      bedchamber:
        "It is rather shoddy --- perhaps a better bed would be much better.",
    },
  },

  f_slaverbed_normal: {
    name: "wooden bed",
    description: "Sturdy but cheap wooden bed",
    value: "FURNITURE_PRICE_NORMAL",
    slot: "slaverbed",
    tags: ["normal"],
    skillmods: {
      sex: "FURNITURE_SKILL_NORMAL",
    },
    texts: {
      bedchamber: "The wooden bed is sturdy enough to withstand most uses.",
    },
  },

  f_slaverbed_good: {
    name: "luxurious bed",
    description: "A luxurious double bed complete with a canopy",
    value: "FURNITURE_PRICE_GOOD",
    slot: "slaverbed",
    tags: ["good"],
    skillmods: {
      sex: "FURNITURE_SKILL_GOOD",
    },
    texts: {
      bedchamber: "The luxurious bed commands attention.",
    },
  },

  f_slaverbed_master: {
    name: "Silver Wolf Bed",
    description:
      "An extremely luxurious canopy bed decorated masterfully with beautiful and exotic animal furs",
    value: "FURNITURE_PRICE_MASTER",
    slot: "slaverbed",
    tags: ["master"],
    skillmods: {
      sex: "FURNITURE_SKILL_MASTER",
    },
    texts: {
      ambience: ["the furs decorating the a|rep sway with the wind"],
      bedchamber:
        "The grand tribally-decorated canopy bed sets the posh mood of the room.",
    },
  },

  f_slaverbed_other_dungeons_bench: {
    name: "bench",
    description: "A hard bench in the dungeons cell",
    value: 0,
    slot: "slaverbed",
    tags: ["unobtainable"],
    skillmods: {},
    texts: {
      bedchamber: "The bench is hard and unremarkable.",
    },
  },
});
