import { For, Show } from "solid-js";
import type { Party, PartyKey } from "../../classes/party/Party";
import { Link } from "../components/common";
import {
  MenuItemAction,
  MenuItemActionOrText,
  MenuItemDanger,
  MenuItemExtras,
  MenuItemText,
  MenuItemTitle,
  MenuItemToolbar,
} from "../components/menubar/MenuItem";
import { domCardRep } from "../util/cardnamerep";

const PartyNameActionMenu: Component<{
  party: Party;
  show_actions?: boolean;
}> = (props) => {
  return (
    <MenuItemToolbar>
      <MenuItemTitle text={domCardRep(props.party)} />

      <Show when={props.show_actions}>
        <MenuItemAction
          text="Add unit"
          tooltip="Assign units to this party"
          callback={() => {
            State.variables.gPartySelected_key = props.party.key;
            setup.DOM.Nav.goto("PartyAddUnit");
          }}
        />

        <MenuItemActionOrText
          text={
            <span data-tooltip="If checked, then units on this party CAN be selected to go on quests by quest auto-assign. Regardless of this settings, the units can always be selected when using manual unit assignment.">
              Auto-assign pickable
            </span>
          }
          checked={props.party.isCanGoOnQuestsAuto()}
          callback={
            !props.show_actions
              ? undefined
              : () => {
                  props.party.toggleIsCanGoOnQuestsAuto();
                  setup.DOM.Nav.goto();
                }
          }
        />
      </Show>

      <Show when={props.show_actions}>
        <MenuItemExtras>
          <MenuItemAction
            text="Rename"
            tooltip="Change this party's name"
            callback={() => {
              State.variables.gParty_key = props.party.key;
              setup.DOM.Nav.goto("PartyNameChange");
            }}
          />

          <Show
            when={props.party.isCanDisband()}
            fallback={<MenuItemText text="Remove all units to disband" />}
          >
            <MenuItemDanger
              text="Disband"
              tooltip="Delete this party"
              callback={() => {
                State.variables.partylist.removeParty(props.party);
                setup.DOM.Nav.goto();
              }}
            />
          </Show>
        </MenuItemExtras>
      </Show>
    </MenuItemToolbar>
  );
};

export const PartyCompactCard = PartyNameActionMenu;

export const PartyCard: Component<{ party: Party; show_actions?: boolean }> = (
  props,
) => {
  return (
    <div class="partycard card">
      <PartyNameActionMenu {...props} />

      <For each={props.party.getUnits()}>
        {(unit) => (
          <div>
            {setup.DOM.Util.level(unit.getLevel())} {unit.repLongJSX()}
            <Show when={props.show_actions}>
              <Link
                onClick={() => {
                  props.party.removeUnit(unit);
                  setup.DOM.Nav.goto();
                }}
              >
                (remove)
              </Link>
            </Show>
          </div>
        )}
      </For>
    </div>
  );
};

export default {
  party(party_or_key: Party | PartyKey, show_actions?: boolean): DOM.Node {
    const party = resolveObject(party_or_key, State.variables.party);
    return setup.DOM.renderComponent(PartyCard, { party, show_actions });
  },

  partycompact(party: Party, show_actions?: boolean): DOM.Node {
    return setup.DOM.renderComponent(PartyNameActionMenu, {
      party,
      show_actions,
    });
  },
};
