import type { QuestPool, QuestPoolKey } from "../../quest/QuestPool";
import type { DutyInstance } from "../DutyInstance";
import { DutyTemplate, type DutyTemplateInit } from "../DutyTemplate";

export class DutyTemplateQuestPoolDuty extends DutyTemplate {
  quest_pool_key: QuestPoolKey;
  quest_amount: number;

  constructor(
    args: DutyTemplateInit & {
      quest_pool: QuestPoolKey;
      quest_amount: number;
    },
  ) {
    super(args);

    this.quest_pool_key = args.quest_pool;
    this.quest_amount = args.quest_amount;
  }

  getQuestPool(): QuestPool {
    return setup.questpool[this.quest_pool_key];
  }

  getQuestAmount(): number {
    return this.quest_amount;
  }

  advanceWeek(duty_instance: DutyInstance) {
    super.advanceWeek(duty_instance);

    const questpool = this.getQuestPool();
    let amount = this.getQuestAmount();

    if (duty_instance.getProc() == "crit") {
      amount *= setup.SCOUTDUTY_CRIT_MULTIPLIER;
      amount = Math.round(amount);
    }

    let generated = 0;

    for (let i = 0; i < amount; ++i) {
      let proc = duty_instance.getProc();
      if (proc == "proc" || proc == "crit") {
        generated += 1;
        questpool.generateQuest();
      }
    }
    if (generated) {
      setup.notify(
        `${setup.capitalize(duty_instance.repYourDutyRep())} found ${generated} new quests from ${questpool.rep()}`,
      );
    }
  }
}
