export const FURNITURE_SLOT_DEFINITIONS =
  typedObject<EquipmentSlotDefinition>()({
    slaverbed: { name: "slaver bed" },
    slavebed: { name: "slaves beds" },
    foodtray: { name: "food tray" },
    drinktray: { name: "drink container" },
    reward: { name: "slave reward" },

    punishment: { name: "slave punishment" },
    lighting: { name: "lighting" },
    tile: { name: "floor decoration" },
    object: { name: "object decoration" },
    wall: { name: "wall decoration" },
  });
