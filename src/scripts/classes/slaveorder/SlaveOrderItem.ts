import type { Company, CompanyKey } from "../Company";
import type { UnitCriteria } from "../criteria/UnitCriteria";
import { SlaveOrder } from "./SlaveOrder";

/**
 * Slave order that rewards item instead of money
 */
export class SlaveOrderItem extends SlaveOrder {
  item_key: ItemKey;
  maximum: number;

  constructor(
    name: string,
    source_company: Company | CompanyKey,
    criteria: UnitCriteria,
    base_price: number,
    trait_multiplier: number,
    value_multiplier: number,
    expires_in: number,
    fulfilled_outcomes: Cost[],
    unfulfilled_outcomes: Cost[],
    destination_unit_group: any,
    item: Item,
    maximum: number,
  ) {
    super(
      name,
      source_company,
      criteria,
      base_price,
      trait_multiplier,
      value_multiplier,
      expires_in,
      fulfilled_outcomes,
      unfulfilled_outcomes,
      destination_unit_group,
    );
    this.item_key = item.key;
    this.maximum = maximum;
  }

  getMaximum(): number {
    return this.maximum;
  }

  getItem(): Item {
    return setup.item[this.item_key];
  }

  fulfillMoney(price: number): void {
    const items = Math.min(
      Math.floor(price / this.getItem().getValue()!),
      this.getMaximum(),
    );
    const cost = setup.qc.Item(this.getItem());
    for (let i = 0; i < items; ++i) {
      cost.apply();
    }
  }

  isCanFulfill(unit: Unit): boolean {
    const value = this.getFulfillPrice(unit);
    if (value < this.getItem().getValue()!) {
      return false;
    }

    return super.isCanFulfill(unit);
  }
}
