import type { EquipmentDefinition } from "../../classes/equipment/Equipment";
import { EquipmentPoolDefinition } from "../../classes/equipment/EquipmentPool";

export default {
  equipmentpools: definitions<EquipmentPoolDefinition>()({}),
  equipments: definitions<EquipmentDefinition>()({
    pants: {
      name: "Standard Pants",
      slot: "legs",
      tags: ["clothes", "covering"],
      value: 0,
      sluttiness: 0,
      skillmods: {} /* skills */,
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

    shirt: {
      name: "Standard Shirt",
      slot: "torso",
      tags: ["clothes", "covering"],
      value: 0,
      sluttiness: 0,
      skillmods: {} /* skills */,
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

    shoes: {
      name: "Standard Shoes",
      slot: "feet",
      tags: ["shoes", "covering"],
      value: 0,
      sluttiness: 0,
      skillmods: {} /* skills */,
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

    /* Unobtainable. Usable only in sex */
    strapon: {
      name: "Strap-On",
      slot: "genital",
      tags: ["basic", "strapon", "sextoy"],
      value: 0,
      sluttiness: 0,
      skillmods: {} /* skills */,
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
  }),
};
