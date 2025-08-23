import { qres } from "../../_init/preinit_costrestrictions";
import type { EquipmentDefinition } from "../../classes/equipment/Equipment";
import { EquipmentPoolDefinition } from "../../classes/equipment/EquipmentPool";

export default {
  equipmentpools: definitions<EquipmentPoolDefinition>()({
    sextoy: {
      chances: {
        nipplechains: 1,
        buttplug: 1,
        dildo: 1,
        dildoanus: 1,
        dildogag: 1,
        dickplug: 1,
      },
    },

    sextoy_good: {
      chances: {
        goldnipplechains: 1,
        goldbuttplug: 1,
        golddildo: 1,
        golddildoanus: 1,
        golddildogag: 1,
        golddickplug: 1,
      },
    },
  }),
  equipments: definitions<EquipmentDefinition>()({
    nipplechains: {
      name: "Nipple Chains",
      slot: "nipple",
      tags: ["accessory", "nipplechains", "sextoy"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 20,
      skillmods: {},
      traits: {},
      restrictions: [],
      icon: { image: "nipple_clamps" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    buttplug: {
      name: "Buttplug",
      slot: "rear",
      tags: ["buttplug", "banuse", "sextoy"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 20,
      skillmods: {} /* skills */,
      traits: {
        eq_plug_anus: 1,
      },
      restrictions: [],
      icon: { image: "rear_buttplug" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    dildo: {
      name: "Dildo (Vaginal)",
      slot: "genital",
      tags: ["dildo", "vagina", "banuse", "sextoy"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 20,
      skillmods: {} /* skills */,
      traits: {
        eq_plug_vagina: 1,
      },
      restrictions: [qres.Trait("vagina_tight")],
      icon: { image: "genital_dildo" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    dildoanus: {
      name: "Dildo (Anal)",
      slot: "rear",
      tags: ["dildo", "banuse", "sextoy"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 20,
      skillmods: {} /* skills */,
      traits: {
        eq_plug_anus: 1,
      },
      restrictions: [],
      icon: { image: "genital_dildo" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    dildogag: {
      name: "Dildo Gag",
      slot: "mouth",
      tags: ["gag", "dildogag", "banuse", "sextoy"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 20,
      skillmods: {} /* skills */,
      traits: {
        eq_gagged: 1,
      },
      restrictions: [],
      icon: { image: "mouth_gag_dildo" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    dickplug: {
      name: "Dick Plug",
      slot: "genital",
      tags: ["dickplug", "dick", "banuse", "sextoy"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 20,
      skillmods: {},
      traits: {},
      restrictions: [qres.Trait("dick_tiny")],
      icon: { image: "genital_dickplug" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    goldnipplechains: {
      name: "Gold Nipple Chains",
      slot: "nipple",
      tags: ["accessory", "nipplechains", "nipples", "sextoy"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 20,
      skillmods: {},
      traits: {},
      restrictions: [],
      icon: { image: "nipple_clamps", colorize: "gold" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    goldbuttplug: {
      name: "Gold Buttplug",
      slot: "rear",
      tags: ["buttplug", "banuse", "sextoy"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 20,
      skillmods: {} /* skills */,
      traits: {
        eq_plug_anus: 1,
      },
      restrictions: [],
      icon: { image: "rear_buttplug", colorize: "gold" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    golddildo: {
      name: "Gold Dildo (Vaginal)",
      slot: "genital",
      tags: ["dildo", "vagina", "banuse", "sextoy"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 20,
      skillmods: {} /* skills */,
      traits: {
        eq_plug_vagina: 1,
      },
      restrictions: [qres.Trait("vagina_tight")],
      icon: { image: "genital_dildo", colorize: "gold" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    golddildoanus: {
      name: "Gold Dildo (Anal)",
      slot: "rear",
      tags: ["dildo", "banuse", "sextoy"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 20,
      skillmods: {} /* skills */,
      traits: {
        eq_plug_anus: 1,
      },
      restrictions: [],
      icon: { image: "genital_dildo", colorize: "gold" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    golddildogag: {
      name: "Gold Dildo Gag",
      slot: "mouth",
      tags: ["dildogag", "banuse", "sextoy"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 20,
      skillmods: {} /* skills */,
      traits: {
        eq_gagged: 1,
      },
      restrictions: [],
      icon: { image: "mouth_gag_dildo", colorize: "gold" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    golddickplug: {
      name: "Gold Dick Plug",
      slot: "genital",
      tags: ["dickplug", "dick", "banuse", "sextoy"],
      value: "EQUIPMENT_PRICE_GOOD",
      sluttiness: 20,
      skillmods: {},
      traits: {},
      restrictions: [qres.Trait("dick_tiny")],
      icon: { image: "genital_dickplug", colorize: "gold" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    buttplug_master: {
      name: "Ancient Neko Buttplug",
      slot: "rear",
      tags: ["buttplug", "legendary", "sextoy"],
      value: "EQUIPMENT_PRICE_MASTER",
      sluttiness: 30,
      skillmods: {} /* skills */,
      traits: {
        eq_plug_anus: 1,
      },
      restrictions: [],
      icon: { image: "rear_buttplug" },
      texts: {
        description: "",
        flavor: "",
      },
    },

    dildo_cucumber: {
      name: "Enchanted Cucumber (Vaginal)",
      slot: "genital",
      tags: ["dildo", "vagina", "banuse", "vegetable", "sextoy"],
      value: 100,
      sluttiness: 20,
      skillmods: {} /* skills */,
      traits: {
        eq_plug_vagina: 1,
      },
      restrictions: [qres.Trait("vagina_tight")],
      icon: { image: "genital_cucumber" },
      texts: {
        description:
          "A particularly large cucumber home-grown in your fort that has been enchanted to maintain its freshness for a good long while",
        flavor:
          "The enchantment keeps the cucumber fresh, and remains cold and fresh to touch",
      },
    },

    dildo_cucumber_anus: {
      name: "Enchanted Cucumber (Anal)",
      slot: "rear",
      tags: ["dildo", "banuse", "vegetable", "sextoy"],
      value: 100,
      sluttiness: 20,
      skillmods: {} /* skills */,
      traits: {
        eq_plug_anus: 1,
      },
      restrictions: [],
      icon: { image: "genital_cucumber" },
      texts: {
        description:
          "A particularly large cucumber home-grown in your fort that has been enchanted to maintain its freshness for a good long while",
        flavor:
          "The enchantment keeps the cucumber fresh, and remains cold and fresh to touch",
      },
    },
  }),
};
