import type { QuestPoolKey } from "../../quest/QuestPool";
import type { DutyInstance } from "../DutyInstance";
import { DutyTemplate } from "../DutyTemplate";

export class DutyTemplateRescuer extends DutyTemplate {
  constructor() {
    super({
      key: "rescuer",
      name: "Rescuer",
      description_passage: "DutyRescuer",
      type: "util",
      unit_restrictions: [setup.qres.Job("slaver")],
      relevant_skills: {
        intrigue: setup.DUTY_SKILL_MULTIPLIER_TOTAL / 6,
        aid: setup.DUTY_SKILL_MULTIPLIER_TOTAL / 6,
      },
      relevant_traits: {
        skill_creative: setup.DUTY_TRAIT_CRIT_CHANCE / 3,
        per_aggressive: setup.DUTY_TRAIT_NORMAL_CHANCE / 3,
        per_calm: -setup.DUTY_TRAIT_NORMAL_CHANCE / 3,
      },
      is_can_replace_with_specialist: true,
    });
  }

  override advanceWeek(duty_instance: DutyInstance) {
    super.advanceWeek(duty_instance);

    let proc = duty_instance.getProc();
    if (proc == "proc" || proc == "crit") {
      let quest = setup.questpool["rescue" as QuestPoolKey].generateQuest();
      if (quest) {
        setup.notify(
          `${setup.capitalize(duty_instance.repYourDutyRep())} found ${quest.rep()} to rescue one of your lost slavers`,
        );
      }
    }
  }
}
