import type { EQUIPMENT_POOL_GROUP_DEFINITIONS } from "../../data/equipments/_equipmentpools";
import { EQUIPMENT_POOL_DEFINITIONS } from "../../data/equipments/_index";
import { rng } from "../../util/rng";
import { TwineClass } from "../_TwineClass";
import type { Equipment, EquipmentKey } from "./Equipment";

export interface EquipmentPoolDefinition {
  chances: ChanceObject<string>;
}

//export type EquipmentPoolKey = BrandedType<string, "EquipmentPoolKey">;
export type EquipmentPoolKey =
  | keyof typeof EQUIPMENT_POOL_GROUP_DEFINITIONS
  | keyof typeof EQUIPMENT_POOL_DEFINITIONS;

export class EquipmentPool extends TwineClass {
  key: EquipmentPoolKey;

  /** equip_chances: {equipment_key: chance} */
  equip_chances: ChanceObject<EquipmentKey>;

  constructor(key: string, def: Readonly<EquipmentPoolDefinition>) {
    super();

    this.key = key as EquipmentPoolKey;
    this.equip_chances = def.chances;

    if (key in setup.equipmentpool) {
      throw new Error(`Duplicate equipment pool key ${key}`);
    }
    setup.equipmentpool[key as EquipmentPoolKey] = this;
  }

  getName(): string {
    return this.key;
  }

  getRepMacro() {
    return "equipmentpoolcard";
  }

  rep(): string {
    return setup.repMessage(this);
  }
  repJSX(): DOM.Node {
    return setup.repObjectJSX(this);
  }

  getEquipmentChances(is_normalize?: boolean): ChanceArray<EquipmentKey> {
    const chances = objectEntries(
      this.equip_chances,
    ) as ChanceArray<EquipmentKey>;

    if (is_normalize) {
      setup.rng.normalizeChanceArray(chances);
    }
    return chances;
  }

  getAverageValue(): number {
    const chances_copy = this.getEquipmentChances(/* normalize = */ true);
    let value = 0.0;
    for (const [equipment_key, chance] of chances_copy) {
      value += chance * (setup.equipment[equipment_key].getValue() || 0);
    }
    return Math.round(value);
  }

  generateEquipment(): Equipment {
    let equip_key = rng.sampleObject(this.equip_chances, true)!;
    return setup.equipment[equip_key];
  }
}
