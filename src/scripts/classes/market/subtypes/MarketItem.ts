import type { Item } from "../../inventory/Item";
import { Market } from "../Market";
import type { MarketObject } from "../MarketObject";

export class MarketItem extends Market<Item> {
  constructor(key: string, name: string) {
    super(key, name, /* varname = */ null, /* setupvarname = */ "item");
  }

  override doAddObject(market_object: MarketObject<Item>) {
    let item = market_object.getObject();
    State.variables.inventory.addItem(item);
  }

  static advanceWeek() {
    if (State.variables.fort.player.isHasBuilding("alchemistshop")) {
      for (const item of Object.values(setup.item)) {
        if (item.isAvailableInAlchemistShop()) {
          const itemValue = item.getValue();
          if (
            itemValue &&
            State.variables.statistics.isItemAcquired(item) &&
            !State.variables.statistics.isItemInAlchemistShop(item)
          ) {
            State.variables.statistics.putInAlchemistShop(item);

            new setup.MarketObject(
              item,
              /* price = */ Math.round(
                itemValue * setup.ITEM_MARKET_ALCHEMIST_POTION_MARKUP,
              ),
              setup.INFINITY,
              State.variables.market.itemmarket,
              setup.buildingtemplate.alchemistshop,
            );
          }
        }
      }
    }
  }
}
