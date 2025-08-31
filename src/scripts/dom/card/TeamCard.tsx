import { For, Show } from "solid-js";
import type { Team, TeamKey } from "../../classes/Team";
import {
  MenuItemDanger,
  MenuItemText,
  MenuItemTitle,
  MenuItemToolbar,
} from "../components/menubar/MenuItem";
import { domCardRep } from "../util/cardnamerep";

const TeamNameActionMenu: Component<{ team: Team; show_actions?: boolean }> = (
  props,
) => {
  return (
    <MenuItemToolbar>
      <MenuItemTitle text={domCardRep(props.team)} />

      <Show when={props.team.getQuest()}>
        <MenuItemText
          text={
            <span data-tooltip={`<<questcard '${props.team.getQuest().key}'>>`}>
              {setup.DOM.Text.dangerlite(`[Quest]`)}
            </span>
          }
        />
      </Show>

      <Show
        when={props.show_actions && props.team.getQuest()?.isCanChangeTeam()}
      >
        <MenuItemDanger
          text={`Cancel quest`}
          tooltip={`Cancel this quest team assignment`}
          callback={() => {
            props.team.getQuest()!.cancelAssignTeam();
            setup.DOM.Nav.goto();
          }}
        />
      </Show>
    </MenuItemToolbar>
  );
};

export const TeamCompactCard = TeamNameActionMenu;

function removeUnitCallback(team: Team, unit: Unit) {
  return () => {
    team.removeUnit(unit);
    setup.DOM.Nav.goto();
  };
}

export const TeamCard: Component<{ team: Team; show_actions?: boolean }> = (
  props,
) => {
  return (
    <div class="teamcard">
      <TeamNameActionMenu {...props} />

      <Show when={props.team.getQuest()}>
        <div>
          On {props.team.getQuest()!.repJSX()} for{" "}
          {props.team.getQuest()!.getRemainingWeeks()} more weeks.
        </div>
      </Show>

      <For each={props.team.getUnits()}>
        {(unit) => (
          <div>
            {setup.DOM.Util.level(unit.getLevel())} {unit.repLongJSX()}
            {props.show_actions &&
              !props.team.getQuest() &&
              setup.DOM.Nav.link(
                `(remove)`,
                removeUnitCallback(props.team, unit),
              )}
          </div>
        )}
      </For>
    </div>
  );
};

export default {
  team(team_or_key: Team | TeamKey, show_actions?: boolean): DOM.Attachable {
    const team = resolveObject(team_or_key, State.variables.team);
    return setup.DOM.renderComponent(TeamCard, { team });
  },

  teamcompact(team: Team, show_actions?: boolean): DOM.Attachable {
    return setup.DOM.renderComponent(TeamNameActionMenu, {
      team,
      show_actions,
    });
  },
};
