import type { EQUIPMENT_POOL_DEFINITIONS } from "../../data/equipments/_index";
import type { Equipment } from "./Equipment";
import { EquipmentPool, type EquipmentPoolKey } from "./EquipmentPool";

export interface EquipmentPoolGroupDefinition {
  chances: ChanceObject<keyof typeof EQUIPMENT_POOL_DEFINITIONS>;
}

export class EquipmentPoolGroup extends EquipmentPool {
  group_chances: ChanceObject<EquipmentPoolKey>;

  constructor(key: string, def: Readonly<EquipmentPoolGroupDefinition>) {
    super(key, {} as any /* unused */);

    // note: this is behaved as an equipment pool
    // group_chances: {equipment_pool_key: chance}

    for (let groupkey in def.chances) {
      if (!(groupkey in setup.equipmentpool))
        throw new Error(`group ${groupkey} not recognized in ${key}`);
    }
    this.group_chances = def.chances;
  }

  getEquipmentPoolChances(
    should_normalize?: boolean,
  ): ChanceArray<EquipmentPoolKey> {
    const chances = objectEntries(
      this.group_chances,
    ) as ChanceArray<EquipmentPoolKey>;

    if (should_normalize) {
      setup.rng.normalizeChanceArray(chances);
    }
    return chances;
  }

  override generateEquipment(): Equipment {
    let key = setup.rng.sampleObject(this.group_chances, true)!;
    let pool = setup.equipmentpool[key];
    return pool.generateEquipment();
  }

  override getAverageValue(): number {
    let average = 0.0;
    for (const [pool_key, chance] of this.getEquipmentPoolChances()) {
      average += chance * setup.equipmentpool[pool_key].getAverageValue();
    }
    return Math.round(average);
  }
}
