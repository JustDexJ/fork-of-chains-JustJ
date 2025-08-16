import { EquipmentSlot } from "../classes/equipment/EquipmentSlot";

export type _equipmentslot = ReturnType<typeof initEquipmentSlots>;

export const initEquipmentSlots = () => ({
  head: new EquipmentSlot("head", "head"),
  neck: new EquipmentSlot("neck", "neck"),
  torso: new EquipmentSlot("torso", "torso"),
  arms: new EquipmentSlot("arms", "arms"),
  legs: new EquipmentSlot("legs", "legs"),
  feet: new EquipmentSlot("feet", "feet"),

  weapon: new EquipmentSlot("weapon", "weapon"),
  eyes: new EquipmentSlot("eyes", "eyes"),
  mouth: new EquipmentSlot("mouth", "mouth"),
  nipple: new EquipmentSlot("nipple", "nipple"),
  rear: new EquipmentSlot("rear", "rear"),
  genital: new EquipmentSlot("genital", "genital"),
});
