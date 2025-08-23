import { qres } from "../../_init/preinit_costrestrictions";
import type { EquipmentDefinition } from "../../classes/equipment/Equipment";
import { EquipmentPoolDefinition } from "../../classes/equipment/EquipmentPool";

export default {
  equipmentpools: definitions<EquipmentPoolDefinition>()({
    chastity: {
      chances: {
        chastity_dick: 1,
      },
    },
  }),
  equipments: definitions<EquipmentDefinition>()({
    chastity_dick: {
      name: "Dick Chastity Device",
      slot: "genital",
      tags: ["dick", "chastity", "banuse", "sextoy"],
      value: "EQUIPMENT_PRICE_NORMAL",
      sluttiness: 5,
      skillmods: {},
      traits: {
        eq_chastity: 1,
      },
      restrictions: [qres.Trait("dick_tiny")],
      icon: { image: "genital_chastity" },
      texts: {
        description: "",
        flavor: "",
      },
    },
  }),
};
