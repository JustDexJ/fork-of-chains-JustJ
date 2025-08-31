import { createMemo, For, Show } from "solid-js";
import type { ActivityInstance } from "../../classes/activity/ActivityInstance";
import { ContentTemplate } from "../../classes/content/ContentTemplate";
import type { EventInstance } from "../../classes/event/EventInstance";
import type { InteractionInstance } from "../../classes/interaction/InteractionInstance";
import type { OpportunityInstance } from "../../classes/opportunity/OpportunityInstance";
import type { QuestInstanceKey } from "../../classes/quest/QuestInstance";
import type { QuestUnitCriteria } from "../../classes/quest/QuestTemplate";
import { Help, Message } from "../components/common";
import {
  MenuItemAction,
  MenuItemDanger,
  MenuItemExtras,
  MenuItemText,
  MenuItemTitle,
  MenuItemToolbar,
} from "../components/menubar/MenuItem";
import { domCardRep } from "../util/cardnamerep";
import { AuthorCard } from "./AuthorCard";
import { CostsCard } from "./CostsCard";
import { RoleAssignMenu } from "./RoleAssignMenu";
import { UnitCriteriaCard } from "./UnitCriteriaCard";

/**
 * Prints the quest author
 */
export const ContentAuthorCard: Component<{ template: ContentTemplate }> = (
  props,
) => {
  return (
    <Show when={props.template.getAuthor().name}>
      <AuthorCard value={props.template.getAuthor()} />
    </Show>
  );
};

function getCompactDivId(quest: QuestInstance): string {
  return `questhubquestdiv${quest.key}`;
}

const QuestUnitRoleFragment: Component<{
  actor_obj: [string, QuestUnitCriteria, Unit | null];
}> = (props) => {
  const getCriteria = () => props.actor_obj[1].criteria;
  const getOffsetMod = () => props.actor_obj[1].offsetmod;
  const getUnit = () => props.actor_obj[2];

  return (
    <div class="actorcard">
      {setup.DOM.Util.namebold(getCriteria())}
      {getOffsetMod() == 1 ? "" : `(Important: ${getOffsetMod()}x)`}
      <UnitCriteriaCard criteria={getCriteria()} unit={getUnit()} />
    </div>
  );
};

const QuestUnitRolesFragment: Component<{ quest: QuestInstance }> = (props) => {
  return (
    <span>
      <For each={Object.values(props.quest.getUnitCriteriasList())}>
        {(actor_obj) => <QuestUnitRoleFragment actor_obj={actor_obj} />}
      </For>
    </span>
  );
};

export const QuestDurationFragment: Component<{ quest: QuestInstance }> = (
  props,
) => {
  return (
    <Show
      when={props.quest.getTeam()}
      fallback={
        <span data-tooltip="Quest duration">
          {" "}
          {props.quest.getTemplate().getWeeks()} wks{" "}
        </span>
      }
    >
      Completed in {props.quest.getRemainingWeeks()} wk
      {props.quest.getRemainingWeeks() === 1 ? "" : "s"}
    </Show>
  );
};

