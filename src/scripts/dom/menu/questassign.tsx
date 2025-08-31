import {
  createEffect,
  createMemo,
  createSignal,
  For,
  Match,
  onMount,
  Show,
  Switch,
} from "solid-js";
import { createMutable } from "solid-js/store";
import { UnitCriteria } from "../../classes/criteria/UnitCriteria";
import type { QuestDifficulty } from "../../classes/quest/QuestDifficulty";
import { QuestAssignHelper } from "../../util/questassign";
import { QuestCard } from "../card/QuestInstanceCard";
import { UnitCriteriaCard } from "../card/UnitCriteriaCard";
import { Button, Link, Message } from "../components/common";
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

const SelectUnitFragment: Component<{
  quest: QuestInstance;
  actormap: ActorUnitKeyMap;
  actor_name: string;
  criteria: UnitCriteria;
  actor_unit: Unit | null;
}> = (props) => {
  const [getSortScoreOrder, setSortScoreOrder] = createSignal(
    State.variables.menufilter.get("unitquest", "sortscore"),
  );

  const getVisibleUnits = createMemo(() => {
    const quest = props.quest;
    const criteria = props.criteria;

    const units = criteria
      .getEligibleUnits(quest)
      .filter((unit) => unit !== props.actor_unit);

    const sort_score = getSortScoreOrder();
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
    return units;
  });

  return (
    <div>
      <div>
        <b>Select unit for </b>
        {setup.DOM.Util.namebold(props.criteria)}:
        <Message label="(?)">
          {setup.DOM.Util.include("QuestAssignHelp")}
        </Message>
      </div>

      <FilterableList
        menu="unitquest"
        filter_objects={getVisibleUnits()}
        onFiltersChanged={() => {
          setSortScoreOrder(
            State.variables.menufilter.get("unitquest", "sortscore"),
          );
        }}
        display_callback={(unit: Unit) => (
          <div>
            <Button
              onClick={() => {
                QuestAssignHelper.assignUnit(
                  props.actor_name,
                  unit,
                  props.criteria,
                  props.actormap,
                );
              }}
            >
              Select
            </Button>
            <Show
              when={Object.values(props.actormap).includes(unit.key)}
              fallback={unit.repBusyStateJSX(true)}
            >
              {setup.repImgIconJSX(
                setup.Unit.DANGER_IMAGE_URL,
                `Unit already going on this quest`,
              )}
            </Show>
            {setup.DOM.Util.level(unit.getLevel())} {unit.repFull()}
            {props.criteria.repActor(
              unit,
              props.quest.getTemplate().getDifficulty(),
            )}
          </div>
        )}
      />
    </div>
  );
};

const OpenCriteriaFragment: Component<{
  quest: QuestInstance;
  actor_name: string;
  criteria: UnitCriteria;
  actor_unit: Unit | null;
  onSelect: (actor_name: string) => void;
}> = (props) => {
  return (
    <span class="toprightspan">
      <div class="button-full-container">
        <Button
          onClick={() => {
            props.onSelect(props.actor_name);
          }}
        >
          {props.actor_unit ? `Change` : `Select unit`}
        </Button>
      </div>
    </span>
  );
};

function clearVariables() {
  //delete State.variables.gAdhocUnitUsed;
  //delete State.variables.gAdhocQuestActorMap;
  delete State.variables.gAdhocQuest_key;
  //delete State.variables.gAdhocQuestCriteriaOpenActor;
}

export const QuestRoleAssignCard: Component<{ quest: QuestInstance }> = (
  props,
) => {
  /* bypass foctimed */
  //State.temporary.foctimed_is_tooltip = true;
  //State.temporary.foctimed_is_tooltip = false;

  const [getCurrentRole, setCurrentRole] = createSignal<string | null>(null);

  const actormap = createMutable<ActorUnitKeyMap>({});

  const openNextUnassignedRole = () => {
    const unit_assignment = props.quest.getUnitCriteriasList();
    for (const [actor_name] of unit_assignment) {
      if (!actormap[actor_name]) {
        setCurrentRole(actor_name);
        return;
      }
    }
    setCurrentRole(null);
  };

  onMount(() => {
    const unit_assignment = props.quest.getUnitCriteriasList();
    for (const [actor_name, _, unit] of unit_assignment) {
      if (unit) {
        actormap[actor_name] = unit.key;
      }
    }

    // By default open the first role not assigned
    openNextUnassignedRole();
  });

  createEffect(() => {
    const _ = JSON.stringify(actormap); // subscribe to changes
    openNextUnassignedRole();
  });

  return (
    <div>
      <div>
        <Link passage="QuestHub" onClick={() => clearVariables()}>
          Cancel
        </Link>
      </div>

      <QuestCard quest={props.quest} />

      {/* Show one by one */}
      <For each={Object.entries(props.quest.getTemplate().getUnitCriterias())}>
        {([actor_name, entry]) => {
          const getAssignedUnit = () => {
            const unit_key = actormap[actor_name];
            return unit_key ? State.variables.unit[unit_key] : null;
          };

          return (
            <div class="questassignrolecard card">
              {/* Show name and unit */}
              {setup.DOM.Util.namebold(entry.criteria)}

              <Switch>
                <Match when={getAssignedUnit()}>
                  : {getAssignedUnit()!.repJSX()}
                  <div>
                    {entry.criteria.repActor(
                      getAssignedUnit()!,
                      props.quest.getTemplate().getDifficulty(),
                    )}
                  </div>
                </Match>
                <Match when={getCurrentRole() === actor_name}>
                  | <UnitCriteriaCard criteria={entry.criteria} />
                </Match>
              </Switch>

              <Show
                when={getCurrentRole() === actor_name}
                fallback={
                  <OpenCriteriaFragment
                    quest={props.quest}
                    actor_name={actor_name}
                    criteria={entry.criteria}
                    actor_unit={getAssignedUnit()}
                    onSelect={setCurrentRole}
                  />
                }
              >
                {/* Show list of units to assign to this criteria */}
                <SelectUnitFragment
                  quest={props.quest}
                  actormap={actormap}
                  actor_name={actor_name}
                  criteria={entry.criteria}
                  actor_unit={getAssignedUnit()}
                />
              </Show>
            </div>
          );
        }}
      </For>

      <Show
        when={setup.QuestAssignHelper.isAllActorsFilled(props.quest, actormap)}
      >
        <div>
          {setup.QuestAssignHelper.computeSuccessObjRep(props.quest, actormap)}
          <Message label="(?)">
            {setup.DOM.Util.include("QuestAssignHelp")}
          </Message>
        </div>
      </Show>

      <div>
        <Show
          when={setup.QuestAssignHelper.isAllActorsFilled(
            props.quest,
            actormap,
          )}
        >
          <Button
            passage="QuestHub"
            onClick={() => {
              setup.QuestAssignHelper.finalize(props.quest, actormap);
              clearVariables();
            }}
          >
            Confirm
          </Button>
          {(() => {
            setup.DOM.Nav.topLeftNavigation(
              setup.DOM.Nav.link(
                `Confirm [space]`,
                () => {
                  setup.QuestAssignHelper.finalize(props.quest, actormap);
                  clearVariables();
                },
                `QuestHub`,
              ),
            );
            return null;
          })()}
        </Show>{" "}
        <Link passage="QuestHub" onClick={() => clearVariables()}>
          (cancel)
        </Link>
      </div>
    </div>
  );
};

export const DOM_Menu_questassign = function (quest: QuestInstance): DOM.Node {
  return setup.DOM.renderComponent(QuestRoleAssignCard, { quest });
};
