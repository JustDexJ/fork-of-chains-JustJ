import { qres } from "../../_init/preinit_costrestrictions";
import type { EquipmentDefinition } from "../../classes/equipment/Equipment";
import { EquipmentPoolDefinition } from "../../classes/equipment/EquipmentPool";
import { Constants } from "../../constants";

export default {
  equipmentpools: definitions<EquipmentPoolDefinition>()({
    intrigue: {
      chances: {
        intrigue_neck: 1,
        intrigue_legs: 1,
        intrigue_mouth: 1,
        intrigue_feet: 1,
        intrigue_eyes: 1,
      },
    },

    intrigue_good: {
      chances: {
        intrigue_neck_good: 1,
        intrigue_legs_good: 1,
        intrigue_mouth_good: 1,
        intrigue_feet_good: 1,
        intrigue_eyes_good: 1,
      },
    },
  }),
  equipments: definitions<EquipmentDefinition>()({
    intrigue_neck: {
      name: "Thief Cloak",
      slot: "neck",
      tags: ["clothes"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 0,
      skillmods: { intrigue: Constants.EQUIPMENT_STAT_BOOST_NORMAL },
      traits: {},
      restrictions: [],
      icon: {
        /* image: 'TBD' */
      },
      texts: {
        description: "",
        flavor: "",
      },
    },

    intrigue_legs: {
      name: "Thief Trousers",
      slot: "legs",
      tags: ["clothes", "covering"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 0,
      skillmods: { intrigue: Constants.EQUIPMENT_STAT_BOOST_NORMAL },
      traits: {},
      restrictions: [],
      icon: {
        /* image: 'TBD' */
      },
      texts: {
        description: "",
        flavor: "",
      },
    },

    intrigue_feet: {
      name: "Thief Shoes",
      slot: "feet",
      tags: ["clothes", "covering"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 0,
      skillmods: { intrigue: Constants.EQUIPMENT_STAT_BOOST_NORMAL },
      traits: {},
      restrictions: [],
      icon: {
        /* image: 'TBD' */
      },
      texts: {
        description: "",
        flavor: "",
      },
    },

    intrigue_mouth: {
      name: "Thief Bandana",
      slot: "mouth",
      tags: ["accessory", "mouthcover"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 0,
      skillmods: { intrigue: Constants.EQUIPMENT_STAT_BOOST_NORMAL },
      traits: {},
      restrictions: [],
      icon: {
        /* image: 'TBD' */
      },
      texts: {
        description: "",
        flavor: "",
      },
    },

    intrigue_eyes: {
      name: "Thief Mask",
      slot: "eyes",
      tags: ["accessory", "eyemask"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 0,
      skillmods: { intrigue: Constants.EQUIPMENT_STAT_BOOST_NORMAL },
      traits: {},
      restrictions: [],
      icon: { image: "eyes_mask" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    intrigue_neck_good: {
      name: "Ninja Cloak",
      slot: "neck",
      tags: ["clothes"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 0,
      skillmods: { intrigue: Constants.EQUIPMENT_STAT_BOOST_GOOD },
      traits: {},
      restrictions: [],
      icon: {
        /* image: 'TBD' */
      },
      texts: {
        description: "",
        flavor: "",
      },
    },

    intrigue_legs_good: {
      name: "Ninja Trousers",
      slot: "legs",
      tags: ["clothes", "covering"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 0,
      skillmods: { intrigue: Constants.EQUIPMENT_STAT_BOOST_GOOD },
      traits: {},
      restrictions: [],
      icon: {
        /* image: 'TBD' */
      },
      texts: {
        description: "",
        flavor: "",
      },
    },

    intrigue_feet_good: {
      name: "Ninja Slippers",
      slot: "feet",
      tags: ["clothes", "covering"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 0,
      skillmods: { intrigue: Constants.EQUIPMENT_STAT_BOOST_GOOD },
      traits: {},
      restrictions: [],
      icon: {
        /* image: 'TBD' */
      },
      texts: {
        description: "",
        flavor: "",
      },
    },

    intrigue_mouth_good: {
      name: "Ninja Bandana",
      slot: "mouth",
      tags: ["accessory", "mouthcover"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 0,
      skillmods: { intrigue: Constants.EQUIPMENT_STAT_BOOST_GOOD },
      traits: {},
      restrictions: [],
      icon: {
        /* image: 'TBD' */
      },
      texts: {
        description: "",
        flavor: "",
      },
    },

    intrigue_eyes_good: {
      name: "Ninja Mask",
      slot: "eyes",
      tags: ["accessory", "eyemask"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 0,
      skillmods: { intrigue: Constants.EQUIPMENT_STAT_BOOST_GOOD },
      traits: {},
      restrictions: [],
      icon: { image: "eyes_mask" },
      texts: {
        description: "",
        flavor: "",
      },
    },
    intrigue_eyes_master: {
      name: "Mask of Shadows",
      slot: "eyes",
      tags: ["legendary"],
      value: "EQUIPMENT_PRICE_MASTER",
      sluttiness: 0,
      skillmods: {
        intrigue: Constants.EQUIPMENT_STAT_BOOST_MASTER,
        social: -Constants.EQUIPMENT_STAT_BOOST_MASTER,
      },
      traits: {
        magic_dark: 1,
      },
      restrictions: [
        qres.Job("slaver"),
        qres.SkillAtLeast(
          "intrigue",
          Constants.EQUIPMENT_WEAPON_MASTER_MIN_SKILL,
        ),
      ],
      icon: { image: "eyes_mask" },
      texts: {
        description:
          "An ornate mask meant to be worn to completely hide the wearer's identity. " +
          "It is enchanted with dark magic, capable of erasing the wearer's presence.",
        flavor:
          "The mask covers every inch of its wearer's face and identity, and its " +
          "enchantment would conceal their presence as well. While it's good for sneaking around " +
          "undetected, it sometimes make talking with their wearer a little more than awkward",
      },
    },
  }),
};
