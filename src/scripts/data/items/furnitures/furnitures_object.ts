import type { FurnitureDefinition } from "../../../classes/furniture/Furniture";
import { Constants } from "../../../constants";

export default definitions<FurnitureDefinition>()({
  f_object_none: {
    name: "old end table",
    description:
      "Old decrepit end table you found abandoned in the fort. Ugly, but at least it's functional",
    value: 0,
    slot: "object",
    tags: ["basic"],
    skillmods: {},
    texts: {
      bedchamber: "Some statues would do wonder for the room.",
    },
  },

  f_object_normal: {
    name: "statue",
    description: "A non-descript statue that barely looks beautiful",
    value: "FURNITURE_PRICE_NORMAL",
    slot: "object",
    tags: ["normal"],
    skillmods: {
      brawn: "FURNITURE_SKILL_NORMAL",
    },
    texts: {
      ambience: ["the a|rep watches over with its stony eyes"],
      bedchamber:
        "The statue casts an eerie gaze on your slaves their owner is not in the room.",
    },
  },

  f_object_good: {
    name: "[UNOBTAINABLE] exotic statue",
    description: "An exotic statue of an incredibly sexy humanified god",
    value: "FURNITURE_PRICE_GOOD",
    slot: "object",
    tags: ["good"],
    skillmods: {
      brawn: "FURNITURE_SKILL_GOOD",
    },
    texts: {
      ambience: [
        "the a|rep watches sexily with its stony eyes, adding to the exoticism",
      ],
      bedchamber:
        "The statue is a work of art, greatly increasing the appeal of the room.",
    },
  },

  f_object_master: {
    name: "PLACEHOLDER object master title",
    description: "PLACEHOLDER object master description",
    value: "FURNITURE_PRICE_MASTER",
    slot: "object",
    tags: ["master"],
    skillmods: {
      brawn: "FURNITURE_SKILL_MASTER",
    },
    texts: {},
  },

  f_object_master_tigerkinstatuemale: {
    name: "Male Tigerkin Statue",
    description:
      'A living statue of a male ancient tigerkin, mounted eternally on an anal pole. Its dick is kept painfully hard by ancient magic, leaking precum every now and then. Unlocks "Statue Spitroast" sex action',
    value: "FURNITURE_PRICE_MASTER",
    slot: "object",
    tags: ["master"],
    skillmods: {
      brawn: "FURNITURE_SKILL_MASTER",
    },
    texts: {
      ambience: [
        "the dick of the a|rep leaks precum",
        `the dick of the a|rep continues to stand proudly erect`,
      ],
      bedchamber:
        "The statue's dick continues to stand proudly erect, leaking a slight amount of precum.",
    },
  },

  f_object_master_tigerkinstatuefemale: {
    name: "Female Tigerkin Statue",
    description:
      'A living statue of a female ancient tigerkin, mounted eternally on an anal pole. Its pussy is kept deliciously wet by ancient magic, leaking girlcum every now and then. Unlocks "Statue Spitroast" sex action',
    value: "FURNITURE_PRICE_MASTER",
    slot: "object",
    tags: ["master"],
    skillmods: {
      brawn: "FURNITURE_SKILL_MASTER",
    },
    texts: {
      ambience: [
        "the pussy of the a|rep leaks girlcum",
        `the pussy of the a|rep continues to permanently wet itself`,
      ],
      bedchamber:
        "The statue's pussy is permanently wet, leaking a slight amount of girlcum.",
    },
  },

  f_object_master_fuckmachine: {
    name: "Fuckmachine",
    description:
      "A protruding stick ending up with a large dildo with a solid box base. The box is powered by magic to move the lewd dildo up and down. Unlocks a new interaction with anally-trained slaves in the same bedchamber",
    value: "FURNITURE_PRICE_MASTER",
    slot: "object",
    tags: ["master"],
    skillmods: {
      brawn: Constants.FURNITURE_SKILL_MASTER - 1,
      sex: 1,
    },
    texts: {
      ambience: [
        "the a|rep lies motionlessly for once",
        `the a|rep's dildo stands motionless`,
      ],
      bedchamber:
        "It is still right now, but you know that with the right stimulus the large dildo sticking out of it can be made to move deliciously inside a slave's body.",
    },
  },

  f_object_master_pole: {
    name: "Pole",
    description:
      "CURRENTLY UNOBTAINABLE. A tall silver pole arresting the attention of anyone who happens upon it. An obedient and <<rep setup.trait.skill_entertain>>, <<rep setup.trait.bg_entertainer>>, or <<rep setup.trait.bg_courtesan>> slave might be able to use it to its full potential...",
    value: "FURNITURE_PRICE_MASTER",
    slot: "object",
    tags: ["master"],
    skillmods: {
      brawn: Constants.FURNITURE_SKILL_MASTER - 1,
      intrigue: 1,
    },
    texts: {
      ambience: ["the a|rep is left abandoned in the room"],
      bedchamber: "The silver pole in the room draws attention to it.",
    },
  },

  f_object_good_slaver: {
    name: "company history ledger",
    description:
      "A bookshelf containing several volumes of your company's history, written by a scholastic slavver under your employ",
    value: "FURNITURE_PRICE_GOOD",
    slot: "object",
    tags: ["good"],
    skillmods: {
      slaving: 1,
      brawn: "FURNITURE_SKILL_NORMAL",
    },
    texts: {
      ambience: [
        "the a|rep stand still, as if questioning whether to write the current events into future ledgers",
      ],
      bedchamber:
        "The bookshelf distracts from the debauched nature of the room, offering a glimpse of your company's history instead.",
    },
  },

  f_object_good_livingstatuemale: {
    name: "Male Living Statue",
    description:
      "A living statue of a male, covered in gooey rubber, a victim of the desert tentacle monster. Its dick is kept painfully hard by the goo, and it is fed and sustained by its covering",
    value: "FURNITURE_PRICE_GOOD",
    slot: "object",
    tags: ["good"],
    skillmods: {
      knowledge: 1,
      brawn: "FURNITURE_SKILL_NORMAL",
    },
    texts: {
      ambience: [
        "the a|rep stares blankly, dick kept rock hard by its gooey covering",
        "the eyes of a|rep stares blankly at the unfolding scene, his mind already lost long, long time ago",
      ],
      bedchamber:
        "The statue houses a male specimen that was once enslaved by a certain tentacle aberration in the eastern deserts",
    },
  },

  f_object_good_livingstatuefemale: {
    name: "Female Living Statue",
    description:
      "A living statue of a female, covered in gooey rubber, a victim of the desert tentacle monster. Its pussy is kept painfully open and gaping by the goo, and it is fed and sustained by its covering",
    value: "FURNITURE_PRICE_GOOD",
    slot: "object",
    tags: ["good"],
    skillmods: {
      knowledge: 1,
      brawn: "FURNITURE_SKILL_NORMAL",
    },
    texts: {
      ambience: [
        "the a|rep stares blankly, pussy kept open by its gooey covering, welcoming penetration",
        "the eyes of a|rep stares blankly at the unfolding scene, her mind already lost long, long time ago",
      ],
      bedchamber:
        "The statue houses a female specimen that was once enslaved by a certain tentacle aberration in the eastern deserts",
    },
  },
});
