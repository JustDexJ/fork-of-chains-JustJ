import type { EquipmentSlot } from "../../../equipment/EquipmentSlot";

export default class SexCanUnequip extends SexRestriction {
  constructor(public equipment_slot: EquipmentSlot) {
    super();
  }

  override explain() {
    return `Can unequip ${this.equipment_slot.rep()}`;
  }

  override isOk(unit: Unit) {
    for (const bodypart of setup.SexClasses.getAllBodyparts()) {
      if (bodypart.isHasBodypart(unit, this.sex)) {
        const eq = this.sex.getBlockingEquipment(unit, bodypart);
        if (eq && eq.getSlot() == this.equipment_slot) return true;
      }
    }
    return false;
  }
}
