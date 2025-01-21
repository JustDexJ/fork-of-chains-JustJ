import { rng } from "../../util/rng";
import type { Item, ItemKey } from "./Item";

export type ItemPoolKey = BrandedType<string, "ItemPoolKey">;

// Don't put to class. ItemPoolGroup can be a thing in the future.
export class ItemPool {
  key: ItemPoolKey;

  /** item_chances: {item_key: chance} */
  item_chances: ChanceObject<ItemKey>;

  constructor(key: string, item_chances: ChanceObject<ItemKey>) {
    this.key = key as ItemPoolKey;
    this.item_chances = item_chances;

    if (key in setup.itempool) {
      throw new Error(`Duplicate item pool key ${key}`);
    }
    setup.itempool[key as ItemPoolKey] = this;
  }

  getItemChances(is_normalize?: boolean): ChanceArray<ItemKey> {
    const chances: ChanceArray<ItemKey> = objectEntries(this.item_chances);
    if (is_normalize) {
      rng.normalizeChanceArray(chances);
    }
    return chances;
  }

  getName(): string {
    return this.key;
  }

  getRepMacro() {
    return "itempoolcard";
  }

  rep(): string {
    return setup.repMessage(this);
  }

  getAverageValue(): number {
    const chances_copy = this.getItemChances(/* normalize = */ true);
    let value = 0.0;
    for (const [item_key, chance] of chances_copy) {
      value += chance * (setup.item[item_key].getValue() || 0);
    }
    return Math.round(value);
  }

  generateItem(): Item {
    let item_key = rng.sampleObject(this.item_chances, true)!;
    return setup.item[item_key];
  }
}
