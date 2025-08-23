import type { EquipmentDefinition } from "../../classes/equipment/Equipment";
import { EquipmentPoolDefinition } from "../../classes/equipment/EquipmentPool";
import { Constants } from "../../constants";

export default {
  equipmentpools: definitions<EquipmentPoolDefinition>()({
    dog: {
      chances: {
        tailplug_dog: 1,
        collar_dog: 1,
        hood_dog: 1,
        mitts_dog: 1,
        harness_dog: 1,
      },
    },
    pet_good: {
      chances: {
        golden_tailplug_dog: 1,
        golden_collar_dog: 1,
        golden_harness_dog: 1,
        golden_mitts_dog: 1,
        golden_hood_dog: 1,
      },
    },
  }),
  equipments: definitions<EquipmentDefinition>()({
    tailplug_dog: {
      name: "Puppy Tail Plug",
      slot: "rear",
      tags: ["pet", "buttplug", "tailplug", "banuse", "sextoy"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 20,
      skillmods: {} /* skills */,
      traits: {
        eq_plug_anus: 1,
        eq_pet: 3,
      },
      restrictions: [],
      icon: { image: "rear_pony_tailplug" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    collar_dog: {
      name: "Puppy Collar",
      slot: "neck",
      tags: ["pet", "collar", "sextoy"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 10,
      skillmods: {} /* skills */,
      traits: {
        eq_collar: 1,
        eq_pet: 3,
      },
      restrictions: [],
      icon: { image: "neck_puppy_collar" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    hood_dog: {
      name: "Puppy Hood",
      slot: "head",
      tags: ["pet", "headcover", "coverface", "sextoy"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 10,
      skillmods: {} /* skills */,
      traits: {
        eq_pet: 3,
      },
      restrictions: [],
      icon: { image: "head_puppy_hood" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    mitts_dog: {
      name: "Puppy Mitts",
      slot: "arms",
      tags: ["pet", "mitts", "banuse", "sextoy"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 10,
      skillmods: {} /* skills */,
      traits: {
        eq_restrained: 2,
        eq_pet: 3,
      },
      restrictions: [],
      icon: { image: "arms_puppy_mitts" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    harness_dog: {
      name: "Puppy Harness",
      slot: "torso",
      tags: ["pet", "harness", "sextoy"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 20,
      skillmods: {} /* skills */,
      traits: {
        eq_pet: 3,
      },
      restrictions: [],
      icon: { image: "torso_puppy_harness" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    golden_tailplug_dog: {
      name: "Golden Puppy Tail Plug",
      slot: "rear",
      tags: ["pet", "buttplug", "tailplug", "banuse", "sextoy"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 30,
      skillmods: {} /* skills */,
      traits: {
        eq_plug_anus: 1,
        eq_pet: 3,
      },
      restrictions: [],
      icon: { image: "rear_pony_tailplug", colorize: "gold" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    golden_collar_dog: {
      name: "Golden Puppy Collar",
      slot: "neck",
      tags: ["pet", "collar", "sextoy"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 15,
      skillmods: {} /* skills */,
      traits: {
        eq_collar: 1,
        eq_pet: 3,
      },
      restrictions: [],
      icon: { image: "neck_puppy_collar", colorize: "gold" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    golden_harness_dog: {
      name: "Golden Puppy Harness",
      slot: "torso",
      tags: ["pet", "harness", "sextoy"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 25,
      skillmods: {} /* skills */,
      traits: {
        eq_pet: 3,
      },
      restrictions: [],
      icon: { image: "torso_puppy_harness", colorize: "gold" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    golden_hood_dog: {
      name: "Golden Puppy Hood",
      slot: "head",
      tags: ["pet", "headcover", "coverface", "sextoy"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 20,
      skillmods: {} /* skills */,
      traits: {
        eq_pet: 3,
      },
      restrictions: [],
      icon: { image: "head_puppy_hood", colorize: "gold" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    golden_mitts_dog: {
      name: "Golden Puppy Mitts",
      slot: "arms",
      tags: ["pet", "mitts", "banuse", "sextoy"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 20,
      skillmods: {} /* skills */,
      traits: {
        eq_restrained: 2,
        eq_pet: 3,
      },
      restrictions: [],
      icon: { image: "arms_puppy_mitts", colorize: "gold" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    tailplug_dog_master: {
      name: "Tailplug of Hound-Mastery",
      slot: "rear",
      tags: ["pet", "buttplug", "tailplug", "banuse", "sextoy"],
      value: "EQUIPMENT_PRICE_MASTER",
      sluttiness: 40,
      skillmods: { sex: Constants.EQUIPMENT_STAT_BOOST_MASTER },
      traits: {
        eq_plug_anus: 1,
        eq_pet: 3,
      },
      restrictions: [],
      icon: { image: "rear_pony_tailplug", colorize: "cyan" },
      texts: {
        description: "",
        flavor: "",
      },
    },
  }),
};
