import { TwineClass } from "../_TwineClass";
import type { SlaveOrderKey } from "./SlaveOrder";

// will be assigned to $slaveorderlist
export class SlaveOrderList extends TwineClass {
  slave_order_keys: SlaveOrderKey[] = [];

  constructor() {
    super();
  }

  advanceWeek(): void {
    let slave_orders = this.getSlaveOrders();
    let to_archive = [];
    for (let i = 0; i < slave_orders.length; ++i) {
      let slave_order = slave_orders[i];
      slave_order.advanceWeek();
      if (slave_order.isExpired()) {
        to_archive.push(slave_order);
      }
    }
    for (let i = 0; i < to_archive.length; ++i) {
      this.archiveSlaveOrder(to_archive[i]);
    }
  }

  archiveSlaveOrder(slave_order: SlaveOrder): void {
    if (!this.slave_order_keys.includes(slave_order.key))
      throw new Error(`slave order not found`);

    if (!slave_order.isFulfilled()) {
      slave_order.doUnfulfill();
    }

    // this.archived_slave_orders.push(slave_order)
    this.slave_order_keys = this.slave_order_keys.filter(
      (item) => item != slave_order.key,
    );
    setup.queueDelete(slave_order, "slaveorder");
  }

  getSlaveOrders(): SlaveOrder[] {
    return this.slave_order_keys.map((a) => State.variables.slaveorder[a]);
  }

  countSlaveOrders(): number {
    return this.slave_order_keys.length;
  }

  _addSlaveOrder(slave_order: SlaveOrder) {
    State.variables.statistics.add("slave_order_obtained", 1);

    this.slave_order_keys.push(slave_order.key);
    setup.notify(`${slave_order.rep()}`);
  }
}
