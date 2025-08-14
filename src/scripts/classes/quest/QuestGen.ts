// set to $questgen. Responsible for generating most quests.

import { TwineClass } from "../_TwineClass";
import type { QuestPool, QuestPoolKey } from "./QuestPool";

/**
 * When a quest is generated in qc.QuestDelay(), then it will only be generated here.
 */
export class QuestGen extends TwineClass {
  /** List of [quest_pool_key, number_of_quests] */
  to_generate: Array<[QuestPoolKey, number]> = [];

  constructor() {
    super();
  }

  queue(quest_pool: QuestPool, number_of_quests: number): void {
    this.to_generate.push([quest_pool.key, number_of_quests]);
  }

  generate(): void {
    for (let i = 0; i < this.to_generate.length; ++i) {
      let quest_pool = setup.questpool[this.to_generate[i][0]];
      let number = this.to_generate[i][1];
      for (let j = 0; j < number; ++j) {
        quest_pool.generateQuest();
      }
    }
    this.to_generate = [];
  }
}
