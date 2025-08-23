import { TwineClass } from "../_TwineClass";
import type { Job } from "../job/Job";
import Job_ from "../restriction/unit/Job";
import type { SkillKey, SkillKeyword } from "../Skill";
import type { Trait, TraitKey } from "../trait/Trait";
import type { Unit } from "../unit/Unit";
import type { DutyInstance } from "./DutyInstance";
import type { DutyTemplateKey_ } from "./subtypes/_index";

export type DutyTemplateType = keyof (typeof DutyTemplate)["TYPE"];

export type DutyTemplateKey = DutyTemplateKey_; //BrandedType<string, "DutyTemplateKey">;

export interface DutyTemplateInit {
  key: string;
  type: DutyTemplateType;
  name: string;
  description_passage: string;
  unit_restrictions: Restriction[];
  relevant_traits?: { [k in TraitKey]?: number };
  relevant_skills?: { [k in SkillKey | SkillKeyword]?: number };
  is_can_replace_with_specialist?: boolean;
  is_allow_leader?: boolean;
}

/**
 * Base class for all duty templates
 */
export class DutyTemplate<
  T extends DutyInstance = DutyInstance,
> extends TwineClass {
  static TYPE = {
    util: "Utility",
    scout: "Scout",
    pimp: "Pimp",
    prestige: "Prestige",
    bedchamber: "Bedchamber",
  } as const;

  static HAS_TRIGGER_CHANCE = ["util", "scout", "pimp"];
  static HAS_PRESTIGE = ["prestige"];

  key: DutyTemplateKey;
  type: DutyTemplateType;
  name: string;
  description_passage: string;
  unit_restrictions: Restriction[];
  relevant_traits: { [k in TraitKey]?: number };
  relevant_skills: { [k in SkillKey | SkillKeyword]?: number };
  is_can_replace_with_specialist: boolean;

  /**
   * Create a new instance of a duty template
   */
  constructor({
    key,
    type,
    name,
    description_passage,
    unit_restrictions,
    relevant_traits,
    relevant_skills,
    is_can_replace_with_specialist,
    is_allow_leader,
  }: DutyTemplateInit) {
    super(); // dummy call, will do nothing (required by js)

    this.key = key as DutyTemplateKey;
    this.type = type;
    if (!(type in setup.DutyTemplate.TYPE))
      throw new Error(`Unrecognized duty type ${type}`);

    this.name = name;
    this.description_passage = description_passage;
    this.unit_restrictions = setup.deepCopy(unit_restrictions);
    if (!is_allow_leader) {
      this.unit_restrictions.push(setup.qres.NotYou());
    }
    this.is_can_replace_with_specialist = !!is_can_replace_with_specialist;

    // check traits actually exists
    if (relevant_traits) {
      for (let traitkey in relevant_traits) {
        if (!(traitkey in setup.trait))
          throw new Error(`Unknown trait ${traitkey} in DutyTemplate ${key}`);
      }
      this.relevant_traits = relevant_traits;
    } else {
      this.relevant_traits = {};
    }

    // check skills actually exists
    if (relevant_skills) {
      for (let skillkey in relevant_skills) {
        if (!(skillkey in setup.skill))
          throw new Error(`Unknown skill ${skillkey} in DutyTemplate ${key}`);
      }
      this.relevant_skills = relevant_skills;
    } else {
      this.relevant_skills = {};
    }
  }

  rep(): string {
    return this.getName();
  }

  isCanReplaceWithSpecialist(): boolean {
    return this.is_can_replace_with_specialist;
  }

  isHasTriggerChance(): boolean {
    return setup.DutyTemplate.HAS_TRIGGER_CHANCE.includes(this.getType());
  }

  isHasPrestigeAmount(): boolean {
    return setup.DutyTemplate.HAS_PRESTIGE.includes(this.getType());
  }

  getEligibleJobs(): Job[] {
    return this.getUnitRestrictions().flatMap((restriction) => {
      if (restriction instanceof Job_) {
        return [setup.job[restriction.job_key]];
      }
      return [];
    });
  }

  getCssClass(): string {
    const job_class = this.getEligibleJobs().includes(setup.job.slaver)
      ? "duty-image-slaver"
      : "duty-image-slave";
    return "duty-image " + job_class;
  }

  getImage(): string {
    return "img/duty/" + this.key + ".svg";
  }

  getRelevantTraits(): { [k in TraitKey]?: number } {
    return this.relevant_traits;
  }

  getRelevantTraitsGrouped(): { [chance: number]: Trait[] } {
    const groups: { [chance: number]: Trait[] } = {};
    const traits = this.getRelevantTraits();
    for (const [traitkey, chance] of objectEntries(traits)) {
      (groups[chance] ??= []).push(setup.trait[traitkey]);
    }
    return groups;
  }

  getRelevantSkills(): { [k in SkillKey | SkillKeyword]?: number } {
    return this.relevant_skills;
  }

  computeChanceForUnit(unit: Unit): number {
    let chance = 0;

    const skillmap = this.getRelevantSkills();
    for (const [skillkey, skillvalue] of objectEntries(skillmap)) {
      const skill = setup.skill[skillkey as unknown as SkillKey];
      const unitskill = unit.getSkill(skill);
      chance += unitskill * skillvalue!;
    }

    const traitmap = this.getRelevantTraits();
    for (const [traitkey, traitvalue] of objectEntries(traitmap)) {
      if (unit.isHasTraitExact(setup.trait[traitkey])) chance += traitvalue;
    }

    if (unit.isHasTrait("perk_duty")) {
      const bonus = Math.min(
        setup.PERK_DUTY_BONUS,
        chance * setup.PERK_DUTY_BONUS,
      );
      chance += bonus;
    }

    return chance;
  }

  getName(): string {
    return this.name;
  }

  getType(): DutyTemplateType {
    return this.type;
  }

  getDescriptionPassage(): string {
    return this.description_passage;
  }

  getUnitRestrictions(): Restriction[] {
    return this.unit_restrictions;
  }

  advanceWeek(duty_instance: T) {
    // give the unit exp from drill sergeant, if you have one.
    const active_unit = duty_instance.getUnitIfAvailable();
    if (active_unit && active_unit.isSlaver()) {
      const trainer = State.variables.dutylist.getDuty("trainer");
      if (trainer) {
        const proc = trainer.getProc();
        if (proc == "proc" || proc == "crit") {
          let multi = 0;
          if (proc == "crit") {
            multi = setup.TRAINER_CRIT_EXP_MULTI;
          } else {
            multi = 1.0;
          }
          if (multi)
            active_unit.gainExp(Math.round(multi * active_unit.getOnDutyExp()));
        }
      }
    }
  }

  /**
   * Called when unit is assigned to this duty
   */
  onAssign(duty_instance: T, unit: Unit) {}

  /**
   * Called when unit is unassigned from this duty
   */
  onUnassign(duty_instance: T, unit: Unit) {}

  static getTypeRep(type: DutyTemplateType): string {
    if (!(type in setup.DutyTemplate.TYPE))
      throw new Error(`Unknown duty type ${type}`);
    const tooltip = setup.DutyTemplate.TYPE[type];
    const image = `img/tag_duty/${type}.svg`;
    return setup.repImgIcon(image, tooltip);
  }

  // Initialized at "./_index.ts"
  static initializeSingletons = () => {};
}
