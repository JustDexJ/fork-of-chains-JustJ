import type { Company } from "../../../Company";
import type { TitleKey } from "../../../title/Title";
import type { DutyInstance } from "../../DutyInstance";
import { DutyTemplate } from "../../DutyTemplate";

export class DutyTemplateQuestLivingGod extends DutyTemplate {
  constructor() {
    super({
      key: "questlivinggod",
      name: "Living God",
      description_passage: "DutyQuestLivingGod",
      type: "util",
      unit_restrictions: [
        setup.qres.Job("slaver"),
        setup.qres.Trait("bg_mythical"),
        setup.qres.HasTitle("quest_living_god"),
      ],
      relevant_skills: {
        social: setup.DUTY_SKILL_MULTIPLIER_TOTAL / 3,
        intrigue: setup.DUTY_SKILL_MULTIPLIER_TOTAL / 3,
        aid: setup.DUTY_SKILL_MULTIPLIER_TOTAL / 3,
      },
      relevant_traits: {
        magic_light_master: setup.DUTY_TRAIT_CRIT_CHANCE,
        magic_light: setup.DUTY_TRAIT_NORMAL_CHANCE,
        magic_fire_master: setup.DUTY_TRAIT_CRIT_CHANCE,
        magic_fire: setup.DUTY_TRAIT_NORMAL_CHANCE,
        magic_dark_master: -setup.DUTY_TRAIT_CRIT_CHANCE,
        magic_dark: -setup.DUTY_TRAIT_NORMAL_CHANCE,
      },
    });
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
