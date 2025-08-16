import type { DutyInstance } from "../DutyInstance";
import {
  DutyTemplate,
  type DutyTemplateInit,
  type DutyTemplateKey,
} from "../DutyTemplate";
import { DutyInstancePrestigeSlave } from "./PrestigeSlave";

export abstract class DutyTemplatePimp extends DutyTemplate {
  managed_duty_template_keys: DutyTemplateKey[];

  constructor({
    key,
    name,
    relevant_skills,
    relevant_traits,
    managed_duties,
  }: {
    key: string;
    name: string;
    relevant_skills: DutyTemplateInit["relevant_skills"];
    relevant_traits: DutyTemplateInit["relevant_traits"];
    managed_duties: DutyTemplateKey[];
  }) {
    super({
      key: key,
      name: name,
      description_passage: `Duty${key}_DescriptionPassage`,
      type: "pimp",
      unit_restrictions: [setup.qres.Job(setup.job.slaver)],
      relevant_skills: relevant_skills,
      relevant_traits: relevant_traits,
      is_can_replace_with_specialist: true,
    });
    this.managed_duty_template_keys = managed_duties;
  }

  getManagedDutyTemplates(): DutyTemplate[] {
    return this.managed_duty_template_keys.map(
      (key) => setup.dutytemplate[key],
    );
  }

  override advanceWeek(duty_instance: DutyInstance) {
    super.advanceWeek(duty_instance);

    const proc = duty_instance.getProc();
    if (proc == "proc" || proc == "crit") {
      // compute money
      const prestiges = [];
      for (const duty_template of this.getManagedDutyTemplates()) {
        const duty = State.variables.dutylist.getDuty(duty_template);
        if (duty instanceof DutyInstancePrestigeSlave) {
          const prestige = duty.getCurrentPrestige();
          if (prestige) {
            prestiges.push(prestige);
          }
        }
      }

      prestiges.sort();
      prestiges.reverse();

      let prestige_sum = 0;
      const total = prestiges.length;
      const gained = Math.min(total, setup.PIMP_SLAVE_LIMIT);
      for (let i = 0; i < gained; ++i) {
        prestige_sum += prestiges[i];
      }

      let money = prestige_sum * setup.PIMP_PRESTIGE_MULTIPLIER;
      if (proc == "crit") {
        money *= setup.PIMP_CRIT_MULTIPLIER;
      }

      money = setup.nudgeMoney(money);

      if (money) {
        let text = `${setup.capitalize(duty_instance.repYourDutyRep())} made you <<money ${Math.round(money)}>> this week from ${gained} slave${gained > 1 ? "s" : ""}`;
        if (proc == "crit") text += `, thanks to a particularly busy week`;

        if (gained < total) {
          text += `. ${total - gained} slave${total - gained > 1 ? "s were" : " was"} left unmanaged`;
        }

        setup.notify(text);
        State.variables.company.player.addMoney(Math.round(money));
      } else if (!gained) {
        let text = `${setup.capitalize(duty_instance.repYourDutyRep())} does not currently have any slaves to manage and made zero profit this week`;
        setup.notify(text);
      }
    }
  }

  static SUBCLASSES = {
    entertainmentpimp: class DutyTemplateEntertainmentPimp extends DutyTemplatePimp {
      constructor() {
        super({
          key: "entertainmentpimp",
          name: "Entertainment Pimp",
          relevant_traits: {
            skill_entertain: setup.DUTY_TRAIT_CRIT_CHANCE,
            per_gregarious: setup.DUTY_TRAIT_NORMAL_CHANCE,
            per_loner: -setup.DUTY_TRAIT_NORMAL_CHANCE,
          },
          relevant_skills: {
            slaving: setup.DUTY_SKILL_MULTIPLIER_TOTAL / 2,
            social: setup.DUTY_SKILL_MULTIPLIER_TOTAL / 2,
          },
          managed_duties: [
            "entertainmentslave",
            "dogslave",
            "ponyslave",
            "decorationslave",
            "punchingbagslave",
            "toiletslave",
          ],
        });
      }
    },

    servicepimp: class DutyTemplateServicePimp extends DutyTemplatePimp {
      constructor() {
        super({
          key: "servicepimp",
          name: "Service Pimp",
          relevant_traits: {
            skill_alchemy: setup.DUTY_TRAIT_CRIT_CHANCE,
            per_lavish: setup.DUTY_TRAIT_NORMAL_CHANCE,
            per_frugal: -setup.DUTY_TRAIT_NORMAL_CHANCE,
          },
          relevant_skills: {
            slaving: setup.DUTY_SKILL_MULTIPLIER_TOTAL / 2,
            aid: setup.DUTY_SKILL_MULTIPLIER_TOTAL / 2,
          },
          managed_duties: [
            "milkcowslave",
            "cumcowslave",
            "maidslave",
            "theatreslave",
            "furnitureslave",
          ],
        });
      }
    },

    sexpimp: class DutyTemplateSexPimp extends DutyTemplatePimp {
      constructor() {
        super({
          key: "sexpimp",
          name: "Sex Pimp",
          relevant_traits: {
            magic_earth: setup.DUTY_TRAIT_NORMAL_CHANCE,
            magic_earth_master: setup.DUTY_TRAIT_CRIT_CHANCE,
            per_dominant: setup.DUTY_TRAIT_NORMAL_CHANCE,
            per_submissive: -setup.DUTY_TRAIT_NORMAL_CHANCE,
          },
          relevant_skills: {
            slaving: setup.DUTY_SKILL_MULTIPLIER_TOTAL / 2,
            sex: setup.DUTY_SKILL_MULTIPLIER_TOTAL / 2,
          },
          managed_duties: [
            "sissyslave",
            "dominatrixslave",
            "analfuckholeslave",
            "oralfuckholeslave",
            "vaginafuckholeslave",
          ],
        });
      }
    },
  };
}
