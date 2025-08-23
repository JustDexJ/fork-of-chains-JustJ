import { qres } from "../../_init/preinit_costrestrictions";
import type { EquipmentDefinition } from "../../classes/equipment/Equipment";
import { EquipmentPoolDefinition } from "../../classes/equipment/EquipmentPool";
import { Constants } from "../../constants";

export default {
  equipmentpools: definitions<EquipmentPoolDefinition>()({
    aid: {
      chances: {
        aid_torso: 1,
        aid_mouth: 1,
        aid_arms: 1,
        aid_head: 1,
        aid_nipple: 1,
      },
    },
    aid_good: {
      chances: {
        aid_torso_good: 1,
        aid_mouth_good: 1,
        aid_arms_good: 1,
        aid_head_good: 1,
        aid_nipple_good: 1,
      },
    },
  }),
  equipments: definitions<EquipmentDefinition>()({
    aid_torso: {
      name: "Healer Robe",
      slot: "torso",
      tags: ["clothes", "covering"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 0,
      skillmods: { aid: Constants.EQUIPMENT_STAT_BOOST_NORMAL },
      traits: {},
      restrictions: [],
      icon: { image: "torso_robes" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    aid_mouth: {
      name: "Healer Plague Mask",
      slot: "mouth",
      tags: ["accessory", "plaguemask"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 0,
      skillmods: { aid: Constants.EQUIPMENT_STAT_BOOST_NORMAL },
      traits: {},
      restrictions: [],
      icon: { image: "eyes_mask_plague" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    aid_head: {
      name: "Healer Habit",
      slot: "head",
      tags: ["clothes"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 0,
      skillmods: { aid: Constants.EQUIPMENT_STAT_BOOST_NORMAL },
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

    aid_arms: {
      name: "Healer Gloves",
      slot: "arms",
      tags: ["clothes"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 0,
      skillmods: { aid: Constants.EQUIPMENT_STAT_BOOST_NORMAL },
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

    aid_nipple: {
      name: "Healer Nipple Clamps",
      slot: "nipple",
      tags: ["accessory", "nippleclamps"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 10,
      skillmods: { aid: Constants.EQUIPMENT_STAT_BOOST_NORMAL },
      traits: {},
      restrictions: [],
      icon: { image: "nipple_clamps" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    aid_torso_good: {
      name: "Saint Robe",
      slot: "torso",
      tags: ["clothes", "covering"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 0,
      skillmods: { aid: Constants.EQUIPMENT_STAT_BOOST_GOOD },
      traits: {},
      restrictions: [],
      icon: { image: "torso_robes" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    aid_mouth_good: {
      name: "Saint Shroud",
      slot: "mouth",
      tags: ["accessory", "mouthcover"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 0,
      skillmods: { aid: Constants.EQUIPMENT_STAT_BOOST_GOOD },
      traits: {},
      restrictions: [],
      icon: { image: "neck_hood" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    aid_head_good: {
      name: "Saint Habit",
      slot: "head",
      tags: ["clothes"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 0,
      skillmods: { aid: Constants.EQUIPMENT_STAT_BOOST_GOOD },
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

    aid_arms_good: {
      name: "Saint Gloves",
      slot: "arms",
      tags: ["clothes"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 0,
      skillmods: { aid: Constants.EQUIPMENT_STAT_BOOST_GOOD },
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

    aid_nipple_good: {
      name: "Saint Nipple Clamps",
      slot: "nipple",
      tags: ["accessory", "nippleclamps"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 10,
      skillmods: { aid: Constants.EQUIPMENT_STAT_BOOST_GOOD },
      traits: {},
      restrictions: [],
      icon: { image: "nipple_clamps" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    aid_torso_master: {
      name: "Ancient Cleric Robe",
      slot: "torso",
      tags: ["clothes", "covering", "legendary"],
      value: "EQUIPMENT_PRICE_MASTER",
      sluttiness: 0,
      skillmods: { aid: Constants.EQUIPMENT_STAT_BOOST_MASTER },
      traits: {},
      restrictions: [],
      icon: { image: "torso_robes" },
      texts: {
        description:
          "A relic of times long gone, made of the finest and sleekest silk. " +
          "The mere sight of it heals the body and the spirit.",
        flavor:
          "The robe looks really elegant, even from afar. " +
          "Despite its obvious age, its threads somehow maintain their top-notch quality. " +
          "The robe is enchanted, and its wearer exhudes an aura of reliance and hope",
      },
    },

    aid_weapon_master: {
      name: "Staff of Pain",
      slot: "weapon",
      tags: ["legendary"],
      value: "EQUIPMENT_PRICE_MASTER",
      sluttiness: 0,
      skillmods: {
        aid: Constants.EQUIPMENT_STAT_BOOST_MASTER,
        survival: -Constants.EQUIPMENT_STAT_BOOST_MASTER,
      },
      traits: {
        per_masochistic: 1,
      },
      restrictions: [
        qres.Job("slaver"),
        qres.SkillAtLeast("aid", Constants.EQUIPMENT_WEAPON_MASTER_MIN_SKILL),
      ],
      icon: { image: "weapon_staff_master" },
      texts: {
        description:
          "A staff designed for maximum pain instead of healing. " +
          "It is enchanted with the masochism enchantment, transforming its wielder into the perfect embodiment of a heal slut.",
        flavor:
          "The Staff of Pain transforms the wielder into a masochist, " +
          "regardless of their usual sexual preference, " +
          "molding them into the perfect husk of a devoted heal slut",
      },
    },
  }),
};
