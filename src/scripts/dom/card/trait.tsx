import { Show } from "solid-js";
import { MenuItemTitle, MenuItemToolbar } from "../components/menubar/MenuItem";

const TraitNameActionMenu: Component<{
  trait: Trait;
}> = (props) => {
  return (
    <MenuItemToolbar>
      <MenuItemTitle
        text={
          <>
            {props.trait.repFullJSX()}
            <Show when={State.variables.gDebug}>
              <span class="debug-info">({props.trait.key})</span>
            </Show>
          </>
        }
      />
    </MenuItemToolbar>
  );
};

export const TraitEtcFragment: Component<{ trait: Trait }> = (props) => {
  return (
    <div>
      <div>{setup.DOM.Util.twee(props.trait.getDescription())}</div>

      <Show when={props.trait.isHasSkillBonuses()}>
        <div>
          {setup.SkillHelper.explainSkillMods(props.trait.getSkillBonuses())}
        </div>
      </Show>

      <Show when={props.trait.getSlaveValue()}>
        <div>Worth: {setup.DOM.Util.money(props.trait.getSlaveValue())}</div>
      </Show>
    </div>
  );
};

export const TraitCard: Component<{ trait: Trait; show_actions?: boolean }> = (
  props,
) => {
  return (
    <div>
      <TraitNameActionMenu trait={props.trait} />

      <TraitEtcFragment trait={props.trait} />
    </div>
  );
};

export default {
  trait(
    trait_or_key: Trait | TraitKey,
    show_actions?: boolean,
  ): DOM.Attachable {
    const trait = resolveObject(trait_or_key, setup.trait);
    return setup.DOM.renderComponent(TraitCard, { trait, show_actions });
  },
};
