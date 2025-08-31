import type { EventTemplate } from "../../../../classes/event/EventTemplate";
import type { OpportunityTemplate } from "../../../../classes/opportunity/OpportunityTemplate";
import {
  QUEST_OUTCOMES,
  type QuestOutcome,
} from "../../../../classes/quest/QuestTemplate";
import { renderDescription } from "../../../card/QuestInstanceCard";
import { FilterableList } from "../../../components/misc/FilterableList";
import {
  debug_do_one_finalize,
  debug_do_one_title,
  debug_frontpage_title,
} from "./_common";

export function scoutable_content(
  template: QuestTemplate | EventTemplate | OpportunityTemplate,
): DOM.Node {
  const reason = [];
  if (State.variables.settings.isBanned(template.getTags())) {
    reason.push(
      html`<div>
        Contains some ${setup.DOM.Text.danger("banned")} fetish tags.
      </div>`,
    );
  }
  let prereq;
  if (template instanceof setup.EventTemplate) {
    prereq = template.getRequirements();
  } else {
    prereq = template.getPrerequisites();
  }
  for (const req of prereq) {
    if (!req.isOk(template)) {
      reason.push(
        html`<div>
          Restriction ${setup.DOM.Text.danger("missing")}:
          ${req.explain(template)}
        </div>`,
      );
    } else {
      reason.push(
        html`<div>Restriction satisfied: ${req.explain(template)}</div>`,
      );
    }
  }
  if (State.variables.calendar.isOnCooldown(template)) {
    reason.push(html`
      <div>
        ${setup.DOM.Text.danger("On cooldown")} for
        ${State.variables.calendar.getCooldown(template)} more weeks.
      </div>
    `);
  }
  if (template.isCanGenerate()) {
    reason.push(html` <div>${setup.DOM.Text.success("YES")}</div> `);
  } else {
    reason.push(html` <div>${setup.DOM.Text.danger("NO")}</div> `);
  }
  return setup.DOM.create("div", {}, reason);
}

export function is_scoutable_link(
  template: QuestTemplate | EventTemplate | OpportunityTemplate,
): DOM.Node {
  return setup.DOM.Util.message(
    template instanceof setup.EventTemplate
      ? "(is trigger-able)"
      : "(is scout-able)",
    () => scoutable_content(template),
  );
}

export default {
  quest(): DOM.Node {
    const fragments: DOM.Attachable[] = [];
    fragments.push(debug_frontpage_title("quest", "QuestDebugAll"));

    fragments.push(
      setup.DOM.renderComponent(FilterableList<QuestTemplate>, {
        menu: "questtemplate" as const,
        filter_objects: Object.values(setup.questtemplate),
        display_callback: (template) => {
          const inner = [];
          inner.push(html`
            ${setup.DOM.Util.namebold(template)} ${is_scoutable_link(template)}
            ${setup.DOM.Nav.link(`(make instance)`, () => {
              const result = setup.QuestPool.instantiateQuest(template);
              if (!result) {
                alert("No valid instantiation found");
              } else {
                State.variables.gPassage = "QuestHub";
                setup.runSugarCubeCommand(`<<goto "QuestHub">>`);
              }
            })}
            ${setup.DOM.Nav.link(`(force make instance)`, () => {
              const quest = template.debugMakeInstance();
              State.variables.company.player.addQuest(quest);
              State.variables.gPassage = "QuestHub";
              setup.runSugarCubeCommand(`<<goto "QuestHub">>`);
            })}
            ${setup.DOM.Nav.link(`(test this)`, () => {
              State.variables.qDebugQuestTemplate_key = template.key;
              delete State.variables.qDebugQuestResult;
              setup.runSugarCubeCommand(`<<goto QuestDebugDo>>`);
            })}
            ${setup.DOM.Nav.link(`(test description)`, () => {
              State.variables.qDebugQuestTemplate_key = template.key;
              setup.runSugarCubeCommand(`<<goto QuestDebugDoDescription>>`);
            })}
          `);

          for (const outcome of setup.QUEST_OUTCOMES) {
            inner.push(html`
              ${setup.DOM.Nav.link(`(test ${outcome})`, () => {
                State.variables.qDebugQuestTemplate_key = template.key;
                State.variables.qDebugQuestResult = outcome;
                setup.runSugarCubeCommand(`<<goto QuestDebugDo>>`);
              })}
            `);
          }

          return setup.DOM.create("div", {}, inner);
        },
      }),
    );

    return setup.DOM.create("div", {}, fragments);
  },

  quest_debug_outcome(
    template: QuestTemplate,
    outcome: QuestOutcome,
    is_debug_all?: boolean,
  ): DOM.Node {
    const quest = template.debugMakeFilledInstance(outcome, is_debug_all);

    const fragments: DOM.Attachable[] = [];
    fragments.push(debug_do_one_title(quest, is_debug_all));

    fragments.push(html`<div><b>${outcome}</b></div>`);

    const cardclass = quest.getTemplate().getCardClass();
    const classname = `textcard questcard${quest.outcome} ${cardclass} card`;

    fragments.push(html`
      <div class="${classname}">
        ${renderDescription(quest, quest.getOutcomeObject()[0])}
      </div>
    `);

    try {
      quest.finalize();
    } catch (ex) {
      fragments.push(setup.DOM.Util.exception(ex));
    }
    fragments.push(setup.DOM.Card.notifications());

    fragments.push(debug_do_one_finalize(quest, is_debug_all));

    return setup.DOM.create("div", {}, fragments);
  },

  quest_debug_description(
    template: QuestTemplate,
    is_debug_all?: boolean,
  ): DOM.Node {
    const quest = template.debugMakeInstance(is_debug_all);

    const fragments: DOM.Attachable[] = [];
    fragments.push(debug_do_one_title(quest, is_debug_all));

    const cardclass = quest.getTemplate().getCardClass();
    const classname = `textcard ${cardclass} card`;

    fragments.push(html`
      <div class="${classname}">
        ${renderDescription(quest, quest.getDescriptionPassage())}
      </div>
    `);

    fragments.push(debug_do_one_finalize(quest, is_debug_all));

    return setup.DOM.create("div", {}, fragments);
  },

  quest_debug_one(
    template: QuestTemplate,
    is_debug_all?: boolean,
    forced_outcome?: QuestOutcome,
  ): DOM.Node {
    const fragments = [
      setup.DOM.Menu.Settings.Debug.quest_debug_description(
        template,
        is_debug_all,
      ),
    ];
    fragments.push(scoutable_content(template));
    for (const outcome of QUEST_OUTCOMES) {
      if (forced_outcome && outcome !== forced_outcome) continue;
      fragments.push(
        setup.DOM.Menu.Settings.Debug.quest_debug_outcome(
          template,
          outcome,
          is_debug_all,
        ),
      );
    }

    return setup.DOM.create("div", {}, fragments);
  },

  quest_debug_all(): DOM.Node {
    const fragments: DOM.Attachable[] = [];
    for (const template of Object.values(setup.questtemplate)) {
      try {
        fragments.push(
          setup.DOM.Menu.Settings.Debug.quest_debug_one(
            template,
            /* is debug all = */ true,
          ),
        );
      } catch (ex) {
        fragments.push(setup.DOM.Util.exception(ex));
      }
      fragments.push(setup.DOM.Card.notifications());
    }
    return setup.DOM.create("div", {}, fragments);
  },
};
