import { Show } from "solid-js";
import type {
  UnitAction,
  UnitActionKey,
} from "../../classes/unitaction/UnitAction";
import { Message } from "../components/common";
import {
  MenuItemAction,
  MenuItemText,
  MenuItemTitle,
  MenuItemToolbar,
} from "../components/menubar/MenuItem";
import { domCardNameBold } from "../util/cardnamerep";
import { RestrictionsCard } from "./RestrictionsCard";

const UnitActionNameFragment: Component<{ action: UnitAction; unit: Unit }> = (
  props,
) => {
  return (
    <>
      {setup.TagHelper.getTagsRep("unitaction", props.action.getTags())}
      <span
        data-tooltip={`<<unitactioncard '${props.action.key}' '${props.unit.key}'>>`}
      >
        {domCardNameBold(props.action)}
      </span>
    </>
  );
};

const UnitActionNameActionMenu: Component<{
  action: UnitAction;
  unit: Unit;
  show_actions?: boolean;
}> = (props) => {
  return (
    <MenuItemToolbar>
      <MenuItemTitle text={<UnitActionNameFragment {...props} />} />
      <Show when={props.show_actions}>
        <Show
          when={props.action.isCanTrain(props.unit)}
          fallback={<MenuItemText text="Not eligible" />}
        >
          <MenuItemAction
            text="Select"
            callback={() => {
              props.action.generateQuest(props.unit);
              setup.DOM.Nav.goto("QuestHub");
            }}
          />
        </Show>
      </Show>
    </MenuItemToolbar>
  );
};

export const UnitActionCompactCard = UnitActionNameActionMenu;

const UnitActionDescriptionFragment: Component<{
  action: UnitAction;
  unit: Unit;
}> = (props) => {
  State.variables.g = { trainee: props.unit };
  State.variables.gQuest = props.action;

  return setup.DOM.Util.include(props.action.getDescriptionPassage());
};

export const UnitActionCard: Component<{
  action: UnitAction;
  unit: Unit;
  show_actions?: boolean;
}> = (props) => {
  return (
    <div
      class={
        props.unit &&
        !(props.show_actions && props.action.isCanTrain(props.unit))
          ? "unitactionbadcard card"
          : "unitactioncard card"
      }
    >
      <UnitActionNameActionMenu {...props} />

      <Show when={props.action.getPrerequisites().length}>
        <RestrictionsCard
          restrictions={props.action.getPrerequisites()}
          obj={undefined}
        />
      </Show>

      <Show when={props.action.getUnitRequirements().length}>
        <RestrictionsCard
          restrictions={props.action.getUnitRequirements()}
          obj={props.unit}
        />
      </Show>

      <Show
        when={
          State.variables.menufilter.get("unitaction", "display") == "short"
        }
      >
        <div>
          <Message label={"(description)"}>
            <UnitActionDescriptionFragment {...props} />
          </Message>
        </div>
      </Show>
      <Show when={!State.variables.menufilter.get("unitaction", "display")}>
        <UnitActionDescriptionFragment {...props} />
      </Show>
    </div>
  );
};

export default {
  unitaction(
    action_or_key: UnitAction | UnitActionKey,
    unit_or_key: Unit | UnitKey,
    show_actions?: boolean,
  ): DOM.Attachable {
    const action = resolveObject(action_or_key, setup.unitaction);
    const unit = resolveObject(unit_or_key, State.variables.unit);
    return setup.DOM.renderComponent(UnitActionCard, {
      action,
      unit,
      show_actions,
    });
  },

  unitactioncompact(
    action: UnitAction,
    unit: Unit,
    show_actions?: boolean,
  ): DOM.Attachable {
    return setup.DOM.renderComponent(UnitActionNameActionMenu, {
      action,
      unit,
      show_actions,
    });
  },
};
