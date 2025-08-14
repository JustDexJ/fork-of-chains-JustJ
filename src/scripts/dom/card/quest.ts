import type { ActivityInstance } from "../../classes/activity/ActivityInstance";
import { ContentTemplate } from "../../classes/content/ContentTemplate";
import type { EventInstance } from "../../classes/event/EventInstance";
import type { InteractionInstance } from "../../classes/interaction/InteractionInstance";
import type { OpportunityInstance } from "../../classes/opportunity/OpportunityInstance";
import type { QuestUnitCriteria } from "../../classes/quest/QuestTemplate";
import {
  menuItemAction,
  menuItemDanger,
  menuItemExtras,
  menuItemText,
  menuItemTitle,
} from "../../ui/menuitem";
import { domCardRep } from "../util/cardnamerep";

function getCompactDivId(quest: QuestInstance): string {
  return `questhubquestdiv${quest.key}`;
}

function getQuestUnitRoleFragment(
  actor_obj: [string, QuestUnitCriteria, Unit | null],
): DOM.Node {
  const criteria = actor_obj[1].criteria;
  const offsetmod = actor_obj[1].offsetmod;
  const unit = actor_obj[2];

  return html`
    <div class="actorcard">
      ${setup.DOM.Util.namebold(criteria)}
      ${offsetmod == 1 ? "" : `(Important: ${offsetmod}x)`}
      ${setup.DOM.Card.criteria(criteria, unit)}
    </div>
  `;
}

function getQuestUnitRolesFragment(quest: QuestInstance): DOM.Node {
  return setup.DOM.create(
    "span",
    {},
    Object.values(quest.getUnitCriteriasList()).map((actor_obj) =>
      getQuestUnitRoleFragment(actor_obj),
    ),
  );
}

function getQuestTitleFragment(quest: QuestInstance): DOM.Node {
  const template = quest.getTemplate();
  return html`
    ${setup.TagHelper.getTagsRep("quest", template.getTags())}
    ${State.variables.statistics.isHasSuccess(template)
      ? ""
      : setup.DOM.Text.successlite("NEW")}
    ${template.getDifficulty().rep()} ${domCardRep(quest)}
  `;
}

export function getQuestExpiresFragment(quest: QuestInstance): DOM.Node {
  const team = quest.getTeam();
  const template = quest.getTemplate();
  if (team) {
    return html` ${quest.getRemainingWeeks()} wks left `;
  }

  let expires;
  if (template.getDeadlineWeeks() < setup.INFINITY)
    expires = quest.getWeeksUntilExpired();

  return html`
    <span data-tooltip="Quest duration"> ${template.getWeeks()} wks </span>
    ${template.getDeadlineWeeks() >= setup.INFINITY
      ? ""
      : html`
          |
          <span data-tooltip="Quest expiration">
            ${expires == 1 ? setup.DOM.Text.danger(expires) : `${expires}`} wks
            left
          </span>
        `}
  `;
}

