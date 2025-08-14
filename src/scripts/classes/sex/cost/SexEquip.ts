import type { Equipment, EquipmentKey } from "../../equipment/Equipment";

export default class SexEquip extends SexCost {
  actor_name: string;
  equipment_key: EquipmentKey;

  constructor(actor_name: string, equipment: Equipment | EquipmentKey) {
    super();
    this.actor_name = actor_name;
    this.equipment_key = resolveKey(equipment);
  }

  override apply(action: SexAction) {
    const unit = action.getActorUnit(this.actor_name);
    this.sex.equipTemporarily(unit, setup.equipment[this.equipment_key]);
  }

  override explain() {
    return `${this.actor_name} equips ${setup.equipment[this.equipment_key].rep()}`;
  }
}
