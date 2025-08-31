import type { ActivityTemplate } from "../../classes/activity/ActivityTemplate";
import { ContentTemplate } from "../../classes/content/ContentTemplate";
import type { EventTemplate } from "../../classes/event/EventTemplate";
import type { InteractionTemplate } from "../../classes/interaction/InteractionTemplate";
import type { OpportunityTemplate } from "../../classes/opportunity/OpportunityTemplate";
import { domCardName } from "../util/cardnamerep";

const ContentTemplateTitleFragment: Component<{ template: ContentTemplate }> = (
  props,
) => {
  return (
    <>
      {setup.TagHelper.getTagsRep("quest", props.template.getTags())}
      {props.template.getDifficulty().repJSX()} {domCardName(props.template)}
      {props.template.getAuthor().name
        ? `by ${props.template.getAuthor().name}`
        : ``}
    </>
  );
};

export const QuestTemplateCard: Component<{ template: QuestTemplate }> = (
  props,
) => {
  return (
    <div>
      {setup.DOM.Nav.button(`Edit`, () => {
        State.temporary.questchosen = props.template;
        return setup.DOM.Util.include("QuestGenSetupExistingDo");
      })}

      {setup.DOM.Nav.link(`(test)`, () => {
        State.variables.qDebugQuestTemplate_key = props.template.key;
        return setup.DOM.Nav.goto("QuestDebugDo");
      })}
      <ContentTemplateTitleFragment template={props.template} />
    </div>
  );
};

export const OpportunityTemplateCard: Component<{
  template: OpportunityTemplate;
}> = (props) => {
  return (
    <div>
      {setup.DOM.Nav.button(`Open`, () => {
        State.temporary.opportunitychosen = props.template;
        return setup.DOM.Util.include("OpportunityGenSetupExistingDo");
      })}

      {setup.DOM.Nav.link(`(test)`, () => {
        State.variables.qDebugOpportunityTemplate_key = props.template.key;
        return setup.DOM.Nav.goto("OpportunityDebugDo");
      })}
      <ContentTemplateTitleFragment template={props.template} />
    </div>
  );
};

export const EventTemplateCard: Component<{ template: EventTemplate }> = (
  props,
) => {
  return (
    <div>
      {setup.DOM.Nav.button(`Open`, () => {
        State.temporary.eventchosen = props.template;
        return setup.DOM.Util.include("EventGenSetupExistingDo");
      })}

      {setup.DOM.Nav.link(`(test)`, () => {
        State.variables.qDebugEventTemplate_key = props.template.key;
        return setup.DOM.Nav.goto("EventDebugDo");
      })}
      <ContentTemplateTitleFragment template={props.template} />
    </div>
  );
};

export const InteractionTemplateCard: Component<{
  template: InteractionTemplate;
}> = (props) => {
  return (
    <div>
      {setup.DOM.Nav.button(`Open`, () => {
        State.temporary.ibase = props.template;
        setup.DOM.Util.include("InteractionGenSetup");
        setup.runSugarCubeCommand(`<<goto InteractionGen>>`);
      })}

      {setup.DOM.Nav.link(`(test)`, () => {
        State.variables.qDebugInteractionTemplate_key = props.template.key;
        return setup.DOM.Nav.goto("InteractionDebugDo");
      })}
      <ContentTemplateTitleFragment template={props.template} />
    </div>
  );
};

export const ActivityTemplateCard: Component<{ template: ActivityTemplate }> = (
  props,
) => {
  return (
    <div>
      {setup.DOM.Nav.button(`Open`, () => {
        State.temporary.activitychosen = props.template;
        return setup.DOM.Util.include("ActivityGenSetupExistingDo");
      })}

      {setup.DOM.Nav.link(`(test)`, () => {
        State.variables.qDebugActivityTemplate_key = props.template.key;
        return setup.DOM.Nav.goto("ActivityDebugDo");
      })}
      <ContentTemplateTitleFragment template={props.template} />
    </div>
  );
};

export default {
  questtemplate(template: QuestTemplate): DOM.Node {
    return setup.DOM.renderComponent(QuestTemplateCard, { template });
  },

  opportunitytemplate(template: OpportunityTemplate): DOM.Node {
    return setup.DOM.renderComponent(OpportunityTemplateCard, { template });
  },

  event(template: EventTemplate): DOM.Node {
    return setup.DOM.renderComponent(EventTemplateCard, { template });
  },

  interaction(template: InteractionTemplate): DOM.Node {
    return setup.DOM.renderComponent(InteractionTemplateCard, { template });
  },

  activitytemplate(template: ActivityTemplate): DOM.Node {
    return setup.DOM.renderComponent(ActivityTemplateCard, { template });
  },
};
