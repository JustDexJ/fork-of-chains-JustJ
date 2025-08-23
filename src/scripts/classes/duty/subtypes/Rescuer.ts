import type { QuestPoolKey } from "../../quest/QuestPool";
import type { DutyInstance } from "../DutyInstance";
import { DutyTemplate, type DutyTemplateInit } from "../DutyTemplate";

export class DutyTemplateRescuer extends DutyTemplate {
  constructor(init: DutyTemplateInit) {
    super(init);
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