const QuestNameActionMenu: Component<{
  quest: QuestInstance;
  show_actions?: boolean;
  show_open_button?: boolean;
  show_hide_button?: boolean;
}> = (props) => {
  return (
    <MenuItemToolbar>
      <Show when={props.show_hide_button}>
        <MenuItemAction
          text="Close"
          callback={() => {
            setup.DOM.Helper.replace(
              `#${getCompactDivId(props.quest)} `,
              <QuestCardCompactInternal
                quest={props.quest}
                show_actions={props.show_actions}
              />,
            );
          }}
        />
      </Show>

      <Show when={props.show_open_button}>
        <MenuItemAction
          text="View"
          callback={() => {
            const selector = `#${getCompactDivId(props.quest)}`;
            setup.DOM.Helper.replace(
              selector,
              <QuestCard
                quest={props.quest}
                show_actions={props.show_actions}
              />,
            );
          }}
        />
      </Show>

      <MenuItemTitle
        text={
          <>
            <span>
              {setup.TagHelper.getTagsRep(
                "quest",
                props.quest.getTemplate().getTags(),
              )}
            </span>
            <Show
              when={
                !State.variables.statistics.isHasSuccess(
                  props.quest.getTemplate(),
                )
              }
            >
              <span class="quest-new">NEW</span>
            </Show>
            <span>{props.quest.getTemplate().getDifficulty().repJSX()}</span> ·{" "}
            {domCardRep(props.quest)}
          </>
        }
      />

      <MenuItemAction
        text={
          <>
            {props.quest
              .getTemplate()
              .getMainSkills()
              .map((skill) => skill.repJSX())}
            <span class="questcard-numunits" data-tooltip="Number of units">
              {
                Object.values(props.quest.getTemplate().getUnitCriterias())
                  .length
              }
              <img src={setup.resolveImageUrl(`img/special/unit.svg`)} />
            </span>
          </>
        }
        callback={() => {
          setup.Dialogs.open({
            title: `Full quest roles`,
            content: setup.DOM.renderComponent(() => (
              <div>
                <div>Quest roles for {props.quest.repJSX()}:</div>
                <div>
                  <QuestUnitRolesFragment quest={props.quest} />
                </div>
              </div>
            )),
          }).then(() => {
            setup.DOM.Nav.goto();
          });
        }}
      />

      {/* costs */}
      <Show when={props.quest.getTemplate().getCosts()?.length}>
        <MenuItemText
          text={
            <>
              Costs:{" "}
              <CostsCard
                costs={props.quest.getTemplate().getCosts()}
                obj={props.quest}
              />
            </>
          }
        />
      </Show>

      {/* duration */}
      <MenuItemText text={<QuestDurationFragment quest={props.quest} />} />

      <Show
        when={
          !props.quest.getTeam() &&
          props.quest.getTemplate().getDeadlineWeeks() < setup.INFINITY
        }
      >
        <MenuItemText
          tooltip={`Quest expires in ${props.quest.getWeeksUntilExpired()} week${props.quest.getWeeksUntilExpired() !== 1 ? "s" : ""}`}
          text={html`${props.quest.getWeeksUntilExpired() == 1
            ? setup.DOM.Text.danger(props.quest.getWeeksUntilExpired())
            : `${props.quest.getWeeksUntilExpired()}`}
          wk${props.quest.getWeeksUntilExpired() === 1 ? "" : "s"} left`}
        />
      </Show>

      <Show when={State.variables.gDebug}>
        <MenuItemExtras>
          <MenuItemDanger
            text="Debug remove"
            callback={() => {
              props.quest.cleanup();
              State.variables.company.player.archiveQuest(props.quest);
              setup.DOM.Nav.goto();
            }}
          />
        </MenuItemExtras>
      </Show>
    </MenuItemToolbar>
  );
};

export const QuestCompactCard = QuestNameActionMenu;

const QuestToolbar: Component<{ quest: QuestInstance }> = (props) => {
  return (
    <Show
      when={props.quest.isCanChangeTeam()}
      fallback={
        <div>
          {setup.QuestDifficulty.explainChance(props.quest.getScoreObj())}
        </div>
      }
    >
      <Show
        when={
          !props.quest.getTeam() &&
          !State.variables.company.player.isCanDeployTeam()
        }
        fallback={
          <MenuItemToolbar>
            <RoleAssignMenu instance={props.quest} />
          </MenuItemToolbar>
        }
      >
        <div>
          You cannot send more teams concurrently on a quest
          <Help>
            You are limited to sending at most
            {setup.DOM.Text.success(
              State.variables.company.player.getMaxActiveTeams(),
            )}
            teams concurrently on a quest. You can increase this limit by
            building and upgrading the
            {setup.buildingtemplate.missioncontrol.repJSX()}.
          </Help>
        </div>
      </Show>
    </Show>
  );
};

const QuestExtraActorsFragment: Component<{ quest: QuestInstance }> = (
  props,
) => {
  const getActors = createMemo(() => {
    return Object.values(props.quest.getExtraActors()).filter((unit) =>
      unit.isYourCompany(),
    );
  });

  return (
    <Show when={getActors().length}>
      <div>
        Involved:
        <For each={getActors()}>{(unit) => unit.repLongJSX()}</For>
      </div>
    </Show>
  );
};

const QuestCardCompactInternal: Component<{
  quest: QuestInstance;
  show_actions?: boolean;
}> = (props) => {
  const getIsShort = () =>
    State.variables.menufilter.get("quest", "display") == "short";

  return (
    <div
      class={
        getIsShort() ? props.quest.getTemplate().getCardClass() : undefined
      }
    >
      <QuestNameActionMenu
        quest={props.quest}
        show_actions={props.show_actions}
        show_open_button={true}
      />
      <Show when={getIsShort()}>
        <QuestToolbar quest={props.quest} />
      </Show>
    </div>
  );
};

