import type {
  EquipmentPool,
  EquipmentPoolKey,
} from "../../equipment/EquipmentPool";

export default class Equipment extends Cost {
  pool_key: EquipmentPoolKey;

  constructor(equipment_pool: EquipmentPool | EquipmentPoolKey) {
    super();

    if (!equipment_pool) throw new Error(`Null equipment pool`);
    this.pool_key = resolveKey(equipment_pool);
  }

  override text() {
    return `setup.qc.Equipment(setup.equipmentpool.${this.pool_key})`;
  }

  override apply(context?: CostContext) {
    let pool = setup.equipmentpool[this.pool_key];
    let equip = pool.generateEquipment();
    State.variables.armory.addEquipment(equip);
  }

  override explain() {
    let pool = setup.equipmentpool[this.pool_key];
    return `Gain an equipment from ${pool.rep()}`;
  }
}
