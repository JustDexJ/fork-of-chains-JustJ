import { Show } from "solid-js";
import type { SlaveOrderKey } from "../../classes/slaveorder/SlaveOrder";
import type { SlaveOrderItem } from "../../classes/slaveorder/SlaveOrderItem";
import {
  MenuItemAction,
  MenuItemText,
  MenuItemTitle,
  MenuItemToolbar,
} from "../components/menubar/MenuItem";
import { domCardRep } from "../util/cardnamerep";
import { CostsCard } from "./CostsCard";
import { UnitCriteriaCard } from "./UnitCriteriaCard";

const SlaveOrderNameActionMenu: Component<{
  slave_order: SlaveOrder;
  show_actions?: boolean;
}> = (props) => {
  return (
    <MenuItemToolbar>
      <MenuItemTitle text={domCardRep(props.slave_order)} />

      <Show when={props.slave_order.isIgnored()}>
        <MenuItemText text="Ignored" />
      </Show>

      <Show when={props.show_actions}>
        <MenuItemAction
          text="Fulfill"
          tooltip="Fulfill this slave order with a unit"
          callback={() => {
            State.variables.gSlaveOrder_key = props.slave_order.key;
            setup.DOM.Nav.goto("SlaveOrderFulfill");
          }}
        />
      </Show>

      <Show when={props.slave_order.getSourceCompany()}>
        <MenuItemText
          text={<>from {props.slave_order.getSourceCompany()!.repJSX()}</>}
        />
      </Show>

      <Show
        when={!props.slave_order.isCannotExpire()}
        fallback={<MenuItemText text="Cannot expire" />}
      >
        <MenuItemText
          text={
            <span data-tooltip="Weeks before this slave order expires">
              {props.slave_order.getExpiresIn()} week
              {props.slave_order.getExpiresIn() > 1 ? "s" : ""}
            </span>
          }
        />
      </Show>

      <Show
        when={props.show_actions}
        fallback={
          <MenuItemText
            text="Ignored"
            checked={props.slave_order.isIgnored()}
          />
        }
      >
        <MenuItemAction
          text="Ignored"
          checked={props.slave_order.isIgnored()}
          callback={() => {
            props.slave_order.toggleIsIgnored();
            setup.DOM.Nav.goto();
          }}
        />
      </Show>
    </MenuItemToolbar>
  );
};

export const SlaveOrderCompactCard = SlaveOrderNameActionMenu;

export const SlaveOrderCard: Component<{
  slave_order: SlaveOrder;
  show_actions?: boolean;
}> = (props) => {
  return (
    <div class="slaveordercard card">
      <SlaveOrderNameActionMenu {...props} />

      <Show when={props.slave_order.getCriteria()}>
        <div>
          <UnitCriteriaCard criteria={props.slave_order.getCriteria()!} />
        </div>
      </Show>

      <Show when={props.slave_order.explainFulfilled()}>
        <div>Rewards: {props.slave_order.explainFulfilled()}</div>
      </Show>

      <Show when={props.slave_order instanceof setup.SlaveOrderItem}>
        <div>
          Rewards {(props.slave_order as SlaveOrderItem).getItem().repJSX()}{" "}
          instead of money (one item per{" "}
          {setup.DOM.Util.money(
            (props.slave_order as SlaveOrderItem).getItem().getValue()!,
          )}
          , up to {(props.slave_order as SlaveOrderItem).getMaximum()} copies)
        </div>
      </Show>

      <Show when={props.slave_order.getUnfulfilledOutcomes().length}>
        <div>
          If expires:{" "}
          <CostsCard
            costs={props.slave_order.getUnfulfilledOutcomes()}
            obj={props.slave_order}
          />
        </div>
      </Show>
    </div>
  );
};

export default {
  slaveorder(
    slave_order_or_key: SlaveOrder | SlaveOrderKey,
    show_actions?: boolean,
  ): DOM.Attachable {
    const slave_order = resolveObject(
      slave_order_or_key,
      State.variables.slaveorder,
    );
    return setup.DOM.renderComponent(SlaveOrderCard, {
      slave_order,
      show_actions,
    });
  },

  slaveordercompact(
    slave_order: SlaveOrder,
    show_actions?: boolean,
  ): DOM.Attachable {
    return setup.DOM.renderComponent(SlaveOrderNameActionMenu, {
      slave_order,
      show_actions,
    });
  },
};
