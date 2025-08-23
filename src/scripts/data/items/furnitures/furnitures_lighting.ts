import type { FurnitureDefinition } from "../../../classes/furniture/Furniture";

export default definitions<FurnitureDefinition>()({
  f_lighting_none: {
    name: "candle",
    description: "Some candles to dimly light the room",
    value: 0,
    slot: "lighting",
    tags: ["basic"],
    skillmods: {},
    texts: {
      ambience: ["the a|rep tries its best to light up the room"],
      bedchamber:
        "It is not very bright, and perhaps a better lighting would be much nicer.",
    },
  },

  f_lighting_normal: {
    name: "candlestick",
    description: "Tall candlesticks illuminate the room",
    value: "FURNITURE_PRICE_NORMAL",
    slot: "lighting",
    tags: ["normal"],
    skillmods: {
      survival: "FURNITURE_SKILL_NORMAL",
    },
    texts: {
      ambience: ["the a|rep continues to light the room"],
      bedchamber:
        "It sufficiently lights up the room allowing the slaves to be used day and night.",
    },
  },

  f_lighting_good: {
    name: "chandelier",
    description:
      "Large chandelier of elven design that can hang from the ceiling",
    value: "FURNITURE_PRICE_GOOD",
    slot: "lighting",
    tags: ["good"],
    skillmods: {
      survival: "FURNITURE_SKILL_GOOD",
    },
    texts: {
      ambience: ["the a|rep hanging from above enhances the atmosphere"],
      bedchamber:
        "The elven chandelier hangs beautifully from the top, illuminating the room, and also double as a place to hang the slaves from.",
    },
  },

  f_lighting_master: {
    name: "PLACEHOLDER lighting master title",
    description: "PLACEHOLDER lighting master description",
    value: "FURNITURE_PRICE_MASTER",
    slot: "lighting",
    tags: ["master"],
    skillmods: {
      survival: "FURNITURE_SKILL_MASTER",
    },
    texts: {},
  },

  f_lighting_good_slaver: {
    name: "magical candlestick",
    description:
      "An enchanted candlestick given by one of your magical-oriented slavers. It burns perpetually with a slight reddish color",
    value: "FURNITURE_PRICE_GOOD",
    slot: "lighting",
    tags: ["good"],
    skillmods: {
      slaving: 1,
      survival: "FURNITURE_SKILL_NORMAL",
    },
    texts: {
      ambience: [
        "the a|rep continues to burn brightly, tinting the room slightly red",
      ],
      bedchamber:
        "It emits a reddish glow, tinting the entire room in a lustful shade of red.",
    },
  },
});
