import type { Equipment } from "../../equipment/Equipment";
import { Market } from "../Market";
import type { MarketObject } from "../MarketObject";

export class MarketEquipment extends Market<Equipment> {
  constructor(key: string, name: string) {
    super(key, name, /* varname = */ null, /* setupvarname = */ "equipment");
  }

  override doAddObject(market_object: MarketObject<Equipment>) {
    let equipment = market_object.getObject();
    State.variables.armory.addEquipment(equipment);
  }
}
