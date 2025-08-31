import { createMemo, For, Show } from "solid-js";
import { SexAction } from "../../classes/sex/action/SexAction";
import { DoNothing } from "../../classes/sex/action/actions/core/DoNothing";
import { EquipStrapon } from "../../classes/sex/action/actions/core/EquipStrapon";
import { PoseChange } from "../../classes/sex/action/actions/core/PoseChange";
import { PoseChangeOther } from "../../classes/sex/action/actions/core/PoseChangeOther";
import { PositionChange } from "../../classes/sex/action/actions/core/PositionChange";
import { PositionChangeOther } from "../../classes/sex/action/actions/core/PositionChangeOther";
import { SexEnd } from "../../classes/sex/action/actions/core/SexEnd";
import { UnequipOther } from "../../classes/sex/action/actions/core/UnequipOther";
import { UnequipSelf } from "../../classes/sex/action/actions/core/UnequipSelf";
import { SexInstance } from "../../classes/sex/engine/SexInstance";
import type { SexScene } from "../../classes/sex/engine/SexScene";
import type { SexLocation } from "../../classes/sex/location/SexLocation";
import type { sexposition } from "../../classes/sex/position/_index";
import { MenuItem, MenuItemText } from "../components/menubar/MenuItem";
import { InteractiveSexParticipantCards } from "../components/sex/InteractiveSexStatusView";

/**
 * Begin interactive sex with these units
 * @param location - will be randomized if not given.
 */
export const DOM_Menu_interactivesex = function (
  units: Unit[],
  location?: SexLocation,
) {
  // Get init values
  const participants = SexInstance.initParticipants(units);

  // Get sex object temporarily
  const sex = new SexInstance(
    location || setup.sexlocation.dungeonsfloor,
    participants,
  );

  if (!location) {
    // randomize starting location
    const new_location = setup.rng.choice(
      setup.SexClasses.getAllAllowedLocations(sex),
    );
    sex.setLocation(new_location);
  }

  State.temporary.gSex = sex;
  console.log("NEW SCENE");
};

export function interactiveSexTooltip(
  ...args: Array<keyof typeof sexposition>
) {
  return setup.DOM.renderComponent(InteractiveSexParticipantCards, {
    sex: State.temporary.gSex,
    positions: args.map((key) => setup.sexposition[key]),
  });
}

function selectAction(
  scene: SexScene,
  action: SexAction,
  callback: (action?: string) => void,
) {
  scene.advanceTurn(action);
  callback("action_selected");
}

const ActionMenuItems: Component<{
  sex: SexInstance;
  scene: SexScene;
  callback: (action?: string) => void;
  actions: SexAction[];
}> = (props) => {
  return (
    <For each={props.actions}>
      {(action) => (
        <MenuItem
          text={action.title(props.sex)}
          callback={() => selectAction(props.scene, action, props.callback)}
        />
      )}
    </For>
  );
};

