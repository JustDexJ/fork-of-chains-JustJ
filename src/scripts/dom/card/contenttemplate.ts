import type { ActivityTemplate } from "../../classes/activity/ActivityTemplate";
import { ContentTemplate } from "../../classes/content/ContentTemplate";
import type { EventTemplate } from "../../classes/event/EventTemplate";
import type { InteractionTemplate } from "../../classes/interaction/InteractionTemplate";
import type { OpportunityTemplate } from "../../classes/opportunity/OpportunityTemplate";
import { domCardName } from "../util/cardnamerep";

function getContentTemplateTitleFragment(template: ContentTemplate): DOM.Node {
  const author = template.getAuthor();
  return html`
    ${setup.TagHelper.getTagsRep("quest", template.getTags())}
    ${template.getDifficulty().rep()} ${domCardName(template)}
    ${author.name ? `by ${author.name}` : ``}
  `;
}

export default {
  questtemplate(template: QuestTemplate): DOM.Node {
    return html`
      <div>
        ${setup.DOM.Nav.button(`Edit`, () => {
          State.temporary.questchosen = template;
          return setup.DOM.Util.include("QuestGenSetupExistingDo");
        })}
        ${setup.DOM.Nav.link(`(test)`, () => {
          State.variables.qDebugQuestTemplate_key = template.key;
          return setup.DOM.Nav.goto("QuestDebugDo");
        })}
        ${getContentTemplateTitleFragment(template)}
      </div>
    `;
  },

  opportunitytemplate(template: OpportunityTemplate): DOM.Node {
    return html`
      <div>
        ${setup.DOM.Nav.button(`Open`, () => {
          State.temporary.opportunitychosen = template;
          return setup.DOM.Util.include("OpportunityGenSetupExistingDo");
        })}
        ${setup.DOM.Nav.link(`(test)`, () => {
          State.variables.qDebugOpportunityTemplate_key = template.key;
          return setup.DOM.Nav.goto("OpportunityDebugDo");
        })}
        ${getContentTemplateTitleFragment(template)}
      </div>
    `;
  },

  event(template: EventTemplate): DOM.Node {
    return html`
      <div>
        ${setup.DOM.Nav.button(`Open`, () => {
          State.temporary.eventchosen = template;
          return setup.DOM.Util.include("EventGenSetupExistingDo");
        })}
        ${setup.DOM.Nav.link(`(test)`, () => {
          State.variables.qDebugEventTemplate_key = template.key;
          return setup.DOM.Nav.goto("EventDebugDo");
        })}
        ${getContentTemplateTitleFragment(template)}
      </div>
    `;
  },

  interaction(template: InteractionTemplate): DOM.Node {
    return html`
      <div>
        ${setup.DOM.Nav.button(`Open`, () => {
          State.temporary.ibase = template;
          setup.DOM.Util.include("InteractionGenSetup");
          setup.runSugarCubeCommand(`<<goto InteractionGen>>`);
        })}
        ${setup.DOM.Nav.link(`(test)`, () => {
          State.variables.qDebugInteractionTemplate_key = template.key;
          return setup.DOM.Nav.goto("InteractionDebugDo");
        })}
        ${getContentTemplateTitleFragment(template)}
      </div>
    `;
  },

  activitytemplate(template: ActivityTemplate): DOM.Node {
    return html`
      <div>
        ${setup.DOM.Nav.button(`Open`, () => {
          State.temporary.activitychosen = template;
          return setup.DOM.Util.include("ActivityGenSetupExistingDo");
        })}
        ${setup.DOM.Nav.link(`(test)`, () => {
          State.variables.qDebugActivityTemplate_key = template.key;
          return setup.DOM.Nav.goto("ActivityDebugDo");
        })}
        ${getContentTemplateTitleFragment(template)}
      </div>
    `;
  },
};
