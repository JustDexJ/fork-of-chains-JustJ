import { qres } from "../../_init/preinit_costrestrictions";
import type { EquipmentDefinition } from "../../classes/equipment/Equipment";
import { EquipmentPoolDefinition } from "../../classes/equipment/EquipmentPool";
import { Constants } from "../../constants";

export default {
  equipmentpools: definitions<EquipmentPoolDefinition>()({}),
  equipments: definitions<EquipmentDefinition>()({
    /* These are a set of default weapons */

    weapon_sword: {
      name: "Sword",
      slot: "weapon",
      tags: ["basic"],
      value: 0,
      sluttiness: 0,
      skillmods: {},
      traits: {},
      restrictions: [qres.Job("slaver")],
      icon: { image: "weapon_sword" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    weapon_spear: {
      name: "Spear",
      slot: "weapon",
      tags: ["basic"],
      value: 0,
      sluttiness: 0,
      skillmods: {},
      traits: {},
      restrictions: [qres.Job("slaver")],
      icon: { image: "weapon_spear" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    weapon_axe: {
      name: "Axe",
      slot: "weapon",
      tags: ["basic"],
      value: 0,
      sluttiness: 0,
      skillmods: {},
      traits: {},
      restrictions: [qres.Job("slaver")],
      icon: { image: "weapon_axe" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    weapon_dagger: {
      name: "Dagger",
      slot: "weapon",
      tags: ["basic"],
      value: 0,
      sluttiness: 0,
      skillmods: {},
      traits: {},
      restrictions: [qres.Job("slaver")],
      icon: { image: "weapon_dagger" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    weapon_staff: {
      name: "Staff",
      slot: "weapon",
      tags: ["basic"],
      value: 0,
      sluttiness: 0,
      skillmods: {},
      traits: {},
      restrictions: [qres.Job("slaver")],
      icon: { image: "weapon_staff" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    weapon_broadsword: {
      name: "Broadsword",
      slot: "weapon",
      tags: [],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 0,
      skillmods: {
        combat: Constants.EQUIPMENT_STAT_BOOST_NORMAL,
        brawn: Constants.EQUIPMENT_STAT_BOOST_NORMAL,
      },
      traits: {},
      restrictions: [qres.Job("slaver"), qres.Trait("muscle_strong")],
      icon: { image: "weapon_broadsword" },
      texts: {
        description:
          "A masterfully crafted broadsword made using pure strong metal",
        flavor:
          "It is very heavy, and only the stronger slavers are able to wield it with deadly efficiency",
      },
    },

    weapon_dualdagger: {
      name: "Dual Dagger",
      slot: "weapon",
      tags: [],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 0,
      skillmods: {
        combat: Constants.EQUIPMENT_STAT_BOOST_NORMAL,
        intrigue: Constants.EQUIPMENT_STAT_BOOST_NORMAL,
      },
      traits: {},
      restrictions: [qres.Job("slaver"), qres.Trait("skill_ambidextrous")],
      icon: { image: "weapon_dual" },
      texts: {
        description:
          "Masterfully crafted dual daggers for the stealthiest of assasins. Or assasin-wannabes",
        flavor:
          "With one dagger in each hand, an experienced assassin can make great use of such a weapon",
      },
    },

    weapon_rapier_normal: {
      name: "Rapier",
      slot: "weapon",
      tags: [],
      value: "EQUIPMENT_PRICE_NORMALGOOD",
      sluttiness: 0,
      skillmods: {
        combat: Constants.EQUIPMENT_STAT_BOOST_LOW,
        social: Constants.EQUIPMENT_STAT_BOOST_LOW,
      },
      traits: {},
      restrictions: [qres.Job("slaver")],
      icon: { image: "weapon_rapier" },
      texts: {
        description:
          "The preferred weapon for honorable duels between nobility. How the weapon comes into your hand, nobody knows",
        flavor:
          "Despite being the preferred weapon of the high nobility, perhaps this weapon is still useful for a slaving career",
      },
    },

    weapon_rapier: {
      name: "Red Rapier",
      slot: "weapon",
      tags: [],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 0,
      skillmods: {
        combat: Constants.EQUIPMENT_STAT_BOOST_NORMAL,
        social: Constants.EQUIPMENT_STAT_BOOST_NORMAL,
      },
      traits: {},
      restrictions: [qres.Job("slaver")],
      icon: { image: "weapon_rapier" },
      texts: {
        description:
          "Masterfully crafted rapier guaranteed to give you the required edge for those damsel-winning duels",
        flavor:
          "Despite being the preferred weapon of the high nobility, perhaps this weapon is still useful for a slaving career",
      },
    },

    weapon_log: {
      name: "Log",
      slot: "weapon",
      tags: [],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 0,
      skillmods: {
        combat: -Constants.EQUIPMENT_STAT_BOOST_NORMAL,
        sex: Constants.EQUIPMENT_STAT_BOOST_TINY,
      },
      traits: {},
      restrictions: [qres.Job("slaver")],
      icon: { image: "weapon_log" },
      texts: {
        description:
          "An ordinary log bearing the inscriptions of a master blacksmith",
        flavor:
          "If it's any consolation, the ladies are sure to be pleased seeing such a hard, thick piece of wood",
      },
    },
  }),
};
