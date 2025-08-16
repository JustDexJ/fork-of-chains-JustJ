import type { EquipmentSlot } from "../../../equipment/EquipmentSlot";

export default class SexNoEquipment extends SexRestriction {
  constructor(public equipment_slot: EquipmentSlot) {
    super();
  }

  override explain() {
    return `No equipment in ${this.equipment_slot.rep()}`;
  }

  override isOk(unit: Unit) {
    return !unit.getEquipmentAt(this.equipment_slot);
  }
}
