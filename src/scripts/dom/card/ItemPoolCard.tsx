import { For } from "solid-js";
import type { ItemPool, ItemPoolKey } from "../../classes/inventory/ItemPool";
import {
  MenuItemText,
  MenuItemTitle,
  MenuItemToolbar,
} from "../components/menubar/MenuItem";
import { domCardRep } from "../util/cardnamerep";

const ItemPoolNameActionMenu: Component<{
  pool: ItemPool;
  show_actions?: boolean;
}> = (props) => {
  return (
    <MenuItemToolbar>
      <MenuItemTitle text={domCardRep(props.pool)} />

      <MenuItemText
        text={
          <>
            Average value: {setup.DOM.Util.money(props.pool.getAverageValue())}
          </>
        }
      />
    </MenuItemToolbar>
  );
};

export const ItemPoolCard: Component<{
  pool: ItemPool;
  show_actions?: boolean;
}> = (props) => {
  return (
    <div class="card itemcard">
      <ItemPoolNameActionMenu {...props} />

      <For each={props.pool.getItemChances(/* normalize = */ true)}>
        {([item_key, chance]) => (
          <div>
            {setup.item[item_key].repJSX()}: {setup.DOM.Text.percentage(chance)}
          </div>
        )}
      </For>
    </div>
  );
};

export default {
  itempool(
    pool_or_key: ItemPool | ItemPoolKey,
    show_actions?: boolean,
  ): DOM.Node {
    const pool = resolveObject(pool_or_key, setup.itempool);
    return setup.DOM.renderComponent(ItemPoolCard, { pool, show_actions });
  },
};
