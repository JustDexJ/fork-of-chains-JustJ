import type { EquipmentDefinition } from "../../classes/equipment/Equipment";
import { EquipmentPoolDefinition } from "../../classes/equipment/EquipmentPool";

export default {
  equipmentpools: definitions<EquipmentPoolDefinition>()({
    pony: {
      chances: {
        tailplug_pony: 1,
        gag_pony: 1,
        eyecover_pony: 1,
        hooves_front_pony: 1,
        hooves_rear_pony: 1,
      },
    },

    pony_good: {
      chances: {
        large_tailplug_pony: 1,
        large_gag_pony: 1,
        large_eyecover_pony: 1,
        constricting_hooves_front_pony: 1,
        constricting_hooves_rear_pony: 1,
      },
    },
  }),
  equipments: definitions<EquipmentDefinition>()({
    tailplug_pony: {
      name: "Pony Tail Plug",
      slot: "rear",
      tags: ["pony", "buttplug", "tailplug", "banuse", "sextoy"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 20,
      skillmods: {} /* skills */,
      traits: {
        eq_plug_anus: 1,
        eq_pony: 3,
      },
      restrictions: [],
      icon: { image: "rear_pony_tailplug" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    gag_pony: {
      name: "Pony Bit Gag",
      slot: "mouth",
      tags: ["pony", "gag", "bitgag", "banuse", "sextoy"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 10,
      skillmods: {} /* skills */,
      traits: {
        eq_gagged: 1,
        eq_pony: 3,
      },
      restrictions: [],
      icon: { image: "mouth_pony_bitgag" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    eyecover_pony: {
      name: "Pony Blinders",
      slot: "eyes",
      tags: ["pony", "ponyeyecover", "banuse", "sextoy"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 10,
      skillmods: {},
      traits: {
        eq_pony: 3,
      },
      restrictions: [],
      icon: { image: "eyes_pony_blinders" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    hooves_front_pony: {
      name: "Pony Hooves (Front)",
      slot: "arms",
      tags: ["pony", "hooves", "banuse", "sextoy"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 10,
      skillmods: {} /* skills */,
      traits: {
        eq_restrained: 2,
        eq_pony: 3,
      },
      restrictions: [],
      icon: { image: "legs_pony_hooves" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    hooves_rear_pony: {
      name: "Pony Hooves (Rear)",
      slot: "feet",
      tags: ["pony", "hooves", "banuse", "covering", "sextoy"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 10,
      skillmods: {} /* skills */,
      traits: {
        eq_restrained: 2,
        eq_pony: 3,
      },
      restrictions: [],
      icon: { image: "legs_pony_hooves" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    large_tailplug_pony: {
      name: "Extra Large Pony Tail Plug",
      slot: "rear",
      tags: ["pony", "buttplug", "tailplug", "banuse", "sextoy"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 30,
      skillmods: {} /* skills */,
      traits: {
        eq_plug_anus: 1,
        eq_pony: 3,
      },
      restrictions: [],
      icon: { image: "rear_pony_tailplug" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    large_gag_pony: {
      name: "Extra Large Pony Bit Gag",
      slot: "mouth",
      tags: ["pony", "gag", "bitgag", "banuse", "sextoy"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 20,
      skillmods: {} /* skills */,
      traits: {
        eq_gagged: 1,
        eq_pony: 3,
      },
      restrictions: [],
      icon: { image: "mouth_pony_bitgag" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    large_eyecover_pony: {
      name: "Extra Dark Pony Blinders",
      slot: "eyes",
      tags: ["pony", "ponyeyecover", "sextoy"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 20,
      skillmods: {},
      traits: {
        eq_pony: 3,
      },
      restrictions: [],
      icon: { image: "eyes_pony_blinders" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    constricting_hooves_front_pony: {
      name: "Extra Constricting Pony Hooves (Front)",
      slot: "arms",
      tags: ["pony", "hooves", "banuse", "sextoy"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 20,
      skillmods: {} /* skills */,
      traits: {
        eq_restrained: 2,
        eq_pony: 3,
      },
      restrictions: [],
      icon: { image: "legs_pony_hooves" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    constricting_hooves_rear_pony: {
      name: "Extra Constricting Pony Hooves (Rear)",
      slot: "feet",
      tags: ["pony", "hooves", "banuse", "covering", "sextoy"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 20,
      skillmods: {} /* skills */,
      traits: {
        eq_restrained: 2,
        eq_pony: 3,
      },
      restrictions: [],
      icon: { image: "legs_pony_hooves" },
      texts: {
        description: "",
        flavor: "",
      },
    },
  }),
};
