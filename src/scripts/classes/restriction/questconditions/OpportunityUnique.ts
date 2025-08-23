import type { ContentTemplate } from "../../content/ContentTemplate";

export default class OpportunityUnique extends Restriction.ContentTemplate {
  constructor() {
    super();
  }

  static NAME = "Unique opportunity (DO NOT USE THIS FOR QUESTS)";
  static PASSAGE = "RestrictionOpportunityUnique";

  override text(): string {
    return `setup.qres.OpportunityUnique()`;
  }

  override isOk(template: ContentTemplate): boolean {
    let opportunitys = State.variables.opportunitylist.getOpportunities();
    for (let i = 0; i < opportunitys.length; ++i) {
      if (opportunitys[i].getTemplate() == template) {
        return false;
      }
    }
    return true;
  }

  override explain(): string {
    return `unique`;
  }
}
