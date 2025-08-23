import type { Company } from "../../../Company";
import type { TitleKey } from "../../../title/Title";
import type { DutyInstance } from "../../DutyInstance";
import { DutyTemplate, type DutyTemplateInit } from "../../DutyTemplate";

export class DutyTemplateQuestLivingGod extends DutyTemplate {
  constructor(init: DutyTemplateInit) {
    super(init);
  }

  isFavor(): boolean {
    return !!State.variables.varstore.get("quest_living_god_isfavor");
  }

  getLivingGod(): Unit | null {
    return setup.getUnit({ title: "quest_living_god" as TitleKey });
  }

  getFavorCompany(): Company | null {
    const unit = this.getLivingGod();
    if (unit) {
      return unit.getHomeCompany();
    } else {
      return null;
    }
  }

  favor() {
    return setup.Favor.fromMoney(this.profit());
  }

  favorCrit() {
    return setup.Favor.fromMoney(this.profitCrit());
  }

  profit() {
    return 500;
  }

  profitCrit() {
    return 750;
  }

  override advanceWeek(duty_instance: DutyInstance) {
    super.advanceWeek(duty_instance);

    let proc = duty_instance.getProc();
    if (proc == "proc" || proc == "crit") {
      if (this.isFavor()) {
        let favor = 0;
        if (proc == "proc") {
          favor = this.favor();
        } else {
          favor = this.favorCrit();
        }
        const company = this.getFavorCompany()!;
        setup.notify(
          `${setup.capitalize(duty_instance.repYourDutyRep())} spreads some wisdom for a|their worshippers, as well as good words about your company`,
          { a: duty_instance.getAssignedUnit()! },
        );
        setup.qc.Favor(company, favor).apply();
      } else {
        let profit = 0;
        if (proc == "proc") {
          profit = this.profit();
        } else {
          profit = this.profitCrit();
        }
        setup.notify(
          `${setup.capitalize(duty_instance.repYourDutyRep())} collects some tithe from a|their worshippers`,
          { a: duty_instance.getAssignedUnit()! },
        );
        setup.qc.Money(setup.nudgeMoney(profit)).apply();
      }
    }
  }
}