export const ContentInstanceDescription: Component<{
  instance:
    | QuestInstance
    | OpportunityInstance
    | EventInstance
    | ActivityInstance
    | InteractionInstance;
  passage: string;
}> = (props) => {
  const getRenderedText = createMemo(() => {
    setup.DOM.Helper.loadQuestVars(props.instance);
    State.temporary.quest = props.instance;
    State.temporary.outcome_passage = props.passage;
    const rendered = setup.DOM.Util.include_replace("WeekendRenderQuestEvent");
    delete State.temporary.quest;
    delete State.temporary.outcome_passage;
    return rendered;
  });

  return (
    <div class="description-render">
      {getRenderedText()}{" "}
      <ContentAuthorCard template={props.instance.getTemplate()} />
    </div>
  );
};

/** @deprecated */
export function renderDescription(
  instance:
    | QuestInstance
    | OpportunityInstance
    | EventInstance
    | ActivityInstance
    | InteractionInstance,
  passage: string,
) {
  return <ContentInstanceDescription instance={instance} passage={passage} />;
}

const QuestDescriptionFragment: Component<{ quest: QuestInstance }> = (
  props,
) => {
  const template = props.quest.getTemplate();
  const description_display = State.variables.menufilter.get("quest", "text");
  if (
    description_display == "hidden" ||
    (description_display == "new" &&
      State.variables.statistics.isHasSuccess(template))
  ) {
    return (
      <Message label="(description)">
        {() => (
          <ContentInstanceDescription
            instance={props.quest}
            passage={props.quest.getDescriptionPassage()}
          />
        )}
      </Message>
    );
  } else {
    return (
      <ContentInstanceDescription
        instance={props.quest}
        passage={props.quest.getDescriptionPassage()}
      />
    );
  }
};

const QuestCardAsyncFragment: Component<{
  quest: QuestInstance;
  show_actions?: boolean;
}> = (props) => {
  return (
    <span>
      <Show when={props.show_actions}>
        <QuestToolbar quest={props.quest} />
      </Show>

      {/* team */}
      <Show when={props.quest.getTeam()}>
        <For each={Object.values(props.quest.getUnitCriteriasList())}>
          {(actorobj) => {
            const criteria = actorobj[1].criteria;
            const unit = actorobj[2];
            return (
              <div>
                {setup.DOM.Util.namebold(criteria)}
                <Message label="(+)">
                  <QuestUnitRoleFragment actor_obj={actorobj} />
                </Message>
                {!unit ? null : (
                  <>
                    {unit.repLongJSX()}{" "}
                    {criteria.repActor(
                      unit,
                      props.quest.getTemplate().getDifficulty(),
                    )}
                  </>
                )}
              </div>
            );
          }}
        </For>
      </Show>

      {/* description */}
      <Show when={!State.variables.devtooltype}>
        <div class="textcard">
          <QuestDescriptionFragment quest={props.quest} />
        </div>
      </Show>
    </span>
  );
};

export const QuestCard: Component<{
  quest: QuestInstance;
  show_actions?: boolean;
}> = (props) => {
  return (
    <div class={`${props.quest.getTemplate().getCardClass()} card`}>
      <QuestNameActionMenu
        quest={props.quest}
        show_actions={props.show_actions}
        show_open_button={false}
        show_hide_button={
          props.show_actions &&
          ["short", "compact"].includes(
            State.variables.menufilter.get("quest", "display")!,
          )
        }
      />

      {/* units for trainings etc */}
      <QuestExtraActorsFragment quest={props.quest} />

      <QuestCardAsyncFragment
        quest={props.quest}
        show_actions={props.show_actions}
      />

      {/* debug actions */}
      <Show when={State.variables.gDebug}>
        <div>
          <Message label="(DEBUG: show actors)">
            {() => {
              const actors = props.quest.getActorsList();
              return actors.map(([actor_name, unit]) => (
                <div>
                  {actor_name}: {unit.repLongJSX()}
                </div>
              ));
            }}
          </Message>
        </div>
      </Show>
    </div>
  );
};

export default {
  questcompact(quest: QuestInstance, show_actions?: boolean): DOM.Node {
    return setup.DOM.renderComponent(() => (
      <div id={getCompactDivId(quest)}>
        <QuestCardCompactInternal quest={quest} show_actions={show_actions} />
      </div>
    ));
  },

  quest(
    quest_or_key: QuestInstance | QuestInstanceKey,
    show_actions?: boolean,
  ): DOM.Node {
    const quest = resolveObject(quest_or_key, State.variables.questinstance);
    return setup.DOM.renderComponent(QuestCard, { quest, show_actions });
  },

  /**
   * Prints the quest author
   */
  questauthor(template: ContentTemplate): DOM.Node {
    return setup.DOM.renderComponent(ContentAuthorCard, { template });
  },
};
