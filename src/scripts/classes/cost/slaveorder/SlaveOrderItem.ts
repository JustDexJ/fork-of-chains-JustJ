import type { ItemKey } from "../../inventory/Item";
import { SlaveOrderItem as SlaveOrderItem_ } from "../../slaveorder/SlaveOrderItem";
import { SlaveOrderTemplate } from "./SlaveOrderTemplate";

/**
 * Slave order that reward items instead of money
 */
export default class SlaveOrderItem extends SlaveOrderTemplate {
  item_key: ItemKey;
  maximum: number;

  constructor(item: Item | ItemKey, maximum: number) {
    super();

    this.item_key = resolveKey(item);
    this.maximum = maximum;
  }

  override text() {
    return `setup.qc.SlaveOrderItem('${this.item_key}')`;
  }

  getItem(): Item {
    return setup.item[this.item_key];
  }

  override apply(context: CostContext) {
    return new SlaveOrderItem_(
      this.getName(context),
      this.getCompany(context),
      this.getCriteria(context),
      this.getBasePrice(context),
      this.getTraitMulti(context),
      this.getValueMulti(context),
      this.getExpiresIn(context),
      this.getFulfilledOutcomes(context),
      this.getUnfulfilledOutcomes(context),
      this.getDestinationUnitGroup(context),
      this.getItem(),
      this.maximum,
    );
  }
}
