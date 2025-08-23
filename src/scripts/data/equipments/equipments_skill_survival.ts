import { qres } from "../../_init/preinit_costrestrictions";
import type { EquipmentDefinition } from "../../classes/equipment/Equipment";
import { EquipmentPoolDefinition } from "../../classes/equipment/EquipmentPool";
import { Constants } from "../../constants";

export default {
  equipmentpools: definitions<EquipmentPoolDefinition>()({
    survival: {
      chances: {
        survival_torso: 1,
        survival_legs: 1,
        survival_neck: 1,
        survival_feet: 1,
        survival_head: 1,
      },
    },

    survival_good: {
      chances: {
        survival_torso_good: 1,
        survival_legs_good: 1,
        survival_neck_good: 1,
        survival_feet_good: 1,
        survival_head_good: 1,
      },
    },
  }),
  equipments: definitions<EquipmentDefinition>()({
    survival_torso: {
      name: "Ranger Breastplate",
      slot: "torso",
      tags: ["armor", "covering"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 0,
      skillmods: { survival: Constants.EQUIPMENT_STAT_BOOST_NORMAL },
      traits: {},
      restrictions: [],
      icon: { image: "torso_chestplate" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    survival_legs: {
      name: "Ranger Leggings",
      slot: "legs",
      tags: ["armor", "covering"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 0,
      skillmods: { survival: Constants.EQUIPMENT_STAT_BOOST_NORMAL },
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

    survival_feet: {
      name: "Ranger Boots",
      slot: "feet",
      tags: ["armor", "covering"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 0,
      skillmods: { survival: Constants.EQUIPMENT_STAT_BOOST_NORMAL },
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

    survival_neck: {
      name: "Ranger Cloak",
      slot: "neck",
      tags: ["armor", "cape"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 0,
      skillmods: { survival: Constants.EQUIPMENT_STAT_BOOST_NORMAL },
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

    survival_head: {
      name: "Ranger Hood",
      slot: "head",
      tags: ["armor", "hood"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 0,
      skillmods: { survival: Constants.EQUIPMENT_STAT_BOOST_NORMAL },
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

    survival_torso_good: {
      name: "Silk Ranger Shirt",
      slot: "torso",
      tags: ["armor", "covering"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 0,
      skillmods: { survival: Constants.EQUIPMENT_STAT_BOOST_GOOD },
      traits: {},
      restrictions: [],
      icon: { image: "torso_chestplate" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    survival_legs_good: {
      name: "Silk Ranger Leggings",
      slot: "legs",
      tags: ["armor", "covering"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 0,
      skillmods: { survival: Constants.EQUIPMENT_STAT_BOOST_GOOD },
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

    survival_feet_good: {
      name: "Silk Ranger Boots",
      slot: "feet",
      tags: ["armor", "covering"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 0,
      skillmods: { survival: Constants.EQUIPMENT_STAT_BOOST_GOOD },
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

    survival_neck_good: {
      name: "Silk Ranger Cloak",
      slot: "neck",
      tags: ["armor", "cape"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 0,
      skillmods: { survival: Constants.EQUIPMENT_STAT_BOOST_GOOD },
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

    survival_head_good: {
      name: "Silk Ranger Hood",
      slot: "head",
      tags: ["armor", "hood"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 0,
      skillmods: { survival: Constants.EQUIPMENT_STAT_BOOST_GOOD },
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

    survival_neck_master: {
      name: "Fairy Cloak",
      slot: "neck",
      tags: ["armor", "cape", "legendary"],
      value: "EQUIPMENT_PRICE_MASTER",
      sluttiness: 0,
      skillmods: { survival: Constants.EQUIPMENT_STAT_BOOST_MASTER },
      traits: {},
      restrictions: [],
      icon: {
        /* image: 'TBD' */
      },
      texts: {
        description:
          "A transluscent cloak worn around the neck, akin to fairy wings. " +
          "Extremely light yet durable, perfect for scouting missions.",
        flavor:
          "Whenever the transluscent cloak flutters in the wind, " +
          "ethereal butterflies can be seen flying all around the resulting gale",
      },
    },

    survival_torso_master: {
      name: "Breastplate of the Deer",
      slot: "torso",
      tags: ["legendary", "armor", "covering"],
      value: "EQUIPMENT_PRICE_MASTER",
      sluttiness: 0,
      skillmods: {
        survival: Constants.EQUIPMENT_STAT_BOOST_MASTER,
        sex: -Constants.EQUIPMENT_STAT_BOOST_MASTER,
      },
      traits: {
        per_cautious: 1,
      },
      restrictions: [
        qres.Job("slaver"),
        qres.SkillAtLeast(
          "survival",
          Constants.EQUIPMENT_WEAPON_MASTER_MIN_SKILL,
        ),
      ],
      icon: { image: "torso_chestplate" },
      texts: {
        description:
          "A ranger breastplate infused with part of the golden deer's pelt. " +
          "It imbues its wearer with a sense of caution and alacrity.",
        flavor:
          "The breastplate shines a beautiful golden color under the sun. " +
          "It is enchanted to ensure the safety of its wearer, but at a small cost of decreasing their libido",
      },
    },
  }),
};
