import { qres } from "../../_init/preinit_costrestrictions";
import type { EquipmentDefinition } from "../../classes/equipment/Equipment";
import { EquipmentPoolDefinition } from "../../classes/equipment/EquipmentPool";
import { Constants } from "../../constants";

export default {
  equipmentpools: definitions<EquipmentPoolDefinition>()({
    social: {
      chances: {
        social_neck: 1,
        social_eyes: 1,
        social_head: 1,
        social_feet: 1,
        social_arms: 1,
      },
    },

    social_good: {
      chances: {
        social_neck_good: 1,
        social_eyes_good: 1,
        social_head_good: 1,
        social_feet_good: 1,
        social_arms_good: 1,
      },
    },
  }),
  equipments: definitions<EquipmentDefinition>()({
    social_neck: {
      name: "Socialite Necklace",
      slot: "neck",
      tags: ["necklace"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 0,
      skillmods: { social: Constants.EQUIPMENT_STAT_BOOST_NORMAL },
      traits: {},
      restrictions: [],
      icon: { image: "neck_necklace" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    social_eyes: {
      name: "Socialite Ball Mask",
      slot: "eyes",
      tags: ["accessory", "eyemask"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 0,
      skillmods: { social: Constants.EQUIPMENT_STAT_BOOST_NORMAL },
      traits: {},
      restrictions: [],
      icon: { image: "eyes_masquerade" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    social_feet: {
      name: "Socialite Shoes",
      slot: "feet",
      tags: ["clothes", "covering"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 0,
      skillmods: { social: Constants.EQUIPMENT_STAT_BOOST_NORMAL },
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

    social_head: {
      name: "Socialite Circlet",
      slot: "head",
      tags: ["accessory", "tiara"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 0,
      skillmods: { social: Constants.EQUIPMENT_STAT_BOOST_NORMAL },
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

    social_arms: {
      name: "Socialite Ring",
      slot: "arms",
      tags: ["ring"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 0,
      skillmods: { social: Constants.EQUIPMENT_STAT_BOOST_NORMAL },
      traits: {},
      restrictions: [],
      icon: { image: "arms_ring_jeweled" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    social_neck_good: {
      name: "Noble Necklace",
      slot: "neck",
      tags: ["necklace"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 0,
      skillmods: { social: Constants.EQUIPMENT_STAT_BOOST_GOOD },
      traits: {},
      restrictions: [],
      icon: { image: "neck_necklace" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    social_eyes_good: {
      name: "Noble Masquerade Mask",
      slot: "eyes",
      tags: ["accessory", "eyemask"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 0,
      skillmods: { social: Constants.EQUIPMENT_STAT_BOOST_GOOD },
      traits: {},
      restrictions: [],
      icon: { image: "eyes_masquerade" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    social_feet_good: {
      name: "Noble Shoes",
      slot: "feet",
      tags: ["clothes", "covering"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 0,
      skillmods: { social: Constants.EQUIPMENT_STAT_BOOST_GOOD },
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

    social_head_good: {
      name: "Noble Tiara",
      slot: "head",
      tags: ["accessory", "tiara"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 0,
      skillmods: { social: Constants.EQUIPMENT_STAT_BOOST_GOOD },
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

    social_arms_good: {
      name: "Noble Signet Ring",
      slot: "arms",
      tags: ["ring"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 0,
      skillmods: { social: Constants.EQUIPMENT_STAT_BOOST_GOOD },
      traits: {},
      restrictions: [],
      icon: { image: "arms_ring_jeweled" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    social_neck_other: {
      name: '"Heroic" Cape',
      slot: "neck",
      tags: ["cape"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 0,
      skillmods: {
        social: Constants.EQUIPMENT_STAT_BOOST_NORMAL,
        sex: Constants.EQUIPMENT_STAT_BOOST_TINY,
      },
      traits: {},
      restrictions: [],
      icon: {
        /* image: 'TBD' */
      },
      texts: {
        description:
          "A regular piece of cloth that is supposed to be worn around your neck like a cape. " +
          "Was supposedly worn by a heroic hero, but it is probably nothing more than another of your slaver's grand lunacy.",
        flavor:
          "The piece of clothes is worn awkwardly near the neck, " +
          "threatening to fly away when a particularly strong wind blow through. " +
          "Strangely enough, it never does so far",
      },
    },

    social_eyes_master: {
      name: "Masquerade Mask of Whispers",
      slot: "eyes",
      tags: ["legendary", "accessory", "eyemask"],
      value: "EQUIPMENT_PRICE_MASTER",
      sluttiness: 0,
      skillmods: {
        social: Constants.EQUIPMENT_STAT_BOOST_MASTER,
        intrigue: -Constants.EQUIPMENT_STAT_BOOST_MASTER,
      },
      traits: {
        per_gregarious: 1,
      },
      restrictions: [
        qres.Job("slaver"),
        qres.SkillAtLeast(
          "social",
          Constants.EQUIPMENT_WEAPON_MASTER_MIN_SKILL,
        ),
      ],
      icon: { image: "eyes_masquerade" },
      texts: {
        description:
          "What was an ordinary masquerade mask has been enchanted by the touch of the divine, granting eloquence to its wielder.",
        flavor:
          "The once ordinary mask has been enchanted, whispering eloquent responses to its wielder",
      },
    },
  }),
};
