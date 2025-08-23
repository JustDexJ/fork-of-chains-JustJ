import { qres } from "../../_init/preinit_costrestrictions";
import type { EquipmentDefinition } from "../../classes/equipment/Equipment";
import { EquipmentPoolDefinition } from "../../classes/equipment/EquipmentPool";
import { Constants } from "../../constants";

export default {
  equipmentpools: definitions<EquipmentPoolDefinition>()({
    combat: {
      chances: {
        combat_torso: 1,
        combat_legs: 1,
        combat_arms: 1,
        combat_feet: 1,
        combat_head: 1,
      },
    },

    combat_good: {
      chances: {
        combat_torso_good: 1,
        combat_legs_good: 1,
        combat_arms_good: 1,
        combat_feet_good: 1,
        combat_head_good: 1,
      },
    },
  }),
  equipments: definitions<EquipmentDefinition>()({
    combat_torso: {
      name: "Chain Mail",
      slot: "torso",
      tags: ["armor", "covering"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 0,
      skillmods: { combat: Constants.EQUIPMENT_STAT_BOOST_NORMAL },
      traits: {},
      restrictions: [],
      icon: { image: "torso_chestplate_heavy" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    combat_legs: {
      name: "Chain Greaves",
      slot: "legs",
      tags: ["armor", "covering"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 0,
      skillmods: { combat: Constants.EQUIPMENT_STAT_BOOST_NORMAL },
      traits: {},
      restrictions: [],
      icon: { image: "legs_faulds_heavy" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    combat_feet: {
      name: "Chain Sabatons",
      slot: "feet",
      tags: ["armor", "covering"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 0,
      skillmods: { combat: Constants.EQUIPMENT_STAT_BOOST_NORMAL },
      traits: {},
      restrictions: [],
      icon: { image: "feet_greaves_heavy" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    combat_arms: {
      name: "Chain Gauntlets",
      slot: "arms",
      tags: ["armor"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 0,
      skillmods: { combat: Constants.EQUIPMENT_STAT_BOOST_NORMAL },
      traits: {},
      restrictions: [],
      icon: { image: "arms_gauntlets_heavy" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    combat_head: {
      name: "Chain Coif",
      slot: "head",
      tags: ["armor", "helmet", "coverface"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 0,
      skillmods: { combat: Constants.EQUIPMENT_STAT_BOOST_NORMAL },
      traits: {},
      restrictions: [],
      icon: { image: "head_helm_heavy" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    combat_torso_good: {
      name: "Plate Armor",
      slot: "torso",
      tags: ["armor", "covering"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 0,
      skillmods: { combat: Constants.EQUIPMENT_STAT_BOOST_GOOD },
      traits: {},
      restrictions: [],
      icon: { image: "torso_chestplate_heavy" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    combat_legs_good: {
      name: "Plate Greaves",
      slot: "legs",
      tags: ["armor", "covering"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 0,
      skillmods: { combat: Constants.EQUIPMENT_STAT_BOOST_GOOD },
      traits: {},
      restrictions: [],
      icon: { image: "legs_faulds_heavy" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    combat_feet_good: {
      name: "Plate Sabatons",
      slot: "feet",
      tags: ["armor", "covering"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 0,
      skillmods: { combat: Constants.EQUIPMENT_STAT_BOOST_GOOD },
      traits: {},
      restrictions: [],
      icon: { image: "feet_greaves_heavy" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    combat_arms_good: {
      name: "Plate Gauntlets",
      slot: "arms",
      tags: ["armor"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 0,
      skillmods: { combat: Constants.EQUIPMENT_STAT_BOOST_GOOD },
      traits: {},
      restrictions: [],
      icon: { image: "arms_gauntlets_heavy" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    combat_head_good: {
      name: "Plate Helmet",
      slot: "head",
      tags: ["armor", "helmet", "coverface"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 0,
      skillmods: { combat: Constants.EQUIPMENT_STAT_BOOST_GOOD },
      traits: {},
      restrictions: [],
      icon: { image: "head_helm_heavy" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    combat_arms_master: {
      name: "Orc-born Gauntlets",
      slot: "arms",
      tags: ["armor", "legendary"],
      value: "EQUIPMENT_PRICE_MASTER",
      sluttiness: 0,
      skillmods: { combat: Constants.EQUIPMENT_STAT_BOOST_MASTER },
      traits: {},
      restrictions: [],
      icon: { image: "arms_gauntlets_heavy" },
      texts: {
        description:
          "An extremely well-crafted gauntlets suitable for the hardiest combatants. " +
          "It bears the craftsmanship of a master orcish blacksmith.",
        flavor:
          "The gauntlets bear the mark of a legendary orcish smith, truly a mastework equipment. " +
          "It is said to grant whoever wear them great power like orcs of ancient times",
      },
    },

    combat_weapon_master: {
      name: "Brave Sword",
      slot: "weapon",
      tags: ["legendary"],
      value: "EQUIPMENT_PRICE_MASTER",
      sluttiness: 0,
      skillmods: {
        combat: Constants.EQUIPMENT_STAT_BOOST_MASTER,
        intrigue: -Constants.EQUIPMENT_STAT_BOOST_MASTER,
      },
      traits: {
        per_brave: 1,
      },
      restrictions: [
        qres.Job("slaver"),
        qres.SkillAtLeast(
          "combat",
          Constants.EQUIPMENT_WEAPON_MASTER_MIN_SKILL,
        ),
      ],
      icon: { image: "weapon_sword_master2" },
      texts: {
        description:
          "A legendary sword, wieldable only by the most skillful warriors. It is said to instill bravery on whoever lucky enough to wield the sword",
        flavor:
          "The Brave Sword's unusual shape makes it unwieldy for anyone but the most masterful of swordmasters. " +
          "It is enchanted, instilling bravery on its wielder",
      },
    },
  }),
};
