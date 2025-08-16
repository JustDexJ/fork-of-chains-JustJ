export const FURNITURE_SLOT_DEFINITIONS =
  typedObject<EquipmentSlotDefinition>()({
    slaverbed: { key: "slaverbed", name: "slaver bed" },
    slavebed: { key: "slavebed", name: "slaves beds" },
    foodtray: { key: "foodtray", name: "food tray" },
    drinktray: { key: "drinktray", name: "drink container" },
    reward: { key: "reward", name: "slave reward" },

    punishment: { key: "punishment", name: "slave punishment" },
    lighting: { key: "lighting", name: "lighting" },
    tile: { key: "tile", name: "floor decoration" },
    object: { key: "object", name: "object decoration" },
    wall: { key: "wall", name: "wall decoration" },
  });