const InteractiveSexToolbarItemsUnit: Component<{
  allowed_actions: SexAction[];
  unit: Unit;
  sex: SexInstance;
  scene: SexScene;
  callback: () => void;
}> = (props) => {
  const getMenus = createMemo((): Array<[label: string, SexAction[]]> => {
    let menus;
    if (props.unit === State.variables.unit.player) {
      menus = {
        Pose: props.allowed_actions.filter((a) => a instanceof PoseChange),
        Position: props.allowed_actions.filter(
          (a) => a instanceof PositionChange,
        ),
        Equipment: props.allowed_actions.filter(
          (a) => a instanceof UnequipSelf || a instanceof EquipStrapon,
        ),
      };
    } else {
      menus = {
        Pose: props.allowed_actions.filter(
          (a) =>
            a instanceof PoseChangeOther && a.getActorUnit("b") === props.unit,
        ),
        Position: props.allowed_actions.filter(
          (a) =>
            a instanceof PositionChangeOther &&
            a.getActorUnit("b") === props.unit,
        ),
        Equipment: props.allowed_actions.filter(
          (a) =>
            a instanceof UnequipOther && a.getActorUnit("b") === props.unit,
        ),
      };
    }
    return objectEntries(menus).filter((m) => m[1].length);
  });

  return (
    <MenuItem
      text={
        <>
          {props.unit === State.variables.unit.player
            ? "You"
            : props.unit.getName()}{" "}
          <i class="sfa sfa-caret-down"></i>
        </>
      }
    >
      <Show
        when={!State.variables.settings.mobilemode}
        fallback={
          <For
            each={getMenus()}
            fallback={<MenuItemText text="No possible action" />}
          >
            {([label, actions]) => (
              <ActionMenuItems
                sex={props.sex}
                scene={props.scene}
                callback={props.callback}
                actions={actions}
              />
            )}
          </For>
        }
      >
        <For
          each={getMenus()}
          fallback={<MenuItemText text="No possible action" />}
        >
          {([label, actions]) => (
            <MenuItem text={label}>
              <ActionMenuItems
                sex={props.sex}
                scene={props.scene}
                callback={props.callback}
                actions={actions}
              />
            </MenuItem>
          )}
        </For>
      </Show>
    </MenuItem>
  );
};

export const InteractiveSexToolbarItems: Component<{
  sex: SexInstance;
  scene: SexScene;
  callback: (action?: string) => void;
}> = (props) => {
  const getAllowedActions = createMemo(() => {
    return props.scene.getPossibleActions(State.variables.unit.player);
  });

  const doRandomAction = () => {
    props.scene.advanceTurn();
    props.callback();
  };

  return (
    <>
      <For each={props.sex.getUnits()}>
        {(unit) => (
          <InteractiveSexToolbarItemsUnit
            {...props}
            allowed_actions={getAllowedActions()}
            unit={unit}
          />
        )}
      </For>

      <MenuItem
        text={
          <span data-tooltip="Reroll actions" data-tooltip-noclick>
            <i class="sfa sfa-sync-alt"></i>
          </span>
        }
        callback={() => {
          props.callback("reroll");
        }}
      />

      <Show when={getAllowedActions().find((a) => a instanceof DoNothing)}>
        {(getDoNothingAction) => (
          <MenuItem
            text={
              <span data-tooltip="Do nothing" data-tooltip-noclick>
                <i class="sfa sfa-pause"></i>
              </span>
            }
            callback={() => {
              selectAction(props.scene, getDoNothingAction(), props.callback);
            }}
          />
        )}
      </Show>

      <MenuItem
        text={
          <span data-tooltip="Random" data-tooltip-noclick>
            <i class="sfa sfa-play"></i>
          </span>
        }
        callback={doRandomAction}
      />

      {(() => {
        // attach random to top bar.
        setup.DOM.Nav.topLeftNavigation(
          setup.DOM.Nav.link(`Random [space]`, doRandomAction),
        );
      })()}

      <MenuItem
        text={
          <span data-tooltip="Random x100" data-tooltip-noclick>
            <i class="sfa sfa-forward"></i>
          </span>
        }
        callback={() => {
          props.scene.advanceTurns(100);
          props.callback();
        }}
      />

      <Show when={getAllowedActions().find((a) => a instanceof SexEnd)}>
        {(getSexEndAction) => (
          <MenuItem
            text={
              <span data-tooltip="End sex" data-tooltip-noclick>
                <i class="sfa sfa-stop"></i>
              </span>
            }
            callback={() => {
              selectAction(props.scene, getSexEndAction(), props.callback);
            }}
          />
        )}
      </Show>

      <MenuItem
        text={
          <>
            <i class="sfa sfa-cog" />
            <i class="sfa sfa-caret-down" />
          </>
        }
      >
        <MenuItem
          text="Mobile mode"
          checked={!!State.variables.settings.mobilemode}
          callback={() => {
            State.variables.settings.mobilemode =
              !State.variables.settings.mobilemode;
            props.callback();
          }}
        />
      </MenuItem>
    </>
  );
};
