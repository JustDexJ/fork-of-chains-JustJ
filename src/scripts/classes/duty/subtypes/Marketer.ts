import { Constants } from "../../../constants";
import type { DutyInstance } from "../DutyInstance";
import { DutyTemplate, type DutyTemplateInit } from "../DutyTemplate";

export class DutyTemplateMarketer extends DutyTemplate {
  constructor(init: DutyTemplateInit) {
    super(init);
  }

  override advanceWeek(duty_instance: DutyInstance) {
    super.advanceWeek(duty_instance);

    let proc = duty_instance.getProc();
    if (proc == "proc" || proc == "crit") {
      const unit = duty_instance.getAssignedUnit()!;
      const difficulty_key = `normal${unit.getLevel()}` as QuestDifficultyKey;
      let price = Math.round(
        setup.qdiff[difficulty_key].getMoney() +
          Constants.MONEY_PER_SLAVER_WEEK,
      );

      if (proc == "crit") {
        setup.notify(
          `${setup.capitalize(duty_instance.repYourDutyRep())} is working extraordinarily well this week`,
        );
        price *= Constants.MARKETER_CRIT_MULTIPLIER;
      }

      new setup.SlaveOrder(
        "Fixed-price Slave Order",
        "independent",
        setup.qu.slave,
        price,
        /* trait multi = */ 0,
        /* value multi = */ 0,
        setup.MARKETER_ORDER_EXPIRATION,
        /* fulfill outcomes = */ [],
        /* fail outcomes = */ [],
        setup.unitgroup.soldslaves,
      );
      setup.notify(
        `${setup.capitalize(duty_instance.repYourDutyRep())} found a new slave order`,
      );
    }
  }
}
