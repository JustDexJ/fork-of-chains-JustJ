import { Match, Show, Switch } from "solid-js";
import type { Furniture } from "../../classes/furniture/Furniture";
import type { ItemUnitUsable } from "../../classes/inventory/subtypes/ItemUnitUsable";
import type { ItemUsable } from "../../classes/inventory/subtypes/ItemUsable";
import { Message, TweeSpan } from "../components/common";
import {
  MenuItemAction,
  MenuItemDanger,
  MenuItemExtras,
  MenuItemText,
  MenuItemTitle,
  MenuItemToolbar,
} from "../components/menubar/MenuItem";
import { domCardRep } from "../util/cardnamerep";
import { RestrictionsCard } from "./RestrictionsCard";

const ItemNameActionMenu: Component<{ item: Item; show_actions?: boolean }> = (
  props,
) => {
  return (
    <MenuItemToolbar>
      <MenuItemTitle
        text={
          <>
            {domCardRep(props.item, true)} × {props.item.getOwnedNumber()}
          </>
        }
      />

      <Show when={props.item.getValue()}>
        <MenuItemText text={setup.DOM.Util.money(props.item.getValue()!)} />
      </Show>

      <Show when={props.show_actions && props.item.isUsable()}>
        <MenuItemAction
          text="Use"
          tooltip="Consume this item to use its effect"
          callback={() => {
            if (props.item instanceof setup.ItemUnitUsable) {
              State.variables.gUseItem_key = props.item.key;
              setup.DOM.Nav.goto("ItemUnitUsableUse");
            } else if (props.item instanceof setup.ItemUsable) {
              props.item.use();
              setup.DOM.Nav.goto();
            }
          }}
        />
      </Show>

      <Show
        when={
          props.show_actions &&
          props.item.getSellValue() &&
          State.variables.fort.player.isHasBuilding(
            setup.buildingtemplate.bazaar,
          )
        }
      >
        <MenuItemDanger
          text={<>Sell ({setup.DOM.Util.money(props.item.getSellValue())})</>}
          tooltip="Sell this item for a profit"
          callback={() => {
            State.variables.inventory.sell(props.item);
            setup.DOM.Nav.goto();
          }}
        />
      </Show>

      <Show when={State.variables.gDebug}>
        <MenuItemExtras>
          <MenuItemDanger
            text="(Debug) Remove"
            callback={() => {
              State.variables.inventory.removeItem(props.item);
              setup.DOM.Nav.goto();
            }}
          />
        </MenuItemExtras>
      </Show>
    </MenuItemToolbar>
  );
};

const ItemDescriptionFragment: Component<{ item: Item }> = (props) => {
  return <TweeSpan>{props.item.getDescription()}</TweeSpan>;
};

export const ItemCompactCard = ItemNameActionMenu;

export const ItemCard: Component<{ item: Item; show_actions?: boolean }> = (
  props,
) => {
  return (
    <div class="card itemcard">
      <ItemNameActionMenu {...props} />

      <Switch>
        <Match when={props.item instanceof setup.Furniture}>
          <div>
            {setup.SkillHelper.explainSkills(
              (props.item as Furniture).getSkillMods(),
            )}
          </div>
        </Match>

        <Match when={props.item instanceof setup.ItemUsable}>
          <RestrictionsCard
            restrictions={(props.item as ItemUsable).getPrerequisites()}
          />
        </Match>

        <Match when={props.item instanceof setup.ItemUnitUsable}>
          <RestrictionsCard
            restrictions={(props.item as ItemUnitUsable).getUnitRestrictions()}
            is_show_all={true}
          />
        </Match>
      </Switch>

      {/* shorten desc? */}
      <Show
        when={
          props.show_actions &&
          State.variables.menufilter.get("item", "display") == "short"
        }
        fallback={
          <div>
            <ItemDescriptionFragment item={props.item} />
          </div>
        }
      >
        <div>
          <Message label="(description)">
            <ItemDescriptionFragment item={props.item} />
          </Message>
        </div>
      </Show>
    </div>
  );
};

export default {
  item(item_or_key: Item | ItemKey, show_actions?: boolean): DOM.Attachable {
    const item = resolveObject(item_or_key, setup.item);
    return setup.DOM.renderComponent(ItemCard, { item, show_actions });
  },

  itemcompact(item: Item, show_actions?: boolean): DOM.Attachable {
    return setup.DOM.renderComponent(ItemNameActionMenu, {
      item,
      show_actions,
    });
  },
};
