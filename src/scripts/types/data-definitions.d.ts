declare global {
  type SubraceDefinition = import("../classes/trait/Subrace").SubraceDefinition;
  type EquipmentSlotDefinition =
    import("../classes/equipment/EquipmentSlot").EquipmentSlotDefinition;
}

export {}; // (needed to make this file a module)
