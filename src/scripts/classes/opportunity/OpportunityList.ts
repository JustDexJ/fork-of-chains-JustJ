import { TwineClass } from "../_TwineClass";
import type {
  OpportunityInstance,
  OpportunityInstanceKey,
} from "./OpportunityInstance";
import type {
  OpportunityTemplate,
  OpportunityTemplateKey,
} from "./OpportunityTemplate";

/**
 * Will be assigned to $opportunitylist
 */
export class OpportunityList extends TwineClass {
  opportunity_keys: OpportunityInstanceKey[] = [];

  // opportunity_key: option_index
  opportunity_autoanswer: { [k in OpportunityTemplateKey]?: number } = {};

  constructor() {
    super();
  }

  getAutoAnswer(template: OpportunityTemplate) {
    if (!(template.key in this.opportunity_autoanswer)) return null;
    return this.opportunity_autoanswer[template.key] ?? null;
  }

  setAutoAnswer(template: OpportunityTemplate, option_index: number) {
    this.opportunity_autoanswer[template.key] = option_index;
  }

  removeAutoAnswer(template: OpportunityTemplate) {
    if (!(template.key in this.opportunity_autoanswer))
      throw new Error(`${template.key} not found in autoanswer`);
    delete this.opportunity_autoanswer[template.key];
  }

  /**
   * @returns a list like: [[opp, index], [opp, index]]
   */
  getOpportunityAutoAnswers(): ChanceArray<OpportunityTemplate> {
    const result: ChanceArray<OpportunityTemplate> = [];
    for (const opp_key of objectKeys(this.opportunity_autoanswer)) {
      result.push([
        setup.opportunitytemplate[opp_key],
        this.opportunity_autoanswer[opp_key]!,
      ]);
    }
    return result;
  }

  getOpportunities(): OpportunityInstance[] {
    let result = [];
    for (let i = 0; i < this.opportunity_keys.length; ++i) {
      result.push(
        State.variables.opportunityinstance[this.opportunity_keys[i]],
      );
    }
    return result;
  }

  addOpportunity(opportunity: OpportunityInstance) {
    if (!opportunity)
      throw new Error(
        `Opportunity undefined adding opportunity to opportunitylist`,
      );
    if (this.opportunity_keys.includes(opportunity.key))
      throw new Error(
        `Opportunity ${opportunity.key} already in opportunitylist`,
      );
    this.opportunity_keys.unshift(opportunity.key);

    State.variables.statistics.add("opportunity_obtained", 1);
  }

  /** Don't use directly. use opportunity.expire() */
  removeOpportunity(opportunity: OpportunityInstance) {
    if (!opportunity)
      throw new Error(
        `Opportunity undefined removing opportunity to opportunitylist`,
      );
    if (!this.opportunity_keys.includes(opportunity.key))
      throw new Error(
        `Opportunity ${opportunity.key} not found in opportunitylist`,
      );
    this.opportunity_keys = this.opportunity_keys.filter(
      (opportunity_key) => opportunity_key != opportunity.key,
    );
    setup.queueDelete(opportunity, "opportunityinstance");
  }

  isHasOpportunity(template: OpportunityTemplate): boolean {
    let opportunitys = this.getOpportunities();
    for (let i = 0; i < opportunitys.length; ++i) {
      if (opportunitys[i].getTemplate() == template) return true;
    }
    return false;
  }

  advanceWeek() {
    let to_remove = [];
    let opportunitys = this.getOpportunities();
    for (let i = 0; i < opportunitys.length; ++i) {
      let opportunity = opportunitys[i];
      opportunity.advanceWeek();
      if (opportunity.isExpired()) {
        to_remove.push(opportunity);
      }
    }
    for (let i = 0; i < to_remove.length; ++i) {
      to_remove[i].expire();
    }
  }

  // attempts to auto answer current set of opportunities.
  autoAnswer() {
    if (!State.variables.dutylist.isViceLeaderAssigned()) {
      return; // only works if you have a vice-leader
    }
    let answered = 0;
    let opps = this.getOpportunities();
    for (let i = 0; i < opps.length; ++i) {
      let opp = opps[i];
      let to_select = this.getAutoAnswer(opp.getTemplate());
      if (to_select !== null && opp.isCanSelectOption(to_select)) {
        opp.selectOption(to_select);
        opp.finalize();
        answered += 1;
      }
    }
    if (answered) {
      setup.notify(
        `Your vice leader answered ${answered} mails on your behalf.`,
      );
    }
  }

  /**
   * Whether you have any mail that must be answered
   */
  isHaveMustAnswerOpportunities(): boolean {
    return (
      this.getOpportunities().filter((opportunity) =>
        opportunity.getTemplate().isMustBeAnswered(),
      ).length > 0
    );
  }
}
