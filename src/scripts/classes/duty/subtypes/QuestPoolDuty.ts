import { Constants } from "../../../constants";
import type { QuestPool, QuestPoolKey } from "../../quest/QuestPool";
import type { DutyInstance } from "../DutyInstance";
import { DutyTemplate, type DutyTemplateInit } from "../DutyTemplate";

export abstract class DutyTemplateQuestPoolDuty extends DutyTemplate {
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
          unit_restrictions: [setup.qres.Job("slaver")],
          relevant_skills: {
            brawn: Constants.DUTY_SKILL_MULTIPLIER_TOTAL / 2,
            survival: Constants.DUTY_SKILL_MULTIPLIER_TOTAL / 2,
          },
          relevant_traits: {
            skill_intimidating: Constants.DUTY_TRAIT_CRIT_CHANCE,
            per_loner: Constants.DUTY_TRAIT_NORMAL_CHANCE,
            per_gregarious: -Constants.DUTY_TRAIT_NORMAL_CHANCE,
          },
          is_can_replace_with_specialist: true,
          quest_pool: "vale",
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
          unit_restrictions: [setup.qres.Job("slaver")],
          relevant_skills: {
            survival: Constants.DUTY_SKILL_MULTIPLIER_TOTAL / 2,
            arcane: Constants.DUTY_SKILL_MULTIPLIER_TOTAL / 2,
          },
          relevant_traits: {
            skill_animal: Constants.DUTY_TRAIT_CRIT_CHANCE,
            tough_nimble: Constants.DUTY_TRAIT_NORMAL_CHANCE,
            tough_tough: -Constants.DUTY_TRAIT_NORMAL_CHANCE,
          },
          is_can_replace_with_specialist: true,
          quest_pool: "forest",
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
          unit_restrictions: [setup.qres.Job("slaver")],
          relevant_skills: {
            social: Constants.DUTY_SKILL_MULTIPLIER_TOTAL / 2,
            sex: Constants.DUTY_SKILL_MULTIPLIER_TOTAL / 2,
          },
          relevant_traits: {
            skill_hypnotic: Constants.DUTY_TRAIT_CRIT_CHANCE,
            per_curious: Constants.DUTY_TRAIT_NORMAL_CHANCE,
            per_stubborn: -Constants.DUTY_TRAIT_NORMAL_CHANCE,
          },
          is_can_replace_with_specialist: true,
          quest_pool: "city",
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
          unit_restrictions: [setup.qres.Job("slaver")],
          relevant_skills: {
            combat: Constants.DUTY_SKILL_MULTIPLIER_TOTAL / 2,
            social: Constants.DUTY_SKILL_MULTIPLIER_TOTAL / 2,
          },
          relevant_traits: {
            magic_dark: Constants.DUTY_TRAIT_NORMAL_CHANCE,
            magic_dark_master: Constants.DUTY_TRAIT_CRIT_CHANCE,
            per_brave: Constants.DUTY_TRAIT_NORMAL_CHANCE,
            per_cautious: -Constants.DUTY_TRAIT_NORMAL_CHANCE,
          },
          is_can_replace_with_specialist: true,
          quest_pool: "deep",
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
          unit_restrictions: [setup.qres.Job("slaver")],
          relevant_skills: {
            combat: Constants.DUTY_SKILL_MULTIPLIER_TOTAL / 2,
            brawn: Constants.DUTY_SKILL_MULTIPLIER_TOTAL / 2,
          },
          relevant_traits: {
            skill_ambidextrous: Constants.DUTY_TRAIT_CRIT_CHANCE,
            per_aggressive: Constants.DUTY_TRAIT_NORMAL_CHANCE,
            per_calm: -Constants.DUTY_TRAIT_NORMAL_CHANCE,
          },
          is_can_replace_with_specialist: true,
          quest_pool: "desert",
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
          unit_restrictions: [setup.qres.Job("slaver")],
          relevant_skills: {
            combat: Constants.DUTY_SKILL_MULTIPLIER_TOTAL / 3,
            slaving: Constants.DUTY_SKILL_MULTIPLIER_TOTAL / 3,
          },
          relevant_traits: {
            skill_flight: Constants.DUTY_TRAIT_CRIT_CHANCE / 3,
            per_honorable: Constants.DUTY_TRAIT_NORMAL_CHANCE / 3,
            per_evil: -Constants.DUTY_TRAIT_NORMAL_CHANCE / 3,
          },
          is_can_replace_with_specialist: true,
          quest_pool: "sea",
          quest_amount: 1,
        });
      }
    },
  };
}

DutyTemplateQuestPoolDuty.SUBCLASSES = initSubclasses();
