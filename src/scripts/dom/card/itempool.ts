import type { ItemPool, ItemPoolKey } from "../../classes/inventory/ItemPool";
import { menuItemExtras, menuItemText, menuItemTitle } from "../../ui/menuitem";
import { domCardRep } from "../util/cardnamerep";

function itemPoolNameFragment(pool: ItemPool): DOM.Node {
  return html`${domCardRep(pool)}`;
}

function itemPoolNameActionMenu(
  pool: ItemPool,
  show_actions?: boolean,
): JQuery[] {
  const menus: JQuery[] = [];

  menus.push(
    menuItemTitle({
      text: itemPoolNameFragment(pool),
    }),
  );

  const average_value = pool.getAverageValue();
  menus.push(
    menuItemText({
      text: html`Average value: ${setup.DOM.Util.money(average_value)}`,
    }),
  );

  const extras: JQuery[] = [];

  if (extras.length) {
    menus.push(
      menuItemExtras({
        children: extras,
      }),
    );
  }

  return menus;
}

export default {
  itempool(
    pool_or_key: ItemPool | ItemPoolKey,
    show_actions?: boolean,
  ): DOM.Node {
    const pool = resolveObject(pool_or_key, setup.itempool);

    const fragments: DOM.Attachable[] = [];

    fragments.push(
      setup.DOM.Util.menuItemToolbar(
        itemPoolNameActionMenu(pool, show_actions),
      ),
    );

    for (const [item_key, chance] of pool.getItemChances(
      /* normalize = */ true,
    )) {
      fragments.push(html`
        <div>
          ${setup.item[item_key].rep()}: ${setup.DOM.Text.percentage(chance)}
        </div>
      `);
    }

    const divclass = `card itemcard`;
    return setup.DOM.create("div", { class: divclass }, fragments);
  },
};
