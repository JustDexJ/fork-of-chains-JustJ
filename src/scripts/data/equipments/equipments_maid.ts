import type { EquipmentDefinition } from "../../classes/equipment/Equipment";
import { EquipmentPoolDefinition } from "../../classes/equipment/EquipmentPool";
import { Constants } from "../../constants";

export default {
  equipmentpools: definitions<EquipmentPoolDefinition>()({
    maid: {
      chances: {
        maid_torso: 1,
        maid_head: 1,
        maid_legs: 1,
        maid_feet: 1,
        maid_arms: 1,
      },
    },
  }),
  equipments: definitions<EquipmentDefinition>()({
    maid_torso: {
      name: "Domestic Apron",
      slot: "torso",
      tags: ["clothes", "covering"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 5,
      skillmods: { aid: Constants.EQUIPMENT_STAT_BOOST_LOW },
      traits: {
        bg_maid: 3,
      },
      restrictions: [],
      icon: { image: "torso_robes" },
      texts: {
        description: "",
        flavor:
          "The apron only covers the front, leaving the back completely bare and available",
      },
    },

    maid_legs: {
      name: "Domestic Skirt",
      slot: "legs",
      tags: ["clothes", "covering"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 5,
      skillmods: { aid: Constants.EQUIPMENT_STAT_BOOST_LOW },
      traits: {
        bg_maid: 3,
      },
      restrictions: [],
      icon: { image: "legs_skirt" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    maid_feet: {
      name: "Domestic Shoes",
      slot: "feet",
      tags: ["clothes", "covering"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 5,
      skillmods: { aid: Constants.EQUIPMENT_STAT_BOOST_LOW },
      traits: {
        bg_maid: 3,
      },
      restrictions: [],
      icon: { image: "feet_heels" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    maid_head: {
      name: "Domestic Headdress",
      slot: "head",
      tags: ["clothes"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 5,
      skillmods: { aid: Constants.EQUIPMENT_STAT_BOOST_LOW },
      traits: {
        bg_maid: 3,
      },
      restrictions: [],
      icon: { image: "head_maid" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    maid_arms: {
      name: "Domestic Gloves",
      slot: "arms",
      tags: ["clothes"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 5,
      skillmods: { aid: Constants.EQUIPMENT_STAT_BOOST_LOW },
      traits: {
        bg_maid: 3,
      },
      restrictions: [],
      icon: { image: "arms_gloves" },
      texts: {
        description: "",
        flavor: "",
      },
    },
  }),
};
