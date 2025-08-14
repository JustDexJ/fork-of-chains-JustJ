import type { Furniture } from "../../../classes/furniture/Furniture";
import type { FurnitureSlot } from "../../../classes/furniture/FurnitureSlot";
import type { Unit } from "../../../classes/unit/Unit";

function bedchamberEquipment(unit: Unit, slot: FurnitureSlot): string {
  let bedchamber = unit.getBedchamber();

  let furniture: Furniture;
  if (!bedchamber) {
    furniture = slot.getBasicFurniture();
  } else {
    furniture = bedchamber.getFurniture(slot);
  }
  return furniture.rep();
}

export const TextUnitTrait_Furniture = {
  slaverbed(unit: Unit): string {
    return bedchamberEquipment(unit, setup.furnitureslot.slaverbed);
  },

  slavebed(unit: Unit): string {
    return bedchamberEquipment(unit, setup.furnitureslot.slavebed);
  },

  foodtray(unit: Unit): string {
    return bedchamberEquipment(unit, setup.furnitureslot.foodtray);
  },

  drinktray(unit: Unit): string {
    return bedchamberEquipment(unit, setup.furnitureslot.drinktray);
  },

  punishment(unit: Unit): string {
    return bedchamberEquipment(unit, setup.furnitureslot.punishment);
  },

  lighting(unit: Unit): string {
    return bedchamberEquipment(unit, setup.furnitureslot.lighting);
  },

  tile(unit: Unit): string {
    return bedchamberEquipment(unit, setup.furnitureslot.tile);
  },

  object(unit: Unit): string {
    return bedchamberEquipment(unit, setup.furnitureslot.object);
  },

  wall(unit: Unit): string {
    return bedchamberEquipment(unit, setup.furnitureslot.wall);
  },
};
