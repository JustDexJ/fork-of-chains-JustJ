import type { EquipmentSlot } from "../../equipment/EquipmentSlot";

export default class SexUnequip extends SexCost {
  constructor(
    public actor_name: string,
    public equipment_slot: EquipmentSlot,
  ) {
    super();
  }

  override apply(action: SexAction) {
    const unit = action.getActorUnit(this.actor_name);

    const eq = unit.getEquipmentAt(this.equipment_slot);
    if (!eq) return;

    this.sex.displaceEquipment(unit, eq);
  }

  override explain() {
    return `${this.actor_name} unequips ${this.equipment_slot.rep()}`;
  }
}
