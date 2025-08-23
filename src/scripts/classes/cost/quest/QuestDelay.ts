import type { QuestPool, QuestPoolKey } from "../../quest/QuestPool";

export default class QuestDelay extends Cost {
  questpool_key: QuestPoolKey;
  quantity: number;

  constructor(questpool: QuestPool | QuestPoolKey, quantity?: number) {
    super();

    this.questpool_key = resolveKey(questpool);

    // if quantity is not provided, then just one
    this.quantity = quantity ?? 1;
  }

  override text(): string {
    return `setup.qc.QuestDelay(setup.questpool.${this.questpool_key}, ${this.quantity})`;
  }

  override apply(context: CostContext) {
    let questpool = setup.questpool[this.questpool_key];
    State.variables.questgen.queue(questpool, this.quantity);
    setup.notify(
      `Obtained ${this.quantity} new quests or opportunities from ${questpool.getName()}`,
    );
  }

  override explain(): string {
    let questpool = setup.questpool[this.questpool_key];
    return `${this.quantity} new quests from ${questpool.getName()}`;
  }
}
