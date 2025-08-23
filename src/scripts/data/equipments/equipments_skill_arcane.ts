import { qres } from "../../_init/preinit_costrestrictions";
import type { EquipmentDefinition } from "../../classes/equipment/Equipment";
import { EquipmentPoolDefinition } from "../../classes/equipment/EquipmentPool";
import { Constants } from "../../constants";

export default {
  equipmentpools: definitions<EquipmentPoolDefinition>()({
    arcane: {
      chances: {
        arcane_torso: 1,
        arcane_arms: 1,
        arcane_head: 1,
        arcane_feet: 1,
        arcane_neck: 1,
      },
    },

    arcane_good: {
      chances: {
        arcane_torso_good: 1,
        arcane_arms_good: 1,
        arcane_head_good: 1,
        arcane_feet_good: 1,
        arcane_neck_good: 1,
      },
    },
  }),
  equipments: definitions<EquipmentDefinition>()({
    arcane_torso: {
      name: "Wizard Robe",
      slot: "torso",
      tags: ["clothes", "covering"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 0,
      skillmods: { arcane: Constants.EQUIPMENT_STAT_BOOST_NORMAL },
      traits: {},
      restrictions: [],
      icon: { image: "torso_robes" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    arcane_arms: {
      name: "Wizard Ring",
      slot: "arms",
      tags: ["ring"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 0,
      skillmods: { arcane: Constants.EQUIPMENT_STAT_BOOST_NORMAL },
      traits: {},
      restrictions: [],
      icon: { image: "arms_ring" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    arcane_feet: {
      name: "Wizard Slippers",
      slot: "feet",
      tags: ["clothes", "covering"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 0,
      skillmods: { arcane: Constants.EQUIPMENT_STAT_BOOST_NORMAL },
      traits: {},
      restrictions: [],
      icon: {},
      texts: {
        description: "",
        flavor: "",
      },
    },

    arcane_head: {
      name: "Wizard Hat",
      slot: "head",
      tags: ["accessory", "hat"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 0,
      skillmods: { arcane: Constants.EQUIPMENT_STAT_BOOST_NORMAL },
      traits: {},
      restrictions: [],
      icon: { image: "head_hat_wizard" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    arcane_neck: {
      name: "Wizard Amulet",
      slot: "neck",
      tags: ["necklace"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 0,
      skillmods: { arcane: Constants.EQUIPMENT_STAT_BOOST_NORMAL },
      traits: {},
      restrictions: [],
      icon: { image: "neck_necklace_star" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    arcane_torso_good: {
      name: "Archwizard Robe",
      slot: "torso",
      tags: ["clothes", "covering"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 0,
      skillmods: { arcane: Constants.EQUIPMENT_STAT_BOOST_GOOD },
      traits: {},
      restrictions: [],
      icon: { image: "torso_robes" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    arcane_arms_good: {
      name: "Archwizard Ring",
      slot: "arms",
      tags: ["ring"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 0,
      skillmods: { arcane: Constants.EQUIPMENT_STAT_BOOST_GOOD },
      traits: {},
      restrictions: [],
      icon: { image: "arms_ring" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    arcane_feet_good: {
      name: "Archwizard Slippers",
      slot: "feet",
      tags: ["clothes", "covering"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 0,
      skillmods: { arcane: Constants.EQUIPMENT_STAT_BOOST_GOOD },
      traits: {},
      restrictions: [],
      icon: {},
      texts: {
        description: "",
        flavor: "",
      },
    },

    arcane_head_good: {
      name: "Archwizard Hat",
      slot: "head",
      tags: ["accessory", "hat"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 0,
      skillmods: { arcane: Constants.EQUIPMENT_STAT_BOOST_GOOD },
      traits: {},
      restrictions: [],
      icon: { image: "head_hat_wizard" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    arcane_neck_good: {
      name: "Archwizard Amulet",
      slot: "neck",
      tags: ["necklace"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 0,
      skillmods: { arcane: Constants.EQUIPMENT_STAT_BOOST_GOOD },
      traits: {},
      restrictions: [],
      icon: { image: "neck_necklace_star" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    arcane_head_master: {
      name: "Wizard Hat of Pure Evil",
      slot: "head",
      tags: ["legendary", "accessory", "hat"],
      value: "EQUIPMENT_PRICE_MASTER",
      sluttiness: 0,
      skillmods: {
        arcane: Constants.EQUIPMENT_STAT_BOOST_MASTER,
        social: -Constants.EQUIPMENT_STAT_BOOST_MASTER,
      },
      traits: {
        per_evil: 1,
      },
      restrictions: [
        qres.Job("slaver"),
        qres.SkillAtLeast(
          "arcane",
          Constants.EQUIPMENT_WEAPON_MASTER_MIN_SKILL,
        ),
      ],
      icon: {},
      texts: {
        description:
          "A legendary wizard hat brimming with pure malice. You feel evil just by touching its very fabric.",
        flavor:
          "The hat whispers dark temptations into its wearer, forcing them down the path of evil",
      },
    },
  }),
};
