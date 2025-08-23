import { qres } from "../../_init/preinit_costrestrictions";
import type { EquipmentDefinition } from "../../classes/equipment/Equipment";
import { EquipmentPoolDefinition } from "../../classes/equipment/EquipmentPool";
import { Constants } from "../../constants";

export default {
  equipmentpools: definitions<EquipmentPoolDefinition>()({
    knowledge: {
      chances: {
        knowledge_torso: 1,
        knowledge_legs: 1,
        knowledge_eyes: 1,
        knowledge_head: 1,
        knowledge_arms: 1,
      },
    },

    knowledge_good: {
      chances: {
        knowledge_torso_good: 1,
        knowledge_legs_good: 1,
        knowledge_eyes_good: 1,
        knowledge_head_good: 1,
        knowledge_arms_good: 1,
      },
    },
  }),
  equipments: definitions<EquipmentDefinition>()({
    knowledge_torso: {
      name: "Scholar Robe",
      slot: "torso",
      tags: ["clothes", "covering"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 0,
      skillmods: { knowledge: Constants.EQUIPMENT_STAT_BOOST_NORMAL },
      traits: {},
      restrictions: [],
      icon: { image: "torso_robes" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    knowledge_legs: {
      name: "Scholar Pants",
      slot: "legs",
      tags: ["clothes", "covering"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 0,
      skillmods: { knowledge: Constants.EQUIPMENT_STAT_BOOST_NORMAL },
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

    knowledge_head: {
      name: "Scholar Cap",
      slot: "head",
      tags: ["accessory", "hat"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 0,
      skillmods: { knowledge: Constants.EQUIPMENT_STAT_BOOST_NORMAL },
      traits: {},
      restrictions: [],
      icon: { image: "head_hat_wizard" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    knowledge_eyes: {
      name: "Scholar Spectacles",
      slot: "eyes",
      tags: ["accessory", "spectacles"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 0,
      skillmods: { knowledge: Constants.EQUIPMENT_STAT_BOOST_NORMAL },
      traits: {},
      restrictions: [],
      icon: { image: "eyes_spectacles" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    knowledge_arms: {
      name: "Scholar Gloves",
      slot: "arms",
      tags: ["clothes"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 0,
      skillmods: { knowledge: Constants.EQUIPMENT_STAT_BOOST_NORMAL },
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

    knowledge_torso_good: {
      name: "Wiseman Robe",
      slot: "torso",
      tags: ["clothes", "covering"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 0,
      skillmods: { knowledge: Constants.EQUIPMENT_STAT_BOOST_GOOD },
      traits: {},
      restrictions: [],
      icon: { image: "torso_robes" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    knowledge_legs_good: {
      name: "Wiseman Pants",
      slot: "legs",
      tags: ["clothes", "covering"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 0,
      skillmods: { knowledge: Constants.EQUIPMENT_STAT_BOOST_GOOD },
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

    knowledge_head_good: {
      name: "Wiseman Thinking Cap",
      slot: "head",
      tags: ["accessory", "hat"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 0,
      skillmods: { knowledge: Constants.EQUIPMENT_STAT_BOOST_GOOD },
      traits: {},
      restrictions: [],
      icon: { image: "head_hat_wizard" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    knowledge_eyes_good: {
      name: "Wiseman Spectacles",
      slot: "eyes",
      tags: ["clothes", "spectacles"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 0,
      skillmods: { knowledge: Constants.EQUIPMENT_STAT_BOOST_GOOD },
      traits: {},
      restrictions: [],
      icon: { image: "eyes_spectacles" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    knowledge_arms_good: {
      name: "Wiseman Gloves",
      slot: "arms",
      tags: ["clothes"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 0,
      skillmods: { knowledge: Constants.EQUIPMENT_STAT_BOOST_GOOD },
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

    knowledge_legs_master: {
      name: "Breeches of Knowledge",
      slot: "legs",
      tags: ["legendary", "clothes", "covering"],
      value: "EQUIPMENT_PRICE_MASTER",
      sluttiness: 0,
      skillmods: {
        knowledge: Constants.EQUIPMENT_STAT_BOOST_MASTER,
      },
      traits: {},
      restrictions: [qres.Job("slaver")],
      icon: {},
      texts: {
        description:
          "An enchanted breeches who refuses to be worn except by the smartest of people. " +
          "A true mark of knowledge.",
        flavor:
          "The breeches often glow blue-ish, giving its wearer a light-blue aura. " +
          "The aura isn't just for show, and it imbues its bearer with knowledge both of " +
          "this world and beyond",
      },
    },
  }),
};
