import { Constants } from "../../../constants";
import type { DutyInstance } from "../DutyInstance";
import { DutyTemplate } from "../DutyTemplate";

export class DutyTemplateMarketer extends DutyTemplate {
  constructor() {
    super({
      key: "marketer",
      name: "Marketer",
      description_passage: "DutyMarketer",
      type: "util",
      unit_restrictions: [setup.qres.Job("slaver")],
      relevant_skills: {
        slaving: setup.DUTY_SKILL_MULTIPLIER_TOTAL / 2,
        social: setup.DUTY_SKILL_MULTIPLIER_TOTAL / 2,
      },
      relevant_traits: {
        skill_connected: setup.DUTY_TRAIT_CRIT_CHANCE,
        per_gregarious: setup.DUTY_TRAIT_NORMAL_CHANCE,
        per_loner: -setup.DUTY_TRAIT_NORMAL_CHANCE,
      },
      is_can_replace_with_specialist: true,
    });
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
