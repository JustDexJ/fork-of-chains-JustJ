import type { Equipment, EquipmentKey } from "../../equipment/Equipment";

export default class Equipped extends Restriction.Unit {
  equipment_key: EquipmentKey;

  constructor(equipment: Equipment) {
    super();

    if (!equipment) throw new Error(`Equipment null in Equipped`);
    this.equipment_key = resolveKey(equipment);
  }

  getEquipment(): Equipment {
    return setup.equipment[this.equipment_key];
  }

  override text() {
    return `setup.qres.Equipped('${this.equipment_key}')`;
  }

  override explain() {
    return `equips ${this.getEquipment().rep()}`;
  }

  override isOk(unit: Unit): boolean {
    const equipment = this.getEquipment();
    return unit.getEquipmentAt(equipment.getSlot()) == equipment;
  }
}
