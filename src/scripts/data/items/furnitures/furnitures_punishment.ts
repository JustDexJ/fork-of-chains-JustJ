import type { FurnitureDefinition } from "../../../classes/furniture/Furniture";

export default definitions<FurnitureDefinition>()({
  f_punishment_none: {
    name: "nothing",
    description: "Spanks for naughty slaves!",
    value: 0,
    slot: "punishment",
    tags: ["basic"],
    skillmods: {},
    texts: {
      bedchamber:
        "The slave will be continuously spanked until their rear form a delicious red. Perhaps you could buy a tool to make the job easier.",
    },
  },

  f_punishment_normal: {
    name: "whip",
    description: "A worn-out whip for inflicting discipline on slaves",
    value: "FURNITURE_PRICE_NORMAL",
    slot: "punishment",
    tags: ["normal"],
    skillmods: {
      slaving: "FURNITURE_SKILL_NORMAL",
    },
    texts: {
      ambience: ["the a|rep is forgotten and not used for once"],
      bedchamber:
        "Secured and tied, the slave will be mercilessly whipped until they learn from their mistake.",
    },
  },

  f_punishment_good: {
    name: "cross",
    description:
      "A large cross to secure your slaves for a good session of bondage",
    value: "FURNITURE_PRICE_GOOD",
    slot: "punishment",
    tags: ["good"],
    skillmods: {
      slaving: "FURNITURE_SKILL_GOOD",
    },
    texts: {
      ambience: [
        "the a|rep watches over, as if remembering all the time slaves were tied up on it",
      ],
      bedchamber:
        "Secured on the cross, the slave will be tormented until they learn from their mistake.",
    },
  },

  f_punishment_master: {
    name: "PLACEHOLDER punishment master title",
    description: "PLACEHOLDER punishment master description",
    value: "FURNITURE_PRICE_MASTER",
    slot: "punishment",
    tags: ["master"],
    skillmods: {
      slaving: "FURNITURE_SKILL_MASTER",
    },
    texts: {},
  },

  f_punishment_good_slaver: {
    name: "Fetters with Pulleys",
    description:
      "A pulley contraption connected to a pair of fetters hanging from the ceiling, where slaves can be hanged upside down for punishment.",
    value: "FURNITURE_PRICE_GOOD",
    slot: "punishment",
    tags: ["good", "upsidedown"],
    skillmods: {
      knowledge: 1,
      slaving: "FURNITURE_SKILL_NORMAL",
    },
    texts: {
      ambience: [
        "the fetters hanging from the ceiling makes a rattling noise as wind blew on the ropes connected to them",
      ],
      bedchamber:
        "The fetters are connected via a series of rope to a pulley down, and can be used to hang a slave upside-down from the ceiling.",
    },
  },

  f_punishment_none_dungeons: {
    name: "ceiling restraints",
    description: "A set of manacles hanging from the ceiling",
    value: 0,
    slot: "punishment",
    tags: ["normal", "upsidedown"],
    skillmods: {},
    texts: {
      bedchamber: "",
    },
  },
});
