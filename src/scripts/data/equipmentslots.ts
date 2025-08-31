export const EQUIPMENT_SLOT_DEFINITIONS =
  definitions<EquipmentSlotDefinition>()({
    // Note: the order that they are defined in is used in the equipment grid to display them
    // so they will appear in this order: row0-col0, row0-col1, row0-col2, row1-col1, row1-col2, etc.

    weapon: { name: "weapon" },
    head: { name: "head" },
    mouth: { name: "mouth" },

    torso: { name: "torso" },
    eyes: { name: "eyes" },
    nipple: { name: "nipple" },

    legs: { name: "legs" },
    neck: { name: "neck" },
    genital: { name: "genital" },

    feet: { name: "feet" },
    arms: { name: "arms" },
    rear: { name: "rear" },
  });
