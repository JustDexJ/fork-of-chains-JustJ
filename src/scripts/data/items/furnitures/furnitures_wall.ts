import type { FurnitureDefinition } from "../../../classes/furniture/Furniture";

export default definitions<FurnitureDefinition>()({
  f_wall_none: {
    name: "wall",
    description: "The walls are unevenly painted",
    value: 0,
    slot: "wall",
    tags: ["basic"],
    skillmods: {},
    texts: {
      bedchamber:
        "Perhaps something could help cover the worn-outness of the walls.",
    },
  },

  f_wall_normal: {
    name: "painting",
    description: "Some paintings bought for cheap in the <<lore region_city>>",
    value: "FURNITURE_PRICE_NORMAL",
    slot: "wall",
    tags: ["normal"],
    skillmods: {
      arcane: "FURNITURE_SKILL_NORMAL",
    },
    texts: {
      ambience: ["the man in the a|painting eyes the sex menacingly"],
      bedchamber:
        "The cheap painting does its job well enough diverting attention from the worn-down areas of the walls.",
    },
  },

  f_wall_good: {
    name: "[UNOBTAINABLE] exotic painting",
    description: "Beautiful paintings of various natural sceneries",
    value: "FURNITURE_PRICE_GOOD",
    slot: "wall",
    tags: ["good"],
    skillmods: {
      arcane: "FURNITURE_SKILL_GOOD",
    },
    texts: {
      ambience: [
        "the exotic painting makes for quite a backdrop in the background of the ensuing debauchery",
      ],
      bedchamber:
        "The beautiful painting lifts the spirit of anyone who gaze upon it.",
    },
  },

  f_wall_master: {
    name: "PLACEHOLDER wall master title",
    description: "PLACEHOLDER wall master description",
    value: "FURNITURE_PRICE_MASTER",
    slot: "wall",
    tags: ["master"],
    skillmods: {
      arcane: "FURNITURE_SKILL_MASTER",
    },
    texts: {},
  },

  f_wall_good_slaver: {
    name: "painting of your company",
    description:
      "A painting of your company, drawn by one of your more artistic slavers",
    value: "FURNITURE_PRICE_GOOD",
    slot: "wall",
    tags: ["good"],
    skillmods: {
      slaving: 1,
      arcane: "FURNITURE_SKILL_NORMAL",
    },
    texts: {
      ambience: [
        "your figure inside the a|rep watches over the ensuing debauchery",
      ],
      bedchamber:
        "A figure much to your liking is painted on it too, alongside some of the slavers you are very familiar with.",
    },
  },

  f_wall_good_merchant_revenge_watersport: {
    name: "A Piss Slut's Lunch",
    description: "A painting of a bound piss slut. Painted by Leopold Pavo",
    value: "FURNITURE_PRICE_GOOD",
    slot: "wall",
    tags: ["good"],
    skillmods: {
      sex: 1,
      arcane: "FURNITURE_SKILL_NORMAL",
    },
    texts: {
      ambience: [
        "the painting of a thirsty piss slut on the wall inspires you into further acts of debauchery",
      ],
      bedchamber:
        "A soaked, degraded noble kneels bound in a puddle of cooling piss. They are blindfolded, a funnel gag lodged in their mouth and have the words 'All Loads Taken' is inked across their forehead. This commemorative painting by Leopold Pavo captures an unexpected turn of events at a Lucgate Merchant luncheon.",
    },
  },

  f_wall_good_merchant_revenge_master: {
    name: "A Merchant's Luncheon",
    description:
      "A painting of a lusty slut, bound on a banquet table. Painted by Leopold Pavo",
    value: "FURNITURE_PRICE_MASTER",
    slot: "wall",
    tags: ["master"],
    skillmods: {
      sex: 1,
      arcane: "FURNITURE_SKILL_GOOD",
    },
    texts: {
      ambience: [
        "the painting of a needy slut who is begging to be filled urges you on to further acts of debauchery",
      ],
      bedchamber:
        "A lust addled noble lies bound on a banquet table, back arched and mouth open as they beg to be used. Merchants, nobility and the cream of Toran society stand around in shock, outrage, and barely concealed arousal. This commemorative painting by Leopold Pavo captures an unexpected turn of events at a Lucgate Merchant luncheon - and part of the revenge plotting of a particular Merchant friend of yours.",
    },
  },
});
