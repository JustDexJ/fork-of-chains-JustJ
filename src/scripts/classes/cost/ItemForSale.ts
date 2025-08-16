import type { ItemPool, ItemPoolKey } from "../inventory/ItemPool";
import type { Market, MarketKey } from "../market/Market";

export default class ItemForSale extends Cost {
  item_pool_key: ItemPoolKey;
  market_key: MarketKey;
  amount: number;
  markup: number;

  constructor(
    market: Market | MarketKey,
    item_pool: ItemPool | ItemPoolKey,
    amount?: number,
    markup?: number,
  ) {
    super();

    if (!market) throw new Error(`Missing market in itemforsale`);
    if (!item_pool)
      throw new Error(`Missing item pool for item for sale in ${market}`);

    this.item_pool_key = resolveKey(item_pool);
    this.market_key = resolveKey(market);
    this.markup = markup || 1.0;
    this.amount = amount || 1;
  }

  override text() {
    return `setup.qc.ItemForSale('${this.market_key}', '${this.item_pool_key}', ${this.amount}, ${this.markup})`;
  }

  override apply(context: CostContext) {
    let market = this.getMarket();
    let pool = setup.itempool[this.item_pool_key];
    for (let i = 0; i < this.amount; ++i) {
      let item = pool.generateItem();
      new setup.MarketObject(
        item,
        /* price = */ Math.round((item.getValue() ?? 0) * this.markup),
        setup.MARKET_OBJECT_ITEM_EXPIRATION,
        market,
        context,
      );
    }
  }

  getMarket(): Market<Item> {
    return State.variables.market[this.market_key] as Market<Item>;
  }

  override explain(context: CostContext) {
    return `${this.amount} new items in ${this.getMarket().rep()} at ${this.markup}x price`;
  }
}
