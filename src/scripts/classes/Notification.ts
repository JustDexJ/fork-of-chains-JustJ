import type { StateVariables } from "../types/state-variables";
import { TwineClass } from "./_TwineClass";
import type { Unit } from "./unit/Unit";

interface NotificationMetadata<T = unknown> {
  kind: string;
  actors?: ActorUnitMap;
  values: T[];
}

type StringWithMetadata = String & NotificationMetadata;

/**
 * Will be set to $notification
 */
export class Notification extends TwineClass {
  notifications: (string | StringWithMetadata)[] = [];

  to_be_deleted: Array<{
    key: string | number;
    container_name: keyof StateVariables;
  }> = [];

  delete_next: typeof this.to_be_deleted = [];

  constructor() {
    super();
  }

  disable() {
    Notification.disable();
  }

  enable() {
    Notification.enable();
  }

  isDisabled(): boolean {
    return Notification.isDisabled();
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

  //
  // Static
  //

  static disabled_semaphore = 0;

  static disable() {
    Notification.disabled_semaphore += 1;
  }

  static enable() {
    Notification.disabled_semaphore -= 1;
    if (Notification.disabled_semaphore < 0)
      throw new Error("Disabled semaphore cannot be negative!");
  }

  static isDisabled(): boolean {
    return Notification.disabled_semaphore > 0;
  }
}

function isSameActorMapping(a: Record<string, Unit>, b: Record<string, Unit>) {
  const keys_a = Object.keys(a);
  const keys_b = Object.keys(b);
  if (keys_a.length !== keys_b.length) {
    return false;
  }
  for (const k of keys_a) {
    if (a[k] !== b[k]) return false;
  }
  return true;
}

function resolveText(text: string, actor_mapping?: Record<string, Unit>) {
  if (actor_mapping) {
    return setup.Text.replaceUnitMacros(text, actor_mapping);
  } else {
    return text;
  }
}

export function notifyCombined<T = string>(
  kind: string,
  value: T,
  getText: (values: T[]) => string,
  actors?: ActorUnitMap,
) {
  if (!State.variables.notification.isDisabled()) {
    const notifications = State.variables.notification.notifications;

    const metadata: NotificationMetadata<T> = {
      kind,
      values: [value],
      actors,
    };

    const index = notifications.findIndex(
      (entry) =>
        entry instanceof String &&
        entry.kind === kind &&
        isSameActorMapping(entry.actors ?? {}, actors ?? {}),
    );
    if (index !== -1) {
      // already existing -> combine
      metadata.values = [
        ...((notifications[index] as StringWithMetadata).values as T[]),
        value,
      ];
    }

    const text = resolveText(getText(metadata.values as T[]), metadata.actors);
    const entry = Object.assign(new String(text), metadata);

    if (index !== -1) {
      notifications[index] = entry;
    } else {
      notifications.push(entry);
    }
  }
}

/**
 * BE CAREFUL WITH THIS! Don't include large things like image glob.
 */
function notify_(text: string, actors?: ActorUnitMap) {
  State.variables.notification.addNotification(resolveText(text, actors));
}

// For common notifications such as adding/removing traits to units,
// implement special handling to allow combining them to hopefully reduce spam a little.
export const notify = Object.assign(notify_, {
  traitGained(unit: Unit, trait: Trait) {
    notifyCombined(
      "trait_gained",
      trait,
      (traits) =>
        `${unit.isYourCompany() ? "" : "DEBUG: "}a|Rep <<successtext 'a|gain'>> ${traits.map((t) => t.rep()).join(" ")}`,
      {
        a: unit,
      },
    );
  },

  traitGainedTemporarily(unit: Unit, trait: Trait) {
    notifyCombined(
      "trait_gained_temp",
      trait,
      (traits) =>
        `${unit.isYourCompany() ? "" : "DEBUG: "}a|Rep temporarily a|gain ${traits.map((t) => t.rep()).join(" ")}`,
      {
        a: unit,
      },
    );
  },

  traitLost(unit: Unit, trait: Trait) {
    notifyCombined(
      "trait_lost",
      trait,
      (traits) =>
        `${unit.isYourCompany() ? "" : "DEBUG: "}a|Rep <<dangertext 'a|lose'>> ${traits.map((t) => t.rep()).join(" ")}`,
      {
        a: unit,
      },
    );
  },
});

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
