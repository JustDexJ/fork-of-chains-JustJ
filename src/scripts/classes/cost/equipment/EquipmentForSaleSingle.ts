import type { Equipment, EquipmentKey } from "../../equipment/Equipment";
import type { Market } from "../../market/Market";

export default class EquipmentForSaleSingle extends Cost {
  equipment_key: EquipmentKey;

  constructor(equipment: Equipment | EquipmentKey) {
    super();

    if (!equipment) throw new Error(`Missing equipment for equipment for sale`);

    this.equipment_key = resolveKey(equipment);
  }

  override text() {
    return `setup.qc.EquipmentForSaleSingle('${this.equipment_key}')`;
  }

  override apply(context: CostContext) {
    const market = this.getMarket();
    const equipment = setup.equipment[this.equipment_key];
    new setup.MarketObject(
      equipment,
      /* price = */ equipment.getValue(),
      setup.MARKET_OBJECT_EQUIPMENT_EXPIRATION,
      market,
      context,
    );
  }

  getMarket(): Market<Equipment> {
    return State.variables.market.equipmentmarket;
  }

  override explain(context: CostContext) {
    const equipment = setup.equipment[this.equipment_key];
    return `${this.getMarket().rep()} now sells ${equipment.rep()}`;
  }
}
