import { For, Match, Show, Switch } from "solid-js";
import type {
  OpportunityInstance,
  OpportunityInstanceKey,
} from "../../classes/opportunity/OpportunityInstance";
import { Button, Link, Message } from "../components/common";
import {
  MenuItemDanger,
  MenuItemExtras,
  MenuItemText,
  MenuItemTitle,
  MenuItemToolbar,
} from "../components/menubar/MenuItem";
import { domCardRep } from "../util/cardnamerep";
import { CostsCard } from "./cost";
import { ContentInstanceDescription } from "./quest";
import { RestrictionsCard } from "./restriction";

const OpportunityExpiresFragment: Component<{
  opportunity: OpportunityInstance;
}> = (props) => {
  return (
    <Switch>
      <Match when={props.opportunity.getTemplate().isMustBeAnswered()}>
        <span data-tooltip="This mail must be answered before you can end the week">
          {setup.DOM.Text.danger("Important")}
        </span>
      </Match>

      <Match
        when={
          props.opportunity.getTemplate().getDeadlineWeeks() < setup.INFINITY
        }
      >
        {props.opportunity.getWeeksUntilExpired()} wks left
      </Match>
    </Switch>
  );
};

const OpportunityNameActionMenu: Component<{
  opportunity: OpportunityInstance;
  show_actions?: boolean;
}> = (props) => {
  const getTemplate = () => props.opportunity.getTemplate();

  return (
    <MenuItemToolbar>
      <MenuItemTitle
        text={
          <>
            {setup.TagHelper.getTagsRep("opportunity", getTemplate().getTags())}
            {getTemplate().getDifficulty().repJSX()}{" "}
            {domCardRep(props.opportunity)}
          </>
        }
      />

      <Switch fallback={<MenuItemText text="Never expires" />}>
        <Match when={getTemplate().isMustBeAnswered()}>
          <MenuItemText
            tooltip="This mail must be answered before you can end the week"
            text={setup.DOM.Text.danger("Important")}
          />
        </Match>

        <Match
          when={
            props.opportunity.getTemplate().getDeadlineWeeks() < setup.INFINITY
          }
        >
          <MenuItemText
            text={`${props.opportunity.getWeeksUntilExpired()} week${props.opportunity.getWeeksUntilExpired() > 1 ? "s" : ""} left`}
          />
        </Match>
      </Switch>

      <Show
        when={
          !State.variables.fort.player.isHasBuilding(
            setup.buildingtemplate.mailroom,
          )
        }
      >
        <MenuItemText
          text={
            <>
              Build the {setup.buildingtemplate.mailroom.repJSX()} to answer
              this mail
            </>
          }
        />
      </Show>

      <Show when={State.variables.gDebug}>
        <MenuItemExtras>
          <MenuItemDanger
            text="Debug remove"
            callback={() => {
              State.variables.opportunitylist.removeOpportunity(
                props.opportunity,
              );
            }}
          />
        </MenuItemExtras>
      </Show>
    </MenuItemToolbar>
  );
};

const OpportunityDescriptionFragment: Component<{
  opportunity: OpportunityInstance;
}> = (props) => {
  return (
    <Show
      when={
        State.variables.menufilter.get("opportunity", "display") === "short"
      }
      fallback={
        <ContentInstanceDescription
          instance={props.opportunity}
          passage={props.opportunity.getTemplate().getDescriptionPassage()}
        />
      }
    >
      <Message label="(description)">
        {() => (
          <ContentInstanceDescription
            instance={props.opportunity}
            passage={props.opportunity.getTemplate().getDescriptionPassage()}
          />
        )}
      </Message>
    </Show>
  );
};

function renderOptionPassage(
  opportunity: OpportunityInstance,
  passage: string,
) {
  setup.DOM.Helper.loadQuestVars(opportunity);
  return setup.DOM.Util.include_replace(passage);
}

