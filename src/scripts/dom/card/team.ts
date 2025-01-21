import type { Team, TeamKey } from "../../classes/Team";
import {
  menuItemDanger,
  menuItemExtras,
  menuItemText,
  menuItemTitle,
} from "../../ui/menuitem";
import { domCardRep } from "../util/cardnamerep";

function teamNameFragment(team: Team): DOM.Node {
  return html`${domCardRep(team)}`;
}

function teamStatusFragment(team: Team): DOM.Node {
  if (team.getQuest()) {
    return html`
      <span data-tooltip="<<questcard '${team.getQuest().key}'>>">
        ${setup.DOM.Text.dangerlite(`[Quest]`)}
      </span>
    `;
  }
  return html``;
}

function teamNameActionMenu(team: Team, show_actions?: boolean): JQuery[] {
  const menus: JQuery[] = [];
  const extras: JQuery[] = [];

  menus.push(
    menuItemTitle({
      text: teamNameFragment(team),
    }),
  );
  const status = teamStatusFragment(team);
  if (status) {
    menus.push(
      menuItemText({
        text: status,
      }),
    );
  }

  const quest = team.getQuest();
  if (quest && show_actions && quest.isCanChangeTeam()) {
    menus.push(
      menuItemDanger({
        text: `Cancel quest`,
        tooltip: `Cancel this quest team assignment`,
        callback: () => {
          quest.cancelAssignTeam();
          setup.DOM.Nav.goto();
        },
      }),
    );
  }

  if (extras.length) {
    menus.push(
      menuItemExtras({
        children: extras,
      }),
    );
  }

  return menus;
}

function removeUnitCallback(team: Team, unit: Unit) {
  return () => {
    team.removeUnit(unit);
    setup.DOM.Nav.goto();
  };
}

export default {
  team(team_or_key: Team | TeamKey, show_actions?: boolean): DOM.Node {
    const team = resolveObject(team_or_key, State.variables.team);

    const fragments: DOM.Attachable[] = [];

    fragments.push(
      setup.DOM.Util.menuItemToolbar(teamNameActionMenu(team, show_actions)),
    );

    const quest = team.getQuest();
    if (quest) {
      const inner = [];
      inner.push(html`
        On ${quest.rep()} for ${quest.getRemainingWeeks()} more weeks.
      `);
      fragments.push(setup.DOM.create("div", {}, inner));
    }

    for (const unit of team.getUnits()) {
      fragments.push(html`
        <div>
          ${setup.DOM.Util.level(unit.getLevel())} ${unit.repLong()}
          ${show_actions &&
          !team.getQuest() &&
          setup.DOM.Nav.link(`(remove)`, removeUnitCallback(team, unit))}
        </div>
      `);
    }

    return setup.DOM.create("div", { class: "teamcard" }, fragments);
  },

  teamcompact(team: Team, show_actions?: boolean): DOM.Node {
    return setup.DOM.Util.menuItemToolbar(
      teamNameActionMenu(team, show_actions),
    );
  },
};
