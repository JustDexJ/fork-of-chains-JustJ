import { qres } from "../../_init/preinit_costrestrictions";
import type { EquipmentDefinition } from "../../classes/equipment/Equipment";
import { EquipmentPoolDefinition } from "../../classes/equipment/EquipmentPool";
import { Constants } from "../../constants";

export default {
  equipmentpools: definitions<EquipmentPoolDefinition>()({
    slaving: {
      chances: {
        slaving_torso: 1,
        slaving_legs: 1,
        slaving_rear: 1,
        slaving_arms: 1,
        slaving_head: 1,
      },
    },

    slaving_good: {
      chances: {
        slaving_torso_good: 1,
        slaving_legs_good: 1,
        slaving_rear_good: 1,
        slaving_arms_good: 1,
        slaving_head_good: 1,
      },
    },
  }),
  equipments: definitions<EquipmentDefinition>()({
    slaving_torso: {
      name: "Kinky Jacket",
      slot: "torso",
      tags: ["clothes", "covering"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 5,
      skillmods: { slaving: Constants.EQUIPMENT_STAT_BOOST_NORMAL },
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

    slaving_legs: {
      name: "Kinky Leggings",
      slot: "legs",
      tags: ["clothes", "covering"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 5,
      skillmods: { slaving: Constants.EQUIPMENT_STAT_BOOST_NORMAL },
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

    slaving_arms: {
      name: "Kinky Gloves",
      slot: "arms",
      tags: ["clothes"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 0,
      skillmods: { slaving: Constants.EQUIPMENT_STAT_BOOST_NORMAL },
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

    slaving_rear: {
      name: "Kinky Underwear",
      slot: "rear",
      tags: ["clothes", "covering"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 5,
      skillmods: { slaving: Constants.EQUIPMENT_STAT_BOOST_NORMAL },
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

    slaving_head: {
      name: "Kinky Cap",
      slot: "head",
      tags: ["accessory", "hat"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 0,
      skillmods: { slaving: Constants.EQUIPMENT_STAT_BOOST_NORMAL },
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

    slaving_torso_good: {
      name: "Master Jacket",
      slot: "torso",
      tags: ["clothes", "covering"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 0,
      skillmods: { slaving: Constants.EQUIPMENT_STAT_BOOST_GOOD },
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

    slaving_legs_good: {
      name: "Master Trousers",
      slot: "legs",
      tags: ["clothes", "covering"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 0,
      skillmods: { slaving: Constants.EQUIPMENT_STAT_BOOST_GOOD },
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

    slaving_arms_good: {
      name: "Master Gloves",
      slot: "arms",
      tags: ["clothes"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 0,
      skillmods: { slaving: Constants.EQUIPMENT_STAT_BOOST_GOOD },
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

    slaving_rear_good: {
      name: "Master Boxers",
      slot: "rear",
      tags: ["clothes", "covering"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 0,
      skillmods: { slaving: Constants.EQUIPMENT_STAT_BOOST_GOOD },
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

    slaving_head_good: {
      name: "Master Hat",
      slot: "head",
      tags: ["accessory", "hat"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 0,
      skillmods: { slaving: Constants.EQUIPMENT_STAT_BOOST_GOOD },
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

    slaving_weapon_master: {
      name: "Dark Excalibur",
      slot: "weapon",
      tags: ["legendary"],
      value: "EQUIPMENT_PRICE_MASTER",
      sluttiness: 0,
      skillmods: {
        /* skills */ slaving: Constants.EQUIPMENT_STAT_BOOST_MASTER,
        combat: Constants.EQUIPMENT_STAT_BOOST_NORMAL,
      },
      traits: {},
      restrictions: [
        /* unit restriction */ qres.Job("slaver"),
        qres.HasTitle("quest_corrupted_wielder_of_the_excalibur_0"),
      ],
      icon: {
        /* image: 'TBD' */
      },
      texts: {
        description:
          "Once the famous sword Excalibur, its purifying powers have been corrupted beyond recognition. " +
          "The corruption does not reduce its ego however, and the sword continues to refuse being wielded by anyone but the people it consider most honorable",
        flavor:
          "Even when fully corrupted, the sword remains beautiful in its stark nature." +
          "It is able to cut through flesh inflicting as much pain as possible without causing damage, truly a useful weapon for slavers",
      },
    },

    slaving_arms_master: {
      name: "Gloves of Tender Ministration",
      slot: "arms",
      tags: ["legendary", "clothes"],
      value: "EQUIPMENT_PRICE_MASTER",
      sluttiness: 0,
      skillmods: {
        slaving: Constants.EQUIPMENT_STAT_BOOST_MASTER,
        combat: -Constants.EQUIPMENT_STAT_BOOST_MASTER,
      },
      traits: {
        per_cruel: 1,
      },
      restrictions: [
        qres.Job("slaver"),
        qres.SkillAtLeast(
          "slaving",
          Constants.EQUIPMENT_WEAPON_MASTER_MIN_SKILL,
        ),
      ],
      icon: {},
      texts: {
        description:
          "A glove fitted with an enchantment of cruelty. Its name was chosen to mock whichever slave unlucky enough to be on the receiving side of the gloves.",
        flavor:
          "The glove is enchanted with enchantments of cruelty, and whoever wears them will get inclined to find the nearest slave and abuse them at will",
      },
    },

    slaving_rear_master: {
      name: "Underwear of Absolute Dominance",
      slot: "rear",
      tags: ["legendary", "clothes", "covering"],
      value: "EQUIPMENT_PRICE_MASTER",
      sluttiness: 0,
      skillmods: {
        slaving: Constants.EQUIPMENT_STAT_BOOST_MASTER,
      },
      traits: {},
      restrictions: [],
      icon: {},
      texts: {
        description:
          "A pair of underwear that once belonged to a drow so dominant they had to be exiled from their home.",
        flavor:
          "The underwear used to belong to the pinnacle of doms -- a drow who had to leave their homeland after making too many fellow drows a total sub",
      },
    },
  }),
};