export const OpportunityInstanceCard: Component<{
  opportunity: OpportunityInstance;
  show_actions?: boolean;
}> = (props) => {
  const getTemplate = () => props.opportunity.getTemplate();

  return (
    <div class={`${getTemplate().getCardClass()} card`}>
      <OpportunityNameActionMenu {...props} />

      <div class="textcard">
        <OpportunityDescriptionFragment opportunity={props.opportunity} />
      </div>

      {/* render the options */}
      <For each={getTemplate().getVisibleOptions()}>
        {(option, getOptionIndex) => (
          <div class="opportunitycardoption clear-both">
            <div>
              {renderOptionPassage(
                props.opportunity,
                option.description_passage,
              )}
              <CostsCard costs={option.costs} />
              <RestrictionsCard
                restrictions={option.restrictions}
                obj={props.opportunity}
              />
            </div>

            <Show when={props.show_actions}>
              <Show
                when={props.opportunity.isCanSelectOption(getOptionIndex())}
                fallback={setup.DOM.Text.dangerlite(`Not available`)}
              >
                <Button
                  passage="OpportunityOptionSelected"
                  onClick={() => {
                    // State.variables.gSelectedPassage = opportunity.selectOption(i)
                    props.opportunity.selectOption(getOptionIndex());
                    State.variables.gOpportunity_key = props.opportunity.key;
                  }}
                >
                  Select
                </Button>
              </Show>

              <Show when={State.variables.dutylist.isViceLeaderAssigned()}>
                <Show
                  when={
                    State.variables.opportunitylist.getAutoAnswer(
                      getTemplate(),
                    ) === getOptionIndex()
                  }
                  fallback={
                    <Link
                      onClick={() => {
                        State.variables.opportunitylist.setAutoAnswer(
                          getTemplate(),
                          getOptionIndex(),
                        );
                        setup.DOM.Nav.goto();
                      }}
                    >
                      (set as auto-answer response)
                    </Link>
                  }
                >
                  [When available, your vice leader will
                  {setup.DOM.Text.successlite(`auto-answer`)} with this]
                  <Link
                    onClick={() => {
                      State.variables.opportunitylist.removeAutoAnswer(
                        getTemplate(),
                      );
                      setup.DOM.Nav.goto();
                    }}
                  >
                    (remove auto-answer)
                  </Link>
                </Show>
              </Show>
            </Show>
          </div>
        )}
      </For>

      <Show when={State.variables.gDebug}>
        <div>
          <Message label="(DEBUG: show actors)">
            {() => (
              <For each={props.opportunity.getActorsList()}>
                {([actor_name, unit]) => (
                  <div>
                    {actor_name}: {unit.repLongJSX()}
                  </div>
                )}
              </For>
            )}
          </Message>
        </div>
      </Show>
    </div>
  );
};

export default {
  opportunity(
    opportunity_or_key: OpportunityInstance | OpportunityInstanceKey,
    show_actions?: boolean,
  ): DOM.Attachable {
    const opportunity = resolveObject(
      opportunity_or_key,
      State.variables.opportunityinstance,
    );
    return setup.DOM.renderComponent(OpportunityInstanceCard, {
      opportunity,
      show_actions,
    });
  },

  opportunity_option_selected(
    opportunity: OpportunityInstance,
  ): DOM.Attachable {
    const passage = opportunity.getSelectedOptionPassage();
    let description: DOM.JSXElement;
    if (passage) {
      description = (
        <ContentInstanceDescription instance={opportunity} passage={passage} />
      );
    }
    opportunity.finalize();
    delete State.variables.gOpportunity_key;

    function continue_callback() {
      if (State.variables.opportunitylist.getOpportunities().length) {
        setup.DOM.Nav.goto("OpportunityList");
      } else {
        setup.DOM.Nav.goto("QuestHub");
      }
    }

    if (passage) {
      State.variables.gPassage = "QuestHub";

      let continue_fragment: DOM.JSXElement = null;
      if (State.variables.gMenuVisible) {
        State.variables.gMenuVisible = false;
        setup.DOM.Nav.topLeftNavigation(
          setup.DOM.Nav.link(`Continue`, continue_callback),
        );
        continue_fragment = (
          <div>
            <Link onClick={continue_callback}>Continue...</Link>
          </div>
        );
      }

      return setup.DOM.renderComponent(() => (
        <div>
          {description}
          {continue_fragment}
        </div>
      ));
    } else {
      continue_callback();
      return null;
    }
  },
};
