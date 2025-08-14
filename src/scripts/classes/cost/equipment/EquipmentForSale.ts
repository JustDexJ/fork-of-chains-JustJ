import type { Equipment } from "../../equipment/Equipment";
import type {
  EquipmentPool,
  EquipmentPoolKey,
} from "../../equipment/EquipmentPool";
import type { Market } from "../../market/Market";

export default class EquipmentForSale extends Cost {
  equipment_pool_key: EquipmentPoolKey;

  constructor(
    equipment_pool: EquipmentPool | EquipmentPoolKey,
    public amount: number = 1,
    public markup: number = 1.0,
  ) {
    super();

    if (!equipment_pool)
      throw new Error(`Missing equipment pool for equipment for sale`);

    this.equipment_pool_key = resolveKey(equipment_pool);
  }

  override text() {
    return `setup.qc.EquipmentForSale('${this.equipment_pool_key}', ${this.amount}, ${this.markup})`;
  }

  override apply(context: CostContext) {
    let market = this.getMarket();
    let pool = setup.equipmentpool[this.equipment_pool_key];
    for (let i = 0; i < this.amount; ++i) {
      let equipment = pool.generateEquipment();
      new setup.MarketObject(
        equipment,
        /* price = */ Math.round(equipment.getValue() * this.markup),
        setup.MARKET_OBJECT_EQUIPMENT_EXPIRATION,
        market,
        context,
      );
    }
  }

  getMarket(): Market<Equipment> {
    return State.variables.market.equipmentmarket;
  }

  override explain(context: CostContext) {
    return `${this.amount} new items in ${this.getMarket().rep()} at ${this.markup}x price`;
  }
}
