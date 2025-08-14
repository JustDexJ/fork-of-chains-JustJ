import type { EquipmentPool } from "../../classes/equipment/EquipmentPool";
import { menuItemExtras, menuItemText, menuItemTitle } from "../../ui/menuitem";
import { domCardRep } from "../util/cardnamerep";

function equipmentPoolNameFragment(pool: EquipmentPool): DOM.Node {
  return html`${domCardRep(pool)}`;
}

function equipmentPoolNameActionMenu(
  pool: EquipmentPool,
  hide_actions?: boolean,
): JQuery[] {
  const menus: JQuery[] = [];

  menus.push(
    menuItemTitle({
      text: equipmentPoolNameFragment(pool),
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
  equipmentpool(pool: EquipmentPool, hide_actions?: boolean): DOM.Node {
    const fragments: DOM.Attachable[] = [];

    fragments.push(
      setup.DOM.Util.menuItemToolbar(
        equipmentPoolNameActionMenu(pool, hide_actions),
      ),
    );

    if (pool instanceof setup.EquipmentPoolGroup) {
      for (const [pool_key, chance] of pool.getEquipmentPoolChances(
        /* normalize = */ true,
      )) {
        fragments.push(html`
          <div>
            ${setup.equipmentpool[pool_key].rep()}:
            ${setup.DOM.Text.percentage(chance)}
          </div>
        `);
      }
    } else if (pool instanceof setup.EquipmentPool) {
      for (const [equipment_key, chance] of pool.getEquipmentChances(
        /* normalize = */ true,
      )) {
        fragments.push(html`
          <div>
            ${setup.equipment[equipment_key].rep()}:
            ${setup.DOM.Text.percentage(chance)}
          </div>
        `);
      }
    } else {
      throw new Error(`Unknown equipment pool/group: ${pool}`);
    }

    const divclass = `card equipmentcard`;
    return setup.DOM.create("div", { class: divclass }, fragments);
  },
};
