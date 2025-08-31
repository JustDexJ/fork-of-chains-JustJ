import { For, Show } from "solid-js";
import {
  MenuItemAction,
  MenuItemExtras,
  MenuItemTitle,
  MenuItemToolbar,
} from "../components/menubar/MenuItem";
import { CostsCard } from "./CostsCard";

const SexActionNameActionMenu: Component<{
  action: SexAction;
  show_actions?: boolean;
}> = (props) => {
  return (
    <MenuItemToolbar>
      <MenuItemTitle
        text={
          <>
            {setup.TagHelper.getTagsRep("sexaction", props.action.getTags())}
            {props.action.desc()}
            {State.variables.settings.isSexActionDisabled(props.action)
              ? setup.DOM.Text.danger("[DISABLED]")
              : ""}
          </>
        }
      />

      <Show when={props.show_actions}>
        <MenuItemExtras>
          <MenuItemAction
            callback={() => {
              State.variables.settings.toggleSexActionDisabled(props.action);
              setup.DOM.Nav.goto();
            }}
            text="Disabled"
            tooltip="If disabled, sex actions will not be selected during Interactive Sex"
            checked={State.variables.settings.isSexActionDisabled(props.action)}
          />
        </MenuItemExtras>
      </Show>
    </MenuItemToolbar>
  );
};

export const SexActionCompactCard = SexActionNameActionMenu;

const getActorDisplayName = (index: number) => {
  switch (index) {
    case 0:
      return "user";
    case 1:
      return "target";
    default:
      return `actor ${index + 1}`;
  }
};

export const SexActionCard: Component<{
  action: SexAction;
  show_actions?: boolean;
}> = (props) => {
  return (
    <div class="card interactive-sex-action-card">
      <SexActionNameActionMenu {...props} />

      {/* general restrictions */}
      <Show when={props.action.getRestrictions().length}>
        <div>
          <b class="mutedtext">Requires:</b>
          <CostsCard costs={props.action.getRestrictions()} />
        </div>
      </Show>

      {/* actor restrictions */}
      <For each={props.action.getActorDescriptions()}>
        {(actor_desc, getIndex) => (
          <Show when={actor_desc.restrictions?.length}>
            <div>
              <b class="mutedtext">
                Requires {getActorDisplayName(getIndex())}:
              </b>{" "}
              <CostsCard costs={actor_desc.restrictions!} />
            </div>
          </Show>
        )}
      </For>
    </div>
  );
};

export default {
  sexactioncompact(action: SexAction, show_actions?: boolean): DOM.Attachable {
    return setup.DOM.renderComponent(SexActionNameActionMenu, {
      action,
      show_actions,
    });
  },

  sexaction(action: SexAction, show_actions?: boolean): DOM.Attachable {
    return setup.DOM.renderComponent(SexActionCard, { action, show_actions });
  },
};
