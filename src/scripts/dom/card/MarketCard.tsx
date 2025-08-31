import { createMemo, Show } from "solid-js";
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
  MenuItemAction,
  MenuItemDanger,
  MenuItemText,
  MenuItemTitle,
  MenuItemToolbar,
} from "../components/menubar/MenuItem";
import { FilterableList } from "../components/misc/FilterableList";
import { domCardRep } from "../util/cardnamerep";
import { EquipmentCard } from "./EquipmentCard";
import { ItemCard } from "./ItemCard";
import { UnitCard } from "./UnitCard";

const MarketObjectNameActionMenu: Component<{
  market: Market;
  market_object: MarketObject;
  market_refresh_callback: () => void;
  show_actions?: boolean;
  is_can_delete?: boolean;
}> = (props) => {
  return (
    <MenuItemToolbar>
      <MenuItemTitle text={props.market_object.getRarity().repJSX()} />

      <Show when={"rep" in props.market_object.getObject()}>
        <MenuItemTitle
          text={domCardRep(props.market_object.getObject() as any, true)}
        />
      </Show>

      <Show when={props.show_actions}>
        <Show
          when={props.market.isCanBuyObject(props.market_object)}
          fallback={
            <MenuItemText
              text={
                <>
                  Cannot get (
                  {props.market_object.getPrice()
                    ? setup.DOM.Util.money(props.market_object.getPrice())
                    : setup.DOM.Text.successlite("Free")}
                  )
                </>
              }
            />
          }
        >
          <MenuItemAction
            text={
              props.market_object.getPrice() ? (
                <>
                  Buy for {setup.DOM.Util.money(props.market_object.getPrice())}
                </>
              ) : (
                <>Get for {setup.DOM.Text.successlite("Free")}</>
              )
            }
            callback={() => {
              setup.DevToolHelper.saveScrollPos();
              props.market.buyObject(props.market_object);
              props.market_refresh_callback();
            }}
          />
        </Show>
      </Show>

      <Show
        when={!props.market_object.isInfinite()}
        fallback={
          <MenuItemText
            text={
              <span data-tooltip="There is no limit how many times you can purchase this object">
                Infinite
              </span>
            }
          />
        }
      >
        <Show when={props.is_can_delete && props.show_actions}>
          <MenuItemDanger
            text="Remove"
            callback={() => {
              props.market.removeObjectAndCheckDelete(props.market_object);
              props.market_refresh_callback();
            }}
          />

          <Show
            when={props.market_object.getExpiresIn()}
            fallback={<MenuItemText text="Never expires" />}
          >
            <MenuItemText
              text={
                <span data-tooltip="This market object will expire in this many weeks">
                  {props.market_object.getExpiresIn()} wk
                  {props.market_object.getExpiresIn() > 1 ? "s" : ""} left
                </span>
              }
            />
          </Show>
        </Show>
      </Show>

      <Show when={props.market_object.repSource()}>
        {(getRepSource) => <MenuItemText text={<>From: {getRepSource()}</>} />}
      </Show>
    </MenuItemToolbar>
  );
};

function MarketObjectFragment<T extends MarketableObject>(props: {
  market: Market;
  market_object: MarketObject<T>;
  market_refresh_callback: () => void;
  market_object_display_callback: (object: T) => DOM.JSXElement;
  show_actions?: boolean;
  is_can_delete?: boolean;
}): DOM.JSXElement {
  return (
    <div
      class={`marketobjectcard ${props.market_object
        .getRarity()
        .getBorderColorClass()}`}
    >
      <MarketObjectNameActionMenu
        market={props.market}
        market_object={props.market_object}
        market_refresh_callback={props.market_refresh_callback}
        show_actions={props.show_actions}
        is_can_delete={props.is_can_delete}
      />

      <div>
        {props.market_object_display_callback(props.market_object.getObject())}
      </div>
    </div>
  );
}

const MarketObjectCompactFragment: Component<{
  market: Market;
  market_object: MarketObject;
  market_refresh_callback: () => void;
  show_actions?: boolean;
  is_can_delete?: boolean;
}> = (props) => {
  return <MarketObjectNameActionMenu {...props} />;
};

export const MarketCard: Component<{
  market: Market;
  is_can_delete?: boolean;
  /** if returns True, then won't refresh market. */
  on_buy_callback?: () => boolean;
}> = (props) => {
  const market_refresh_callback = () => {
    if (props.on_buy_callback && props.on_buy_callback()) return;
    setup.DOM.Nav.goto();
  };

  const getState = createMemo(() => {
    let menu: MenuKey;
    let display_callback: (object: any) => DOM.JSXElement;
    if (props.market instanceof MarketEquipment) {
      menu = "equipmentmarket";
      display_callback = (equipment) => <EquipmentCard equipment={equipment} />;
    } else if (props.market instanceof MarketItem) {
      menu = "itemmarket";
      display_callback = (item) => <ItemCard item={item} />;
    } else if (props.market instanceof MarketUnit) {
      menu = "unitmarket";
      display_callback = (unit) => <UnitCard unit={unit} />;
    } else {
      throw new Error(`Unknown market: ${props.market.key} `);
    }

    return {
      menu,
      display_callback,
    };
  });

  const getDisplayObjects = createMemo(() => {
    let display_objects = props.market.getMarketObjects();
    if (props.market instanceof MarketItem) {
      const availability = State.variables.menufilter.get(
        getState().menu,
        "availability",
      );
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
    return display_objects;
  });

  return setup.DOM.Util.async(() => {
    const res = setup.DOM.renderComponent(FilterableList, {
      menu: getState().menu,
      filter_objects: getDisplayObjects().map((market_object) =>
        market_object.getObject(),
      ),
      display_objects: getDisplayObjects(),
      display_callback: (display_obj: MarketObject<any>) => {
        if (
          State.variables.menufilter.get(getState().menu, "display") ==
          "compact"
        ) {
          return (
            <MarketObjectCompactFragment
              market={props.market}
              market_object={display_obj}
              market_refresh_callback={market_refresh_callback}
              show_actions={true}
              is_can_delete={props.is_can_delete}
            />
          );
        } else {
          return (
            <MarketObjectFragment
              market={props.market}
              market_object={display_obj}
              market_refresh_callback={market_refresh_callback}
              market_object_display_callback={getState().display_callback}
              show_actions={true}
              is_can_delete={props.is_can_delete}
            />
          );
        }
      },
    });
    //setup.DevToolHelper.restoreScrollPos(); // TODO
    return res;
  });
};

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
  }): DOM.Attachable {
    return setup.DOM.renderComponent(MarketCard, {
      market,
      on_buy_callback,
      is_can_delete,
    });
  },
};
