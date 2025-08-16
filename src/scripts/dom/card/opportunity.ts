import type { OpportunityInstance } from "../../classes/opportunity/OpportunityInstance";
import {
  menuItemDanger,
  menuItemExtras,
  menuItemText,
  menuItemTitle,
} from "../../ui/menuitem";
import { domCardRep } from "../util/cardnamerep";
import { renderDescription } from "./quest";

function getOpportunityTitleFragment(opportunity: OpportunityInstance) {
  const template = opportunity.getTemplate();
  return html`
    ${setup.TagHelper.getTagsRep("opportunity", template.getTags())}
    ${template.getDifficulty().rep()} ${domCardRep(opportunity)}
  `;
}

function getOpportunityExpiresFragment(opportunity: OpportunityInstance) {
  const template = opportunity.getTemplate();

  if (template.isMustBeAnswered()) {
    return html`
      <span
        data-tooltip="This mail must be answered before you can end the week"
      >
        ${setup.DOM.Text.danger("Important")}
      </span>
    `;
  } else if (template.getDeadlineWeeks() < setup.INFINITY) {
    return html` ${opportunity.getWeeksUntilExpired()} wks left `;
  } else {
    return null;
  }
}

function opportunityNameActionMenu(
  opportunity: OpportunityInstance,
  hide_actions?: boolean,
): JQuery[] {
  const template = opportunity.getTemplate();

  const menus: JQuery[] = [];
  const extras: JQuery[] = [];

  menus.push(
    menuItemTitle({
      text: getOpportunityTitleFragment(opportunity),
    }),
  );

  if (template.isMustBeAnswered()) {
    menus.push(
      menuItemText({
        tooltip: `This mail must be answered before you can end the week`,
        text: setup.DOM.Text.danger("Important"),
      }),
    );
  } else if (template.getDeadlineWeeks() < setup.INFINITY) {
    const expires = opportunity.getWeeksUntilExpired();
    menus.push(
      menuItemText({
        text: `${expires} week${expires > 1 ? "s" : ""} left`,
      }),
    );
  } else {
    menus.push(
      menuItemText({
        text: `Never expires`,
      }),
    );
  }

  if (
    !State.variables.fort.player.isHasBuilding(setup.buildingtemplate.mailroom)
  ) {
    menus.push(
      menuItemText({
        text: html`Build the ${setup.buildingtemplate.mailroom.rep()} to answer
        this mail`,
      }),
    );
  }

  if (State.variables.gDebug) {
    extras.push(
      menuItemDanger({
        text: "Debug remove",
        callback: () => {
          State.variables.opportunitylist.removeOpportunity(opportunity);
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

function getOpportunityDescriptionFragment(
  opportunity: OpportunityInstance,
): DOM.Node {
  const template = opportunity.getTemplate();
  const display = State.variables.menufilter.get("opportunity", "display");
  if (display == "short") {
    return html` ${setup.DOM.Util.message("(description)", () =>
      renderDescription(opportunity, template.getDescriptionPassage()),
    )}`;
  } else {
    return renderDescription(opportunity, template.getDescriptionPassage());
  }
}

export default {
  opportunity(
    opportunity: OpportunityInstance,
    hide_actions?: boolean,
  ): DOM.Node {
    const template = opportunity.getTemplate();

    const fragments: DOM.Attachable[] = [];

    fragments.push(
      setup.DOM.Util.menuItemToolbar(
        opportunityNameActionMenu(opportunity, hide_actions),
      ),
    );

    // description
    fragments.push(html`
      <div class="textcard">
        ${getOpportunityDescriptionFragment(opportunity)}
      </div>
    `);

    // options
    setup.DOM.Helper.loadQuestVars(opportunity);
    const options = template.getVisibleOptions();
    for (let i = 0; i < options.length; ++i) {
      const option = options[i];
      const passage = option.description_passage;
      const cost = option.costs;
      const restrictions = option.restrictions;

      const inner_fragments = [];

      inner_fragments.push(html`
        <div>
          ${setup.DOM.Util.include_replace(passage)}
          ${setup.DOM.Card.cost(cost)}
          ${setup.DOM.Card.restriction(restrictions, opportunity)}
        </div>
      `);

      if (!hide_actions) {
        inner_fragments.push(html`
          ${opportunity.isCanSelectOption(i)
            ? setup.DOM.Nav.button(
                `Select`,
                () => {
                  // State.variables.gSelectedPassage = opportunity.selectOption(i)
                  opportunity.selectOption(i);
                  State.variables.gOpportunity_key = opportunity.key;
                },
                `OpportunityOptionSelected`,
              )
            : html`${setup.DOM.Text.dangerlite(`Not available`)}`}
        `);
        if (State.variables.dutylist.isViceLeaderAssigned()) {
          const current_option =
            State.variables.opportunitylist.getAutoAnswer(template);
          if (current_option == i) {
            inner_fragments.push(html`
              [When available, your vice leader will
              ${setup.DOM.Text.successlite(`auto-answer`)} with this]
              ${setup.DOM.Nav.link(`(remove auto-answer)`, () => {
                State.variables.opportunitylist.removeAutoAnswer(template);
                setup.DOM.Nav.goto();
              })}
            `);
          } else {
            inner_fragments.push(html`
              ${setup.DOM.Nav.link(`(set as auto-answer response)`, () => {
                State.variables.opportunitylist.setAutoAnswer(template, i);
                setup.DOM.Nav.goto();
              })}
            `);
          }
        }
      }

      fragments.push(
        setup.DOM.create(
          "div",
          { class: "opportunitycardoption clear-both" },
          inner_fragments,
        ),
      );
    }

    if (State.variables.gDebug) {
      fragments.push(html`
        <div>
          ${setup.DOM.Util.message("(DEBUG: show actors)", () => {
            const actors = opportunity.getActorsList();
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

  opportunity_option_selected(
    opportunity: OpportunityInstance,
  ): DOM.Node | null {
    const passage = opportunity.getSelectedOptionPassage();
    const fragments: DOM.Attachable[] = [];
    if (passage) {
      fragments.push(renderDescription(opportunity, passage));
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
      if (State.variables.gMenuVisible) {
        State.variables.gMenuVisible = false;
        setup.DOM.Nav.topLeftNavigation(
          setup.DOM.Nav.link(`Continue`, continue_callback),
        );
        fragments.push(html`
          <div>${setup.DOM.Nav.link("Continue...", continue_callback)}</div>
        `);
      }
      return setup.DOM.create("div", {}, fragments);
    } else {
      continue_callback();
      return null;
    }
  },
};