function questNameActionMenu(
  quest: QuestInstance,
  hide_actions?: boolean,
  show_open_button?: boolean,
  show_hide_button?: boolean,
): JQuery[] {
  const template = quest.getTemplate();

  const menus: JQuery[] = [];
  const extras: JQuery[] = [];

  if (show_hide_button) {
    menus.push(
      menuItemAction({
        text: `Close`,
        callback: () => {
          const selector = `#${getCompactDivId(quest)} `;
          setup.DOM.Helper.replace(
            selector,
            questCardCompactInternal(quest, hide_actions),
          );
        },
      }),
    );
  }

  if (show_open_button) {
    menus.push(
      menuItemAction({
        text: `View`,
        callback: () => {
          const selector = `#${getCompactDivId(quest)}`;
          setup.DOM.Helper.replace(
            selector,
            setup.DOM.Card.quest(quest, hide_actions),
          );
        },
      }),
    );
  }

  menus.push(
    menuItemTitle({
      text: getQuestTitleFragment(quest),
    }),
  );

  menus.push(
    menuItemAction({
      text: html`${template.getSkillSummary()}
        <span data-tooltip="Number of units"
          >(${Object.values(template.getUnitCriterias()).length})</span
        >`,
      callback: () => {
        setup.Dialogs.open({
          title: `Full quest roles`,
          content: html`
            <div>Quest roles for ${quest.rep()}:</div>
            <div>${getQuestUnitRolesFragment(quest)}</div>
          `,
        }).then(() => {
          setup.DOM.Nav.goto();
        });
      },
    }),
  );

  // cost
  const costs = template.getCosts();
  if (costs.length) {
    menus.push(
      menuItemText({
        text: html`Costs: ${setup.DOM.Card.cost(costs, quest)}`,
      }),
    );
  }

  menus.push(
    menuItemText({
      text: getQuestExpiresFragment(quest),
    }),
  );

  if (State.variables.gDebug) {
    extras.push(
      menuItemDanger({
        text: "Debug remove",
        callback: () => {
          quest.cleanup();
          State.variables.company.player.archiveQuest(quest);
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

function getQuestToolbar(quest: QuestInstance): DOM.Node {
  if (quest.isCanChangeTeam()) {
    if (!quest.getTeam() && !State.variables.company.player.isCanDeployTeam()) {
      return html`
        <div>
          You cannot send more teams concurrently on a quest
          ${setup.DOM.Util.help(
            html`You are limited to sending at most
            ${setup.DOM.Text.success(
              State.variables.company.player.getMaxActiveTeams(),
            )}
            teams concurrently on a quest. You can increase this limit by
            building and upgrading the
            ${setup.buildingtemplate.missioncontrol.rep()}.`,
          )}
        </div>
      `;
    } else {
      const menu = setup.QuestAssignHelper.getAssignMenu(quest);
      return setup.DOM.Util.menuItemToolbar(menu);
    }
  } else {
    return html`
      <div>${setup.QuestDifficulty.explainChance(quest.getScoreObj())}</div>
    `;
  }
}

function getQuestExtraActorsFragment(quest: QuestInstance): DOM.Node | null {
  const actors = Object.values(quest.getExtraActors()).filter((unit) =>
    unit.isYourCompany(),
  );
  if (!actors.length) return null;
  return setup.DOM.create("div", {}, [
    html`Involved: `,
    ...actors.map((unit) => unit.repLong()),
  ]);
}

function questCardCompactInternal(
  quest: QuestInstance,
  hide_actions?: boolean,
): DOM.Node {
  const is_short =
    State.variables.menufilter.get("quest", "display") == "short";
  const team = quest.getTeam();
  const template = quest.getTemplate();

  let divclass = "";
  if (is_short) {
    divclass = template.getCardClass();
  }

  const fragments: DOM.Attachable[] = [];
  fragments.push(
    setup.DOM.Util.menuItemToolbar(
      questNameActionMenu(quest, hide_actions, /* show open button = */ true),
    ),
  );

  if (is_short) {
    fragments.push(getQuestToolbar(quest));
  }

  return setup.DOM.create(`div`, { class: divclass }, fragments);
}

export function renderDescription(
  quest:
    | QuestInstance
    | OpportunityInstance
    | EventInstance
    | ActivityInstance
    | InteractionInstance,
  passage: string,
): DOM.Node {
  setup.DOM.Helper.loadQuestVars(quest);
  State.temporary.quest = quest;
  State.temporary.outcome_passage = passage;
  const rendered = setup.DOM.Util.include_replace("WeekendRenderQuestEvent");
  delete State.temporary.quest;
  delete State.temporary.outcome_passage;
  return html`
    <div class="description-render">
      ${rendered} ${setup.DOM.Card.questauthor(quest.getTemplate())}
    </div>
  `;
}

function getQuestDescriptionFragment(quest: QuestInstance): DOM.Node {
  const template = quest.getTemplate();
  const description_display = State.variables.menufilter.get("quest", "text");
  if (
    description_display == "hidden" ||
    (description_display == "new" &&
      State.variables.statistics.isHasSuccess(template))
  ) {
    return html` ${setup.DOM.Util.message("(description)", () =>
      renderDescription(quest, quest.getDescriptionPassage()),
    )}`;
  } else {
    return renderDescription(quest, quest.getDescriptionPassage());
  }
}

function getQuestCardAsyncFragment(
  quest: QuestInstance,
  hide_actions?: boolean,
) {
  const fragments: DOM.Attachable[] = [];
  const template = quest.getTemplate();
  const team = quest.getTeam();
  const criterias = quest.getUnitCriteriasList();

  if (!hide_actions) {
    fragments.push(getQuestToolbar(quest));
  }

  // team
  if (team) {
    for (const actorobj of Object.values(criterias)) {
      const criteria = actorobj[1].criteria;
      const unit = actorobj[2];
      fragments.push(html`
        <div>
          ${setup.DOM.Util.namebold(criteria)}
          ${setup.DOM.Util.message("(+)", () => {
            return getQuestUnitRoleFragment(actorobj);
          })}:
          ${!unit
            ? ""
            : `${unit.repLong()} ${criteria.repActor(unit, template.getDifficulty())}`}
        </div>
      `);
    }
  }

  // description
  if (!State.variables.devtooltype) {
    fragments.push(html`
      <div class="textcard">${getQuestDescriptionFragment(quest)}</div>
    `);
  }

  return setup.DOM.create("span", {}, fragments);
}

export default {
  questcompact(quest: QuestInstance, hide_actions?: boolean): DOM.Node {
    return html`
      <div id="${getCompactDivId(quest)}">
        ${questCardCompactInternal(quest, hide_actions)}
      </div>
    `;
  },

  quest(quest: QuestInstance, hide_actions?: boolean): DOM.Node {
    const template = quest.getTemplate();

    const fragments: DOM.Attachable[] = [];

    const show_close_button =
      !hide_actions &&
      ["short", "compact"].includes(
        State.variables.menufilter.get("quest", "display")!,
      );

    fragments.push(
      setup.DOM.Util.menuItemToolbar(
        questNameActionMenu(
          quest,
          hide_actions,
          /* show open button = */ false,
          /* show close button = */ show_close_button,
        ),
      ),
    );

    // units for trainings etc
    fragments.push(getQuestExtraActorsFragment(quest));

    // async loading
    fragments.push(
      setup.DOM.Util.async(() => {
        return getQuestCardAsyncFragment(quest, hide_actions);
      }),
    );

    // debug actions
    if (State.variables.gDebug) {
      fragments.push(html`
        <div>
          ${setup.DOM.Util.message("(DEBUG: show actors)", () => {
            const actors = quest.getActorsList();
            return actors.map(
              (actor) => `<div>${actor[0]}: ${actor[1].repLong()}</div>`,
            );
          })}
        </div>
      `);
    }

    const divclass = `${template.getCardClass()} card`;
    return setup.DOM.create("div", { class: divclass }, fragments);
  },

  /**
   * Prints the quest author
   */
  questauthor(quest_template: ContentTemplate): DOM.Node | null {
    if (quest_template.getAuthor().name) {
      return setup.DOM.Card.author(quest_template.getAuthor());
    }
    return null;
  },
};
