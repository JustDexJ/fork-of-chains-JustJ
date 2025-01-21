import type { MenuKey } from "../../classes/filter/_filter";
import type { Market } from "../../classes/market/Market";
import type {
  MarketableObject,
  MarketObject,
} from "../../classes/market/MarketObject";
import { MarketEquipment } from "../../classes/market/subtypes/MarketEquipment";
import { MarketItem } from "../../classes/market/subtypes/MarketItem";
import { MarketUnit } from "../../classes/market/subtypes/MarketUnit";
import {
  menuItemAction,
  menuItemDanger,
  menuItemExtras,
  menuItemText,
  menuItemTitle,
} from "../../ui/menuitem";
import { domCardRep } from "../util/cardnamerep";

function marketObjectNameActionMenu(
  market: Market,
  market_object: MarketObject,
  market_refresh_callback: () => void,
  show_actions?: boolean,
  is_can_delete?: boolean,
): JQuery[] {
  const menus: JQuery[] = [];
  const extras: JQuery[] = [];

  menus.push(
    menuItemTitle({
      text: market_object.getRarity().rep(),
    }),
  );

  if ("rep" in market_object.getObject()) {
    menus.push(
      menuItemTitle({
        text: domCardRep(market_object.getObject()),
      }),
    );
  }

  const price = market_object.getPrice();
  if (show_actions) {
    if (market.isCanBuyObject(market_object)) {
      menus.push(
        menuItemAction({
          text: price
            ? html`Buy for ${setup.DOM.Util.money(price)}`
            : html`Get for ${setup.DOM.Text.successlite("Free")}`,
          callback: () => {
            setup.DevToolHelper.saveScrollPos();
            market.buyObject(market_object);
            market_refresh_callback();
          },
        }),
      );
    } else {
      menus.push(
        menuItemText({
          text: html`Cannot get
          (${price
            ? setup.DOM.Util.money(price)
            : setup.DOM.Text.successlite("Free")})`,
        }),
      );
    }
  }

  if (market_object.isInfinite()) {
    menus.push(
      menuItemText({
        text: setup.DOM.create(
          "span",
          {
            "data-tooltip":
              "There are no limit how many times you can purchase this object",
          },
          html`Infinite`,
        ),
      }),
    );
  } else {
    if (is_can_delete && show_actions) {
      extras.push(
        menuItemDanger({
          text: `Remove`,
          callback: () => {
            market.removeObjectAndCheckDelete(market_object);
            market_refresh_callback();
          },
        }),
      );
    }

    const expires_in = market_object.getExpiresIn();
    if (expires_in) {
      menus.push(
        menuItemText({
          text: setup.DOM.create(
            "span",
            {
              "data-tooltip":
                "This market object will expire in this many weeks",
            },
            html`${expires_in} wk${expires_in > 1 ? "s" : ""} left`,
          ),
        }),
      );
    } else {
      menus.push(
        menuItemText({
          text: `Never expires`,
        }),
      );
    }
  }

  const rep_source = market_object.repSource();
  if (rep_source) {
    menus.push(
      menuItemText({
        text: `From: ${rep_source}`,
      }),
    );
  }

  if (extras.length) {
    menus.push(
      menuItemExtras({
        children: extras,
      }),
    );
  }

  return menus;
}

function marketObjectFragment<T extends MarketableObject>(
  market: Market,
  market_object: MarketObject<T>,
  market_refresh_callback: () => void,
  market_object_display_callback: (object: T) => DOM.Attachable,
  show_actions?: boolean,
  is_can_delete?: boolean,
): DOM.Node {
  return html`
    <div
      class="marketobjectcard ${market_object
        .getRarity()
        .getBorderColorClass()}"
    >
      ${setup.DOM.Util.menuItemToolbar(
        marketObjectNameActionMenu(
          market,
          market_object,
          market_refresh_callback,
          show_actions,
          is_can_delete,
        ),
      )}
      <div>${market_object_display_callback(market_object.getObject())}</div>
    </div>
  `;
}

function marketObjectCompactFragment(
  market: Market,
  market_object: MarketObject,
  market_refresh_callback: () => void,
  show_actions?: boolean,
  is_can_delete?: boolean,
): DOM.Node {
  return setup.DOM.Util.menuItemToolbar(
    marketObjectNameActionMenu(
      market,
      market_object,
      market_refresh_callback,
      show_actions,
      is_can_delete,
    ),
  );
}

export default {
  market({
    market,
    on_buy_callback,
    is_can_delete,
  }: {
    market: Market;
    is_can_delete?: boolean;
    /** if returns True, then won't refresh market. */
    on_buy_callback?: () => boolean;
  }): DOM.Node {
    const market_refresh_callback = () => {
      if (on_buy_callback && on_buy_callback()) return;
      setup.DOM.Nav.goto();
    };

    let menu: MenuKey;
    let display_callback: (object: any) => DOM.Node;
    if (market instanceof MarketEquipment) {
      menu = "equipmentmarket";
      display_callback = (equipment) => setup.DOM.Card.equipment(equipment);
    } else if (market instanceof MarketItem) {
      menu = "itemmarket";
      display_callback = (item) => setup.DOM.Card.item(item);
    } else if (market instanceof MarketUnit) {
      menu = "unitmarket";
      display_callback = (unit) => setup.DOM.Card.unit(unit);
    } else {
      throw new Error(`Unknown market: ${market.key} `);
    }

    const market_objects = market.getMarketObjects();

    let display_objects = market.getMarketObjects();
    if (market instanceof MarketItem) {
      const availability = State.variables.menufilter.get(menu, "availability");
      if (availability == "limited") {
        display_objects = display_objects.filter(
          (item) => !item.isInfinite(),
        ) as any;
      } else if (availability == "unlimited") {
        display_objects = display_objects.filter((item) =>
          item.isInfinite(),
        ) as any;
      }
    }

    const for_filter = display_objects.map((market_object) =>
      market_object.getObject(),
    );
    const market_display_settings = State.variables.menufilter.get(
      menu,
      "display",
    );
    const show_actions = true;

    return setup.DOM.Util.async(() => {
      const res = setup.DOM.Util.filterAll({
        menu: menu,
        filter_objects: for_filter,
        display_objects: display_objects,
        display_callback: (display_obj: MarketObject<any>) => {
          if (market_display_settings == "compact") {
            return marketObjectCompactFragment(
              market,
              display_obj,
              market_refresh_callback,
              show_actions,
              is_can_delete,
            );
          } else {
            return marketObjectFragment(
              market,
              display_obj,
              market_refresh_callback,
              display_callback,
              show_actions,
              is_can_delete,
            );
          }
        },
      });
      setup.DevToolHelper.restoreScrollPos();
      return res;
    });
  },
};
