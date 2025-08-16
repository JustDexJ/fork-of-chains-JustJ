import { FurnitureSlot } from "../classes/furniture/FurnitureSlot";

export type _furnitureslot = ReturnType<typeof initFurnitureSlots>;

export const initFurnitureSlots = () => ({
  slaverbed: new FurnitureSlot("slaverbed", "slaver bed"),
  slavebed: new FurnitureSlot("slavebed", "slaves beds"),
  foodtray: new FurnitureSlot("foodtray", "food tray"),
  drinktray: new FurnitureSlot("drinktray", "drink container"),
  reward: new FurnitureSlot("reward", "slave reward"),

  punishment: new FurnitureSlot("punishment", "slave punishment"),
  lighting: new FurnitureSlot("lighting", "lighting"),
  tile: new FurnitureSlot("tile", "floor decoration"),
  object: new FurnitureSlot("object", "object decoration"),
  wall: new FurnitureSlot("wall", "wall decoration"),
});
