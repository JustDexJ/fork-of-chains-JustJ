import { qres } from "../../_init/preinit_costrestrictions";
import type { EquipmentDefinition } from "../../classes/equipment/Equipment";
import { EquipmentPoolDefinition } from "../../classes/equipment/EquipmentPool";
import { Constants } from "../../constants";

export default {
  equipmentpools: definitions<EquipmentPoolDefinition>()({
    brawn: {
      chances: {
        brawn_neck: 1,
        brawn_rear: 1,
        brawn_arms: 1,
        brawn_feet: 1,
        brawn_mouth: 1,
      },
    },

    brawn_good: {
      chances: {
        brawn_neck_good: 1,
        brawn_rear_good: 1,
        brawn_arms_good: 1,
        brawn_feet_good: 1,
        brawn_mouth_good: 1,
      },
    },
  }),
  equipments: definitions<EquipmentDefinition>()({
    brawn_neck: {
      name: "Brawler Cape",
      slot: "neck",
      tags: ["clothes", "cape"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 0,
      skillmods: { brawn: Constants.EQUIPMENT_STAT_BOOST_NORMAL },
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

    brawn_rear: {
      name: "Brawler Boxers",
      slot: "rear",
      tags: ["clothes", "covering"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 0,
      skillmods: { brawn: Constants.EQUIPMENT_STAT_BOOST_NORMAL },
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

    brawn_arms: {
      name: "Brawler Gauntlets",
      slot: "arms",
      tags: ["clothes"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 0,
      skillmods: { brawn: Constants.EQUIPMENT_STAT_BOOST_NORMAL },
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

    brawn_mouth: {
      name: "Brawler Bandana",
      slot: "mouth",
      tags: ["accessory", "mouthcover"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 0,
      skillmods: { brawn: Constants.EQUIPMENT_STAT_BOOST_NORMAL },
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

    brawn_feet: {
      name: "Brawler Sandals",
      slot: "feet",
      tags: ["clothes", "covering"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 0,
      skillmods: { brawn: Constants.EQUIPMENT_STAT_BOOST_NORMAL },
      traits: {},
      restrictions: [],
      icon: { image: "feet_sandals" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    brawn_neck_good: {
      name: "Gladiator Cape",
      slot: "neck",
      tags: ["clothes", "cape"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 0,
      skillmods: { brawn: Constants.EQUIPMENT_STAT_BOOST_GOOD },
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

    brawn_rear_good: {
      name: "Gladiator Boxers",
      slot: "rear",
      tags: ["clothes", "covering"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 0,
      skillmods: { brawn: Constants.EQUIPMENT_STAT_BOOST_GOOD },
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

    brawn_arms_good: {
      name: "Gladiator Gauntlets",
      slot: "arms",
      tags: ["clothes"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 0,
      skillmods: { brawn: Constants.EQUIPMENT_STAT_BOOST_GOOD },
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

    brawn_mouth_good: {
      name: "Gladiator Bandana",
      slot: "mouth",
      tags: ["clothes"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 0,
      skillmods: { brawn: Constants.EQUIPMENT_STAT_BOOST_GOOD },
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

    brawn_feet_good: {
      name: "Gladiator Sandals",
      slot: "feet",
      tags: ["clothes", "covering"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 0,
      skillmods: { brawn: Constants.EQUIPMENT_STAT_BOOST_GOOD },
      traits: {},
      restrictions: [],
      icon: { image: "feet_sandals" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    brawn_rear_master: {
      name: "Champion Boxers",
      slot: "rear",
      tags: ["clothes", "covering", "legendary"],
      value: "EQUIPMENT_PRICE_MASTER",
      sluttiness: 0,
      skillmods: { brawn: Constants.EQUIPMENT_STAT_BOOST_MASTER },
      traits: {},
      restrictions: [],
      icon: {
        /* image: 'TBD' */
      },
      texts: {
        description:
          "A boxers complete with a gilded belt, a symbol for winning the Southern Isle Pit Fights. " +
          "It is enchanted, empowering whoever wearing it with strength.",
        flavor:
          "The golden belt around the boxers reflected light brightly. " +
          "Despite looking heavy, the boxer's enchantment alleviate most of the weight, and also empower the wearer",
      },
    },

    brawn_weapon_master: {
      name: "Gravity Axe",
      slot: "weapon",
      tags: ["legendary"],
      value: "EQUIPMENT_PRICE_MASTER",
      sluttiness: 0,
      skillmods: {
        brawn: Constants.EQUIPMENT_STAT_BOOST_MASTER,
        combat: -Constants.EQUIPMENT_STAT_BOOST_MASTER,
      },
      traits: {
        tough_tough: 1,
      },
      restrictions: [
        qres.Job("slaver"),
        qres.SkillAtLeast("brawn", Constants.EQUIPMENT_WEAPON_MASTER_MIN_SKILL),
      ],
      icon: { image: "weapon_axe_master" },
      texts: {
        description:
          "A really, really heavy axe. Wieldable only by the brawniest of the brawniest. " +
          "Despite its questionable use in combat, whoever capable of wielding it must look very tough.",
        flavor:
          "The Gravity Axe is incredibly heavy, unwieldy even for the strongest of slavers. " +
          "In fact, it will actually deter the combat effectiveness of its wielder, but at least it " +
          "makes its wielder appear very tough",
      },
    },
  }),
};
