import type {
  OpportunityTemplate,
  OpportunityTemplateKey,
} from "../../opportunity/OpportunityTemplate";

export default class Opportunity extends Cost {
  template_key: OpportunityTemplateKey;
  default_assignment?: Record<string, string>;

  constructor(
    opportunity_template: OpportunityTemplate | OpportunityTemplateKey,
    default_assignment?: Record<string, string>,
  ) {
    super();

    if (!opportunity_template) throw new Error(`Undefined oporunity`);

    this.template_key = resolveKey(opportunity_template);
    this.default_assignment = default_assignment;
  }

  override text() {
    const assignment_text = setup.qcImpl.QuestDirect.assignmentTextHelper(
      this.default_assignment,
    );
    return `setup.qc.Opportunity('${this.template_key}', ${assignment_text})`;
  }

  override apply(context?: CostContext) {
    let template = setup.opportunitytemplate[this.template_key];
    const assignment = setup.qcImpl.QuestDirect.getDefaultAssignment(
      this.default_assignment,
      context,
    );
    let opportunity = setup.QuestPool.instantiateOpportunity(
      template,
      assignment,
    );
    if (!opportunity) {
      console.log(
        `Something wrong when trying to generate opportunity ${template.key}`,
      );
      setup.notify(
        `Something wrong when trying to generate opportunity ${template.getName()}. Please save your game and report this bug, while attaching the save file.`,
      );
    } else {
      setup.notify(`New opportunity: ${opportunity.rep()}`);
    }
  }

  override explain() {
    const assignment_text = setup.qcImpl.QuestDirect.assignmentExplainHelper(
      this.default_assignment,
    );
    return `New opportunity: ${setup.opportunitytemplate[this.template_key].rep()} ${assignment_text}`;
  }
}
