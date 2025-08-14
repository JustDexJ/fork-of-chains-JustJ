import type { QuestPool, QuestPoolKey } from "../../quest/QuestPool";
import type { DutyInstance } from "../DutyInstance";
import { DutyTemplate, type DutyTemplateInit } from "../DutyTemplate";

export abstract class DutyTemplateQuestPoolDuty extends DutyTemplate {
  quest_pool_key: QuestPoolKey;
  quest_amount: number;

  constructor(
    args: DutyTemplateInit & {
      quest_pool: QuestPool;
      quest_amount: number;
    },
  ) {
    super(args);

    this.quest_pool_key = args.quest_pool.key;
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

  static SUBCLASSES: ReturnType<typeof initSubclasses>;
}

function initSubclasses() {
  return {
    scoutvale: class DutyTemplateQuestPoolDuty_scoutvale extends DutyTemplateQuestPoolDuty {
      constructor() {
        super({
          key: "scoutvale",
          type: "scout",
          name: "Vale Scout",
          description_passage: "DutyScoutVale",
          unit_restrictions: [setup.qres.Job(setup.job.slaver)],
          relevant_skills: {
            brawn: setup.DUTY_SKILL_MULTIPLIER_TOTAL / 2,
            survival: setup.DUTY_SKILL_MULTIPLIER_TOTAL / 2,
          },
          relevant_traits: {
            skill_intimidating: setup.DUTY_TRAIT_CRIT_CHANCE,
            per_loner: setup.DUTY_TRAIT_NORMAL_CHANCE,
            per_gregarious: -setup.DUTY_TRAIT_NORMAL_CHANCE,
          },
          is_can_replace_with_specialist: true,
          quest_pool: setup.questpool["vale" as QuestPoolKey],
          quest_amount: 3,
        });
      }
    },

    scoutforest: class DutyTemplateQuestPoolDuty_scoutforest extends DutyTemplateQuestPoolDuty {
      constructor() {
        super({
          key: "scoutforest",
          type: "scout",
          name: "Forest Scout",
          description_passage: "DutyScoutForest",
          unit_restrictions: [setup.qres.Job(setup.job.slaver)],
          relevant_skills: {
            survival: setup.DUTY_SKILL_MULTIPLIER_TOTAL / 2,
            arcane: setup.DUTY_SKILL_MULTIPLIER_TOTAL / 2,
          },
          relevant_traits: {
            skill_animal: setup.DUTY_TRAIT_CRIT_CHANCE,
            tough_nimble: setup.DUTY_TRAIT_NORMAL_CHANCE,
            tough_tough: -setup.DUTY_TRAIT_NORMAL_CHANCE,
          },
          is_can_replace_with_specialist: true,
          quest_pool: setup.questpool["forest" as QuestPoolKey],
          quest_amount: 2,
        });
      }
    },

    scoutcity: class DutyTemplateQuestPoolDuty_scoutcity extends DutyTemplateQuestPoolDuty {
      constructor() {
        super({
          key: "scoutcity",
          type: "scout",
          name: "City Scout",
          description_passage: "DutyScoutCity",
          unit_restrictions: [setup.qres.Job(setup.job.slaver)],
          relevant_skills: {
            social: setup.DUTY_SKILL_MULTIPLIER_TOTAL / 2,
            sex: setup.DUTY_SKILL_MULTIPLIER_TOTAL / 2,
          },
          relevant_traits: {
            skill_hypnotic: setup.DUTY_TRAIT_CRIT_CHANCE,
            per_curious: setup.DUTY_TRAIT_NORMAL_CHANCE,
            per_stubborn: -setup.DUTY_TRAIT_NORMAL_CHANCE,
          },
          is_can_replace_with_specialist: true,
          quest_pool: setup.questpool["city" as QuestPoolKey],
          quest_amount: 2,
        });
      }
    },

    scoutdeep: class DutyTemplateQuestPoolDuty_scoutdeep extends DutyTemplateQuestPoolDuty {
      constructor() {
        super({
          key: "scoutdeep",
          type: "scout",
          name: "Deep Scout",
          description_passage: "DutyScoutDeep",
          unit_restrictions: [setup.qres.Job(setup.job.slaver)],
          relevant_skills: {
            combat: setup.DUTY_SKILL_MULTIPLIER_TOTAL / 2,
            social: setup.DUTY_SKILL_MULTIPLIER_TOTAL / 2,
          },
          relevant_traits: {
            magic_dark: setup.DUTY_TRAIT_NORMAL_CHANCE,
            magic_dark_master: setup.DUTY_TRAIT_CRIT_CHANCE,
            per_brave: setup.DUTY_TRAIT_NORMAL_CHANCE,
            per_cautious: -setup.DUTY_TRAIT_NORMAL_CHANCE,
          },
          is_can_replace_with_specialist: true,
          quest_pool: setup.questpool["deep" as QuestPoolKey],
          quest_amount: 2,
        });
      }
    },

    scoutdesert: class DutyTemplateQuestPoolDuty_scoutdesert extends DutyTemplateQuestPoolDuty {
      constructor() {
        super({
          key: "scoutdesert",
          type: "scout",
          name: "Desert Scout",
          description_passage: "DutyScoutDesert",
          unit_restrictions: [setup.qres.Job(setup.job.slaver)],
          relevant_skills: {
            combat: setup.DUTY_SKILL_MULTIPLIER_TOTAL / 2,
            brawn: setup.DUTY_SKILL_MULTIPLIER_TOTAL / 2,
          },
          relevant_traits: {
            skill_ambidextrous: setup.DUTY_TRAIT_CRIT_CHANCE,
            per_aggressive: setup.DUTY_TRAIT_NORMAL_CHANCE,
            per_calm: -setup.DUTY_TRAIT_NORMAL_CHANCE,
          },
          is_can_replace_with_specialist: true,
          quest_pool: setup.questpool["desert" as QuestPoolKey],
          quest_amount: 1,
        });
      }
    },

    scoutsea: class DutyTemplateQuestPoolDuty_scoutsea extends DutyTemplateQuestPoolDuty {
      constructor() {
        super({
          key: "scoutsea",
          type: "scout",
          name: "Sea Scout",
          description_passage: "DutyScoutSea",
          unit_restrictions: [setup.qres.Job(setup.job.slaver)],
          relevant_skills: {
            combat: setup.DUTY_SKILL_MULTIPLIER_TOTAL / 3,
            slaving: setup.DUTY_SKILL_MULTIPLIER_TOTAL / 3,
          },
          relevant_traits: {
            skill_flight: setup.DUTY_TRAIT_CRIT_CHANCE / 3,
            per_honorable: setup.DUTY_TRAIT_NORMAL_CHANCE / 3,
            per_evil: -setup.DUTY_TRAIT_NORMAL_CHANCE / 3,
          },
          is_can_replace_with_specialist: true,
          quest_pool: setup.questpool["sea" as QuestPoolKey],
          quest_amount: 1,
        });
      }
    },
  };
}

DutyTemplateQuestPoolDuty.SUBCLASSES = initSubclasses();
