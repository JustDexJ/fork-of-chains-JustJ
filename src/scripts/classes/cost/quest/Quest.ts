import type { QuestPool, QuestPoolKey } from "../../quest/QuestPool";

export default class Quest extends Cost {
  questpool_key: QuestPoolKey;
  quantity: number;

  constructor(questpool: QuestPool | QuestPoolKey, quantity: number) {
    super();

    this.questpool_key = resolveKey(questpool);

    // if quantity is not provided, then just one
    this.quantity = quantity ?? 1;
  }

  static NAME = "Gain a quest from a quest pool";
  static PASSAGE = "CostQuest";

  override text() {
    return `setup.qc.Quest(setup.questpool.${this.questpool_key}, ${this.quantity})`;
  }

  override apply(context: CostContext) {
    let questpool = setup.questpool[this.questpool_key];
    let generated = 0;
    for (let i = 0; i < this.quantity; ++i) {
      if (questpool.generateQuest()) {
        generated += 1;
      }
    }
    if (generated) {
      setup.notify(
        `Obtained ${generated} new quests or opportunities from ${questpool.getName()}`,
      );
    }
  }

  override explain() {
    let questpool = setup.questpool[this.questpool_key];
    return `${this.quantity} new quests from ${questpool.getName()} (immediately)`;
  }
}
