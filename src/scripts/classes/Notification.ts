import type { StateVariables } from "../types/state-variables";
import { TwineClass } from "./_TwineClass";
import type { Unit } from "./unit/Unit";

/**
 * Will be set to $notification
 */
export class Notification extends TwineClass {
  notifications: string[] = [];

  to_be_deleted: Array<{
    key: string | number;
    container_name: keyof StateVariables;
  }> = [];

  delete_next: typeof this.to_be_deleted = [];

  disabled_semaphore = 0;

  constructor() {
    super();
  }

  disable() {
    this.disabled_semaphore += 1;
  }

  enable() {
    this.disabled_semaphore -= 1;
    if (this.disabled_semaphore < 0)
      throw new Error("Disabled semaphore cannot be negative!");
  }

  isDisabled(): boolean {
    return this.disabled_semaphore > 0;
  }

  popAll() {
    if (this.isDisabled()) return [];
    let res = this.notifications;
    this.notifications = [];
    return res;
  }

  addNotification(text: string) {
    if (!this.isDisabled()) {
      this.notifications.push(text);
    }
  }

  deleteAll() {
    for (let i = 0; i < this.delete_next.length; ++i) {
      let to_delete_info = this.delete_next[i];
      let obj = (State.variables[to_delete_info.container_name] as any)[
        to_delete_info.key
      ];
      // can already be deleted
      if (obj) {
        obj.delete();
      }
    }
    this.delete_next = this.to_be_deleted;
    this.to_be_deleted = [];
  }
}

/**
 * BE CAREFUL WITH THIS! Don't include large things like image glob.
 */
export function notify(text: string, actor_mapping?: Record<string, Unit>) {
  let parsed;
  if (actor_mapping) {
    parsed = setup.Text.replaceUnitMacros(text, actor_mapping);
  } else {
    parsed = text;
  }
  State.variables.notification.addNotification(parsed);
}

export function queueDelete(
  obj: { key: string | number },
  container_name: keyof StateVariables,
) {
  // Queue delete obj at the start of 2nd next passage.
  if (!(container_name in State.variables)) {
    throw new Error(`Unknown ${container_name} for queueDelete`);
  }
  State.variables.notification.to_be_deleted.push({
    key: obj.key,
    container_name: container_name,
  });
}
