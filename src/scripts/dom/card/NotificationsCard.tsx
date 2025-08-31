import { For, Show } from "solid-js";
import { Twee } from "../components/common";

export const NotificationsCard: Component<{ notifications: string[] }> = (
  props,
) => {
  return (
    <Show when={props.notifications.length}>
      <div class="notification-container">
        <div class="notificationcard">
          <For each={props.notifications}>
            {(notification) => <Twee>{notification}</Twee>}
          </For>
        </div>
      </div>
    </Show>
  );
};

export default {
  /**
   * @param notifications - if left empty, will pop from `$notifications`
   */
  notifications(notifications?: string[]): DOM.Attachable {
    return setup.DOM.renderComponent(NotificationsCard, {
      notifications: notifications ?? State.variables.notification.popAll(),
    });
  },
};
