import { UnitCriteria } from "../../classes/criteria/UnitCriteria";
import type { QuestDifficulty } from "../../classes/quest/QuestDifficulty";
import { FilterableList } from "../components/misc/FilterableList";

function compareScoreSort(
  quest: QuestInstance,
  compare_score_function: (
    this: UntiCriteria,
    unit: Unit,
    difficulty: QuestDifficulty,
  ) => number,
  criteria: UnitCriteria,
) {
  return (a: Unit, b: Unit) => {
    const scorea = compare_score_function.call(
      criteria,
      a,
      quest.getTemplate().getDifficulty(),
    );
    const scoreb = compare_score_function.call(
      criteria,
      b,
      quest.getTemplate().getDifficulty(),
    );
    if (scorea < scoreb) return 1;
    if (scorea > scoreb) return -1;
    return 0;
  };
}

function getSelectUnitFragment(
  quest: QuestInstance,
  actor_name: string,
  criteria: UnitCriteria,
  actor_unit: Unit | null,
): DOM.Node {
  const fragments: DOM.Attachable[] = [];
  fragments.push(html`
    <div>
      <b>Select unit for</b>
      ${setup.DOM.Util.namebold(criteria)}:
      ${setup.DOM.Util.include("QuestAssignHelp")}
    </div>
  `);

  const units = criteria
    .getEligibleUnits(quest)
    .filter((unit) => unit != actor_unit);
  const sort_score = State.variables.menufilter.get("unitquest", "sortscore");
  if (sort_score == "crit") {
    units.sort(
      compareScoreSort(
        quest,
        UnitCriteria.prototype.computeScoreCrit,
        criteria,
      ),
    );
  } else if (sort_score == "success") {
    units.sort(
      compareScoreSort(
        quest,
        UnitCriteria.prototype.computeScoreSuccess,
        criteria,
      ),
    );
  } else if (sort_score == "failure") {
    units.sort(
      compareScoreSort(
        quest,
        UnitCriteria.prototype.computeScoreFailure,
        criteria,
      ),
    );
  } else {
    units.sort(
      compareScoreSort(quest, UnitCriteria.prototype.computeScore, criteria),
    );
  }

  fragments.push(
    setup.DOM.renderComponent(FilterableList, {
      menu: "unitquest" as const,
      filter_objects: units,

      display_callback: (unit: Unit) => {
        const inner = [];
        inner.push(html`
          ${setup.DOM.Nav.button(`Select`, () => {
            setup.QuestAssignHelper.assignUnit(actor_name, unit, criteria);
            delete State.variables.gAdhocQuestCriteriaOpenActor;
            setup.DOM.Nav.goto();
          })}
          ${unit.key in State.variables.gAdhocUnitUsed!
            ? html`${setup.repImgIcon(
                setup.Unit.DANGER_IMAGE_URL,
                `Unit already going on this quest`,
              )}`
            : unit.repBusyStateJSX(true)}
          ${setup.DOM.Util.level(unit.getLevel())} ${unit.repFull()}
          ${criteria.repActor(unit, quest.getTemplate().getDifficulty())}
        `);
        return setup.DOM.create("div", {}, inner);
      },
    }),
  );

  return setup.DOM.create("div", {}, fragments);
}

function getOpenCriteriaFragment(
  quest: QuestInstance,
  actor_name: string,
  criteria: UnitCriteria,
  actor_unit: Unit | null,
): DOM.Node {
  return html`<span class="toprightspan">
    <div class="button-full-container">
      ${setup.DOM.Nav.button(actor_unit ? `Change` : `Select unit`, () => {
        State.variables.gAdhocQuestCriteriaOpenActor = actor_name;
        setup.DOM.Nav.goto();
      })}
    </div>
  </span>`;
}

function clearVariables() {
  delete State.variables.gAdhocUnitUsed;
  delete State.variables.gAdhocQuestActorMap;
  delete State.variables.gAdhocQuest_key;
  delete State.variables.gAdhocQuestCriteriaOpenActor;
}

export const DOM_Menu_questassign = function (quest: QuestInstance): DOM.Node {
  /* bypass foctimed */
  State.temporary.foctimed_is_tooltip = true;

  const fragments: DOM.Attachable[] = [];
  fragments.push(html`
    <div>
      ${setup.DOM.Nav.link(
        "Cancel",
        () => {
          clearVariables();
        },
        "QuestHub",
      )}
    </div>
  `);

  fragments.push(setup.DOM.Card.quest(quest));

  const criterias = quest.getTemplate().getUnitCriterias();

  /* Find out which one to open by default */
  if (!State.variables.gAdhocQuestCriteriaOpenActor) {
    for (const actor_name in criterias) {
      if (!State.variables.gAdhocQuestActorMap![actor_name]) {
        State.variables.gAdhocQuestCriteriaOpenActor = actor_name;
        break;
      }
    }
  }

  const open_actor = State.variables.gAdhocQuestCriteriaOpenActor;

  /* Show one by one */
  for (const actor_name in criterias) {
    const criteria = criterias[actor_name].criteria;
    const actor_unit_key = State.variables.gAdhocQuestActorMap![actor_name];
    const actor_unit = State.variables.unit[actor_unit_key];
    const inner = [];

    /* Show name and unit */
    inner.push(html` ${setup.DOM.Util.namebold(criteria)} `);

    if (actor_unit) {
      inner.push(html`
        : ${actor_unit.rep()}
        ${criteria.repActor(actor_unit, quest.getTemplate().getDifficulty())}
      `);
    } else if (open_actor == actor_name) {
      inner.push(html` | ${setup.DOM.Card.criteria(criteria)} `);
    }

    if (open_actor == actor_name) {
      /* Show list of units to assign to this criteria */
      inner.push(
        getSelectUnitFragment(quest, actor_name, criteria, actor_unit),
      );
    } else {
      inner.push(
        getOpenCriteriaFragment(quest, actor_name, criteria, actor_unit),
      );
    }

    fragments.push(
      setup.DOM.create("div", { class: "questassignrolecard card" }, inner),
    );
  }

  const all_actors_filled = setup.QuestAssignHelper.isAllActorsFilled();
  if (all_actors_filled) {
    fragments.push(html`
      <div>
        ${setup.QuestAssignHelper.computeSuccessObjRep()}
        ${setup.DOM.Util.include("QuestAssignHelp")}
      </div>
    `);
  }

  {
    const inner = [];
    if (all_actors_filled) {
      inner.push(
        setup.DOM.Nav.button(
          `Confirm`,
          () => {
            setup.QuestAssignHelper.finalize(quest);
            clearVariables();
          },
          `QuestHub`,
        ),
      );

      setup.DOM.Nav.topLeftNavigation(
        setup.DOM.Nav.link(
          `Confirm [space]`,
          () => {
            setup.QuestAssignHelper.finalize(quest);
            clearVariables();
          },
          `QuestHub`,
        ),
      );
    }

    inner.push(
      setup.DOM.Nav.link(
        `(cancel)`,
        () => {
          clearVariables();
        },
        `QuestHub`,
      ),
    );

    fragments.push(setup.DOM.create("div", {}, inner));
  }

  State.temporary.foctimed_is_tooltip = false;
  return setup.DOM.create("div", {}, fragments);
};
