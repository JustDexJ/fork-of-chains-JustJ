import { Show } from "solid-js";
import type { Perk } from "../../classes/trait/Perk";
import {
  MenuItemAction,
  MenuItemText,
  MenuItemTitle,
  MenuItemToolbar,
} from "../components/menubar/MenuItem";
import { TraitEtcFragment } from "./TraitCard";

const PerkNameActionMenu: Component<{
  perk: Perk;
  unit: Unit;
  show_actions?: boolean;
}> = (props) => {
  return (
    <MenuItemToolbar>
      <MenuItemTitle
        text={
          <>
            {props.perk.repFullJSX()}
            {State.variables.gDebug ? (
              <span class="debug-info">(${props.perk.key})</span>
            ) : null}
          </>
        }
      />

      <Show when={props.show_actions}>
        <Show
          when={props.unit.getLearnablePerks().includes(props.perk)}
          fallback={<MenuItemText text="Limit reached" />}
        >
          <MenuItemAction
            text="Learn"
            callback={() => {
              props.unit.addTrait(props.perk);
              if (!props.unit.isCanLearnNewPerk()) {
                setup.DOM.Nav.gotoreturn();
              } else {
                setup.DOM.Nav.goto();
              }
            }}
          />
        </Show>
      </Show>
    </MenuItemToolbar>
  );
};

export const PerkCard: Component<{
  perk: Perk;
  unit: Unit;
  show_actions?: boolean;
}> = (props) => {
  return (
    <div
      class={`${props.unit.getLearnablePerks().includes(props.perk) ? "perkcard" : "perkcardinactive"} card`}
    >
      <PerkNameActionMenu {...props} />
      <div>
        <TraitEtcFragment trait={props.perk} />
      </div>
    </div>
  );
};

export default {
  perk(
    perk_or_key: Perk | TraitKey,
    unit: Unit,
    show_actions?: boolean,
  ): DOM.Attachable {
    const perk = resolveObject(perk_or_key, setup.trait) as Perk;
    return setup.DOM.renderComponent(PerkCard, { perk, unit, show_actions });
  },
};
