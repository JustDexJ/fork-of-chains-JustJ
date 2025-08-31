import { For, Match, Switch } from "solid-js";
import type {
  EquipmentPool,
  EquipmentPoolKey,
} from "../../classes/equipment/EquipmentPool";
import type { EquipmentPoolGroup } from "../../classes/equipment/EquipmentPoolGroup";
import {
  MenuItemText,
  MenuItemTitle,
  MenuItemToolbar,
} from "../components/menubar/MenuItem";
import { domCardRep } from "../util/cardnamerep";

const EquipmentPoolNameActionMenu: Component<{
  pool: EquipmentPool;
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

export const EquipmentPoolCard: Component<{
  pool: EquipmentPool;
  show_actions?: boolean;
}> = (props) => {
  return (
    <div class="card equipmentcard">
      <EquipmentPoolNameActionMenu {...props} />

      <Switch
        fallback={(() => {
          throw new Error(`Unknown equipment pool/group: ${props.pool}`);
        })()}
      >
        <Match when={props.pool instanceof setup.EquipmentPoolGroup}>
          <For
            each={(props.pool as EquipmentPoolGroup).getEquipmentPoolChances(
              /* normalize = */ true,
            )}
          >
            {([pool_key, chance]) => (
              <div>
                {setup.equipmentpool[pool_key].repJSX()}:
                {setup.DOM.Text.percentage(chance)}
              </div>
            )}
          </For>
        </Match>

        <Match when={props.pool instanceof setup.EquipmentPool}>
          <For
            each={(props.pool as EquipmentPool).getEquipmentChances(
              /* normalize = */ true,
            )}
          >
            {([equipment_key, chance]) => (
              <div>
                {setup.equipment[equipment_key].repJSX()}:
                {setup.DOM.Text.percentage(chance)}
              </div>
            )}
          </For>
        </Match>
      </Switch>
    </div>
  );
};

export default {
  equipmentpool(
    pool_or_key: EquipmentPool | EquipmentPoolKey,
    show_actions?: boolean,
  ): DOM.Attachable {
    const pool = resolveObject(pool_or_key, setup.equipmentpool);
    return setup.DOM.renderComponent(EquipmentPoolCard, { pool, show_actions });
  },
};
