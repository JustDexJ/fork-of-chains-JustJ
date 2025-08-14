import type { Equipment, EquipmentKey } from "../../equipment/Equipment";

export default class EquipmentLose extends Cost {
  equipment_key: EquipmentKey;

  constructor(equipment: Equipment) {
    super();

    this.equipment_key = resolveKey(equipment);
  }

  override text() {
    return `setup.qc.EquipmentLose(setup.equipment.${this.equipment_key})`;
  }

  getEquipment(): Equipment {
    return setup.equipment[this.equipment_key];
  }

  override apply(context: CostContext) {
    const equipment = this.getEquipment();
    if (State.variables.armory.getEquipmentCount(equipment)) {
      State.variables.armory.removeEquipment(equipment, 1);
    }
  }

  override explain() {
    return `Lose ${this.getEquipment().rep()}`;
  }
}
