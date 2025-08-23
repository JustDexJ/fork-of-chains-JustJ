import { qres } from "../../_init/preinit_costrestrictions";
import type { EquipmentDefinition } from "../../classes/equipment/Equipment";
import { EquipmentPoolDefinition } from "../../classes/equipment/EquipmentPool";
import { Constants } from "../../constants";

export default {
  equipmentpools: definitions<EquipmentPoolDefinition>()({
    sex: {
      chances: {
        sex_torso: 1,
        sex_legs: 1,
        sex_nipple: 1,
        sex_rear: 1,
        sex_neck: 1,
      },
    },

    sex_good: {
      chances: {
        sex_torso_good: 1,
        sex_legs_good: 1,
        sex_nipple_good: 1,
        sex_rear_good: 1,
        sex_neck_good: 1,
      },
    },
  }),
  equipments: definitions<EquipmentDefinition>()({
    sex_torso: {
      name: "Whore Harness",
      slot: "torso",
      tags: ["harness"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 5,
      skillmods: { sex: Constants.EQUIPMENT_STAT_BOOST_NORMAL },
      traits: {},
      restrictions: [],
      icon: {
        /* image meta */
      },
      texts: {
        description: "",
        flavor: "",
      },
    },

    sex_legs: {
      name: "Whore Leggings",
      slot: "legs",
      tags: ["clothes", "covering"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 5,
      skillmods: { sex: Constants.EQUIPMENT_STAT_BOOST_NORMAL },
      traits: {},
      restrictions: [],
      icon: {},
      texts: {
        description: "",
        flavor: "",
      },
    },

    sex_rear: {
      name: "Whore Thong",
      slot: "rear",
      tags: ["clothes", "covering"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 5,
      skillmods: { sex: Constants.EQUIPMENT_STAT_BOOST_NORMAL },
      traits: {},
      restrictions: [],
      texts: {
        description: "",
        flavor: "",
      },
      icon: { image: "rear_thong" },
    },

    sex_nipple: {
      name: "Whore Nipple Clamps",
      slot: "nipple",
      tags: ["accessory", "nippleclamps"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 10,
      skillmods: { sex: Constants.EQUIPMENT_STAT_BOOST_NORMAL },
      traits: {},
      restrictions: [],
      icon: {},
      texts: {
        description: "",
        flavor: "",
      },
    },

    sex_neck: {
      name: "Whore Choker",
      slot: "neck",
      tags: ["choker"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 0,
      skillmods: { sex: Constants.EQUIPMENT_STAT_BOOST_NORMAL },
      traits: {},
      restrictions: [],
      icon: { image: "neck_necklace" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    sex_torso_good: {
      name: "Succubus Harness",
      slot: "torso",
      tags: ["harness"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 5,
      skillmods: { sex: Constants.EQUIPMENT_STAT_BOOST_GOOD },
      traits: {},
      restrictions: [],
      icon: {},
      texts: {
        description: "",
        flavor: "",
      },
    },

    sex_legs_good: {
      name: "Succubus Leggings",
      slot: "legs",
      tags: ["clothes", "covering"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 5,
      skillmods: { sex: Constants.EQUIPMENT_STAT_BOOST_GOOD },
      traits: {},
      restrictions: [],
      icon: {},
      texts: {
        description: "",
        flavor: "",
      },
    },

    sex_rear_good: {
      name: "Succubus Thong",
      slot: "rear",
      tags: ["clothes", "covering"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 5,
      skillmods: { sex: Constants.EQUIPMENT_STAT_BOOST_GOOD },
      traits: {},
      restrictions: [],
      texts: {
        description: "",
        flavor: "",
      },
      icon: { image: "rear_thong" },
    },

    sex_nipple_good: {
      name: "Succubus Nipple Clamps",
      slot: "nipple",
      tags: ["accessory", "nippleclamps"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 10,
      skillmods: { sex: Constants.EQUIPMENT_STAT_BOOST_GOOD },
      traits: {},
      restrictions: [],
      icon: {},
      texts: {
        description: "",
        flavor: "",
      },
    },

    sex_neck_good: {
      name: "Succubus Choker",
      slot: "neck",
      tags: ["choker"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 0,
      skillmods: { sex: Constants.EQUIPMENT_STAT_BOOST_GOOD },
      traits: {},
      restrictions: [],
      icon: { image: "neck_necklace" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    sex_legs_master: {
      name: "Pants of Competence",
      slot: "legs",
      tags: ["fake_clothes", "legendary"],
      value: "EQUIPMENT_PRICE_MASTER",
      sluttiness: 5,
      skillmods: {
        sex: Constants.EQUIPMENT_STAT_BOOST_MASTER,
        knowledge: -Constants.EQUIPMENT_STAT_BOOST_GOOD,
      },
      traits: {},
      restrictions: [],
      icon: { image: "legs_pants_invisible" },
      texts: {
        description:
          "A pants made from the most magnificent fabric imaginable, but would be invisible " +
          "to those stupid or unfit for their job... supposedly.",
        flavor:
          "You can't see anything where the pants is supposed to be, " +
          "but you're not planning to act incompetent in front of your other slavers. " +
          'Still, the "pants" do make the wearer looks sexier than normal',
      },
    },

    sex_nipple_master: {
      name: "Nipple Clamps of Lust",
      slot: "nipple",
      tags: ["legendary", "accessory", "nippleclamps"],
      value: "EQUIPMENT_PRICE_MASTER",
      sluttiness: 9,
      skillmods: {
        sex: Constants.EQUIPMENT_STAT_BOOST_MASTER,
        brawn: -Constants.EQUIPMENT_STAT_BOOST_MASTER,
      },
      traits: {
        per_lustful: 1,
      },
      restrictions: [qres.Job("slaver")],
      icon: {},
      texts: {
        description:
          "A legendary nipple clamps, said to increase the libido of its bearer uncontrollably.",
        flavor:
          "The nipple clamps bits painfully into the soft flesh, " +
          "forcing the nipples to be erect and its wearer perpetually horny",
      },
    },
  }),
};
