import type { DutyInstance } from "../DutyInstance";
import { DutyTemplate, type DutyTemplateInit } from "../DutyTemplate";

export class DutyTemplateLeader extends DutyTemplate {
  constructor(init: DutyTemplateInit) {
    super(init);
  }

  advanceWeek(duty_instance: DutyInstance) {
    super.advanceWeek(duty_instance);

    let proc = duty_instance.getProc();
    if (proc == "proc" || proc == "crit") {
      let price;
      if (proc == "crit") {
        price = setup.LEADER_MONEY_CRIT;
      } else {
        price = setup.LEADER_MONEY;
      }
      price = setup.nudgeMoney(price * setup.lowLevelMoneyMulti());

      setup.notify(`You work from your office, earning your company some coin`);
      State.variables.company.player.addMoney(price);
    }
  }
}
