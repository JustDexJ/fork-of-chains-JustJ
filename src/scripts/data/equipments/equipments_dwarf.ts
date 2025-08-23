import { qres } from "../../_init/preinit_costrestrictions";
import type { EquipmentDefinition } from "../../classes/equipment/Equipment";
import { EquipmentPoolDefinition } from "../../classes/equipment/EquipmentPool";
import { Constants } from "../../constants";

export default {
  equipmentpools: definitions<EquipmentPoolDefinition>()({
    dwarf_armor: {
      chances: {
        dwarf_armor_torso: 1,
        dwarf_armor_legs: 1,
      },
    },
  }),
  equipments: definitions<EquipmentDefinition>()({
    dwarf_armor_torso: {
      name: "Ancient Dwarven Breastplate",
      slot: "torso",
      tags: ["armor", "covering"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 0,
      skillmods: {
        combat: Constants.EQUIPMENT_STAT_BOOST_GOOD,
      },
      traits: {
        muscle_verystrong: 4,
      },
      restrictions: [qres.Trait("height_dwarf")],
      icon: { image: "torso_chestplate_heavy" },
      texts: {
        description:
          "An ancient dwarven armor that survived the test of the ages. It is designed to be worn only by the shorter races.",
        flavor:
          "The dwarven armor smells ancient, but its craftmanship is masterful and definitely offers great protection",
      },
    },

    dwarf_armor_legs: {
      name: "Ancient Dwarven Greaves",
      slot: "legs",
      tags: ["armor", "covering"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 0,
      skillmods: {
        combat: Constants.EQUIPMENT_STAT_BOOST_GOOD,
      },
      traits: {
        muscle_verystrong: 4,
      },
      restrictions: [qres.Trait("height_dwarf")],
      icon: { image: "legs_faulds_heavy" },
      texts: {
        description:
          "An ancient dwarven armor that survived the test of the ages. Its stubby length means it could only be worn by the shorter races.",
        flavor:
          "Despite the apparent age, the masterful craftsmanship of this piece of armor stood the test of time, still offering great protection to its wearer",
      },
    },

    dwarf_armor_feet: {
      name: "Ancient Dwarven Sabatons",
      slot: "feet",
      tags: ["armor", "covering"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 0,
      skillmods: {
        combat: Constants.EQUIPMENT_STAT_BOOST_GOOD,
      },
      traits: {
        muscle_verystrong: 4,
      },
      restrictions: [qres.Trait("height_dwarf")],
      icon: { image: "feet_greaves_heavy" },
      texts: {
        description:
          "Part of an ancient dwarven armor that has survived the test of time in the Deeprealm. It really is designed for the shorter races.",
        flavor:
          "The sabatons may be old, but is masterful craftsmanship carried its quality to this day",
      },
    },

    dwarf_armor_arms: {
      name: "Ancient Dwarven Gauntlets",
      slot: "arms",
      tags: ["armor"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 0,
      skillmods: {
        combat: Constants.EQUIPMENT_STAT_BOOST_GOOD,
      },
      traits: {
        muscle_verystrong: 4,
      },
      restrictions: [qres.Trait("height_dwarf")],
      icon: { image: "arms_gauntlets_heavy" },
      texts: {
        description:
          "A piece of an ancient dwarven suit of armor. The gauntlets is specifically made to be wearable only by the shorter races.",
        flavor:
          "The gauntlets is very well-made. Despite its age, it still provides great protection upon its wearer",
      },
    },

    dwarf_axe: {
      name: "Ancient Dwarven Battleaxe",
      slot: "weapon",
      tags: ["legendary"],
      value: "EQUIPMENT_PRICE_MASTER",
      sluttiness: 0,
      skillmods: {
        combat: Constants.EQUIPMENT_STAT_BOOST_MASTER,
      },
      traits: {
        muscle_verystrong: 4,
      },
      restrictions: [qres.Trait("height_dwarf"), qres.Job("slaver")],
      icon: { image: "weapon_axe_dwarf" },
      texts: {
        description:
          "An ancient dwarven axe, bearing masterful craftsmanship of days long past. It is designed specifically to be wielded by people who are short in stature.",
        flavor:
          "The Ancient Dwarven Battleaxe is certainly a masterwork, designed specifically to be wielded by the shorter races",
      },
    },
  }),
};
