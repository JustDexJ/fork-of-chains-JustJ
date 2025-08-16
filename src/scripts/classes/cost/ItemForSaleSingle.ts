import type { ItemKey } from "../inventory/Item";
import type { Market, MarketKey } from "../market/Market";

export default class ItemForSaleSingle extends Cost {
  item_key: ItemKey;
  market_key: MarketKey;

  constructor(market: Market | MarketKey, item: Item | ItemKey) {
    super();

    if (!market) throw new Error(`Missing market in itemforsale`);
    if (!item) throw new Error(`Missing item for item for sale in ${market}`);

    this.item_key = resolveKey(item);
    this.market_key = resolveKey(market);
  }

  override text() {
    return `setup.qc.ItemForSaleSingle('${this.item_key}')`;
  }

  override apply(context: CostContext) {
    let market = this.getMarket();
    let item = setup.item[this.item_key];
    new setup.MarketObject(
      item,
      /* price = */ item.getValue() ?? 0,
      setup.MARKET_OBJECT_ITEM_EXPIRATION,
      market,
      context,
    );
  }

  getMarket(): Market<Item> {
    return State.variables.market[this.market_key] as Market<Item>;
  }

  override explain(context: CostContext) {
    const item = setup.item[this.item_key];
    return `${item.rep()} in ${this.getMarket().rep()}`;
  }
}
