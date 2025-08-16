import type { QuestOutcome } from "../quest/QuestTemplate";

/**
 * Get all outcomes from another result, e.g., all outcomes from success.
 */
export default class Outcomes extends Cost {
  constructor(public result: QuestOutcome) {
    super();

    if (!setup.QUEST_OUTCOMES.includes(result)) {
      throw new Error(
        `Outcomes must be either crit, success, failure, or disaster, NOT ${result}`,
      );
    }
  }

  override text() {
    return `setup.qc.Outcomes("${this.result}")`;
  }

  override apply(quest: CostContext) {
    if (quest instanceof setup.QuestInstance) {
      const index = setup.QuestTemplate.resultIndex(this.result);

      // ignore experience, avoid doubling them.
      const costs = quest
        .getTemplate()
        .getOutcomes()
        [index][1].filter((cost) => !(cost instanceof setup.qcImpl.Exp));
      setup.RestrictionLib.applyAll(costs, quest);
    }
  }

  override explain() {
    return `Apply all outcomes from this quest on result: "${this.result}"`;
  }
}
