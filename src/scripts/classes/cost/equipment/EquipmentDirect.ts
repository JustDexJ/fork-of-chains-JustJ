import type { Equipment, EquipmentKey } from "../../equipment/Equipment";

export default class EquipmentDirect extends Cost {
  equipment_key: EquipmentKey;

  constructor(equipment: Equipment | EquipmentKey) {
    super();

    if (!equipment) throw new Error(`Null equipment pool`);
    this.equipment_key = resolveKey(equipment);
  }

  override text(): string {
    return `setup.qc.EquipmentDirect('${this.equipment_key}')`;
  }

  override apply(context?: CostContext) {
    State.variables.armory.addEquipment(setup.equipment[this.equipment_key]);
  }

  override explain(): string {
    let equipment = setup.equipment[this.equipment_key];
    return `Gain ${equipment.rep()}`;
  }
}
