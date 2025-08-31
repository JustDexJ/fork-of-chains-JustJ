export const EQUIPMENT_SLOT_DEFINITIONS =
  definitions<EquipmentSlotDefinition>()({
    // Note: the order that they are defined in is used in the equipment grid to display them
    // so they will appear in this order: row0-col0, row0-col1, row1-col1, row1-col1, etc.

    weapon: { name: "weapon" },
    eyes: { name: "eyes" },

    head: { name: "head" },
    mouth: { name: "mouth" },

    neck: { name: "neck" },
    arms: { name: "arms" },

    torso: { name: "torso" },
    nipple: { name: "nipple" },

    legs: { name: "legs" },
    genital: { name: "genital" },

    feet: { name: "feet" },
    rear: { name: "rear" },
  });
