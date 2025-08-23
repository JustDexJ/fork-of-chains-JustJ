import type {
  OpportunityTemplate,
  OpportunityTemplateKey,
} from "../../opportunity/OpportunityTemplate";

export default class NoOpportunity extends Restriction {
  template_key: OpportunityTemplateKey;

  constructor(template: OpportunityTemplate | OpportunityTemplateKey) {
    super();

    if (!template) throw new Error(`Missing template for NoOpportunity`);
    this.template_key = resolveKey(template);
  }

  override text(): string {
    return `setup.qres.NoOpportunity('${this.template_key}')`;
  }

  override isOk(): boolean {
    let template = setup.opportunitytemplate[this.template_key];
    let opportunities = State.variables.opportunitylist.getOpportunities();
    for (let i = 0; i < opportunities.length; ++i)
      if (opportunities[i].getTemplate() == template) return false;
    return true;
  }

  override explain(): string {
    let template = setup.opportunitytemplate[this.template_key];
    return `No opportunity : ${template.getName()}`;
  }
}
