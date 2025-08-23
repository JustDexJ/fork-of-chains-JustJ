import { DutyTemplate } from "../DutyTemplate";

export class DutyTemplateMystic extends DutyTemplate {
  constructor() {
    super({
      key: "mystic",
      name: "Mystic",
      description_passage: "DutyMystic",
      type: "util",
      unit_restrictions: [setup.qres.Job("slaver")],
      relevant_skills: {
        arcane: setup.DUTY_SKILL_MULTIPLIER_TOTAL / 2,
        knowledge: setup.DUTY_SKILL_MULTIPLIER_TOTAL / 2,
      },
      relevant_traits: {
        skill_alchemy: setup.DUTY_TRAIT_CRIT_CHANCE,
        per_studious: setup.DUTY_TRAIT_NORMAL_CHANCE,
        per_active: -setup.DUTY_TRAIT_NORMAL_CHANCE,
      },
      is_can_replace_with_specialist: true,
    });
  }
}
