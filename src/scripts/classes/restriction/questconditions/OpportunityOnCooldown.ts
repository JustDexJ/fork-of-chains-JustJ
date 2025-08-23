import type {
  OpportunityTemplate,
  OpportunityTemplateKey,
} from "../../opportunity/OpportunityTemplate";

export default class OpportunityOnCooldown extends Restriction {
  template_key: OpportunityTemplateKey;

  constructor(template: OpportunityTemplate | OpportunityTemplateKey) {
    super();

    if (!template)
      throw new Error(`Missing template for OpportunityOnCooldown`);
    this.template_key = resolveKey(template);
  }

  override text(): string {
    return `setup.qres.OpportunityOnCooldown('${this.template_key}')`;
  }

  override isOk(): boolean {
    let template = setup.opportunitytemplate[this.template_key];
    return State.variables.calendar.isOnCooldown(template);
  }

  override explain(): string {
    let template = setup.opportunitytemplate[this.template_key];
    return `Opportunity on cooldown: ${template.getName()}`;
  }
}
