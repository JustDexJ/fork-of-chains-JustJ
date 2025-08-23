import type { EquipmentDefinition } from "../../classes/equipment/Equipment";
import { EquipmentPoolDefinition } from "../../classes/equipment/EquipmentPool";

export default {
  equipmentpools: definitions<EquipmentPoolDefinition>()({
    restraint: {
      chances: {
        metal_collar: 1,
        ballgag: 1,
        blindfold: 1,
        manacles_up: 1,
        manacles_down: 1,
      },
    },
  }),
  equipments: definitions<EquipmentDefinition>()({
    manacles_up: {
      name: "Manacles",
      slot: "arms",
      tags: ["restraints", "sextoy"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 5,
      skillmods: {} /* skills */,
      traits: {
        eq_restrained: 2,
      },
      restrictions: [],
      icon: { image: "arms_manacles" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    manacles_down: {
      name: "Fetters",
      slot: "feet",
      tags: ["restraints", "sextoy"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 5,
      skillmods: {} /* skills */,
      traits: {
        eq_restrained: 2,
      },
      restrictions: [],
      icon: { image: "feet_fetters" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    blindfold: {
      name: "Blindfold",
      slot: "eyes",
      tags: ["blindfold", "banuse", "sextoy"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 10,
      skillmods: {} /* skills */,
      traits: {
        eq_blind: 1,
      },
      restrictions: [],
      icon: { image: "eyes_blindfold" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    ballgag: {
      name: "Ball Gag",
      slot: "mouth",
      tags: ["gag", "ballgag", "banuse", "sextoy"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 20,
      skillmods: {} /* skills */,
      traits: {
        eq_gagged: 1,
      },
      restrictions: [],
      icon: { image: "mouth_gag_ball" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    metal_collar: {
      name: "Heavy Metal Collar",
      slot: "neck",
      tags: ["collar", "sextoy"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 10,
      skillmods: {} /* skills */,
      traits: {
        eq_collar: 1,
      },
      restrictions: [],
      icon: { image: "neck_collar" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    cowbell_collar: {
      name: "Cowbell Collar",
      slot: "neck",
      tags: ["collar", "bellcollar", "sextoy"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 15,
      skillmods: {} /* skills */,
      traits: {
        eq_collar: 1,
      },
      restrictions: [],
      icon: { image: "neck_collar" },
      texts: {
        description: "",
        flavor: "",
      },
    },
  }),
};
