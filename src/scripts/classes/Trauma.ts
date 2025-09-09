import { TwineClass } from "./_TwineClass";
import type { DutyTemplateKey } from "./duty/DutyTemplate";
import type { Skill } from "./Skill";
import type { Trait, TraitKey } from "./trait/Trait";
import type { Unit, UnitKey } from "./unit/Unit";

// special. Will be assigned to State.variables.trauma
export class Trauma extends TwineClass {
  /**
   * Example: `{'unitkey': { 'trauma_trait_key': 3}}` unit is traumatized with trauma key for 3 more weeks.
   */
  unit_traumas: {
    [unitkey: UnitKey]: {
      [traitkey in TraitKey]?: number;
    };
  } = {};

  constructor() {
    super();
  }

  deleteUnit(unit: Unit) {
    let unitkey = unit.key;
    if (!(unitkey in this.unit_traumas)) return; // nothing to do when unit is not traumatized
    delete this.unit_traumas[unitkey];
  }

  /**
   * Adjust a unit trauma.
   * If duration is negative will be substracted.
   * If positive will be added.
   */
  adjustTrauma(unit: Unit, trait: Trait, duration: number) {
    if (!trait.getTags().includes("temporary"))
      throw new Error(
        `Can only adjust temporary traits, ${trait.key} not a temporary trait`,
      );

    if (duration > 0 && trait.isHasTag("trauma")) {
      // if unit has curse of madness, use it
      let added = 0;
      while (
        added + setup.CURSE_TRAUMA_WEEKS <=
          (setup.CURSE_TRAUMA_MULTIPLIER - 1) * duration &&
        unit.isHasTrait(setup.trait.curse_madness1)
      ) {
        added += setup.CURSE_TRAUMA_WEEKS;
        unit.decreaseTrait(setup.trait.curse_madness1.getTraitGroup()!);
      }
      duration += added;
      if (added && unit.isYourCompany()) {
        setup.notify(
          `a|Reps Curse of Madness adds ${added} extra weeks of trauma`,
          { a: unit },
        );
      }

      // if unit has blessing of sanity, use it
      let prevented = 0;
      while (duration > 0 && unit.isHasTrait(setup.trait.blessing_sanity1)) {
        let new_prevention = Math.min(duration, setup.BLESSING_TRAUMA_WEEKS);
        prevented += new_prevention;
        duration -= new_prevention;
        unit.decreaseTrait(setup.trait.blessing_sanity1.getTraitGroup()!);
      }

      if (prevented && unit.isYourCompany()) {
        setup.notify(
          `a|Reps Blessing of Sanity prevents ${prevented} weeks of trauma`,
          { a: unit },
        );
      }
    }

    if (!duration) return;

    if (unit.isSlaver()) {
      if (duration > 0) {
        if (trait.getTags().includes("trauma")) {
          State.variables.statistics.add("trauma_count", 1);
          State.variables.statistics.add("trauma_week_sum", duration);
        } else if (trait.getTags().includes("boon")) {
          State.variables.statistics.add("boon_count", 1);
          State.variables.statistics.add("boon_week_sum", duration);
        }
      }
    }

    let unitkey = unit.key;

    let traumas = (this.unit_traumas[unitkey] ??= {});

    let traitkey = trait.key;
    if (!(traitkey in traumas)) {
      if (duration > 0 && unit.isYourCompany()) {
        setup.notify.traitGainedTemporarily(unit, trait);
      }
    }

    const new_duration = (traumas[traitkey] ?? 0) + duration;
    traumas[traitkey] = new_duration;

    if (unit.isSlaver()) {
      if (trait.getTags().includes("trauma")) {
        State.variables.statistics.setMax("trauma_week_max", new_duration);
      } else if (trait.getTags().includes("boon")) {
        State.variables.statistics.setMax("boon_week_max", new_duration);
      }
    }

    if (new_duration <= 0) {
      if (unit.isYourCompany()) {
        setup.notify.traitLost(unit, trait);
      }
      delete traumas[traitkey];
    }

    unit.resetCache();
  }

  /**
   * Return a random skill, weighted by unit's base skills.
   */
  _unitSkillSampleWeighted(unit: Unit): Skill {
    const skills = unit.getSkills(/* is base only = */ true);

    const weighted: ChanceArray<Skill> = [];
    for (let i = 0; i < skills.length; ++i) {
      weighted.push([setup.skill[i], skills[i]]);
    }
    return setup.rng.sampleArray(weighted, /* normalize = */ true)!;
  }

  /**
   * Randomly traumatize unit
   */
  traumatize(unit: Unit, duration: number) {
    let sampled = this._unitSkillSampleWeighted(unit);
    let traitkey = `trauma_${sampled.keyword}` as TraitKey;
    let trait = setup.trait[traitkey];
    this.adjustTrauma(unit, trait, duration);
  }

  /**
   * Randomly give unit a boon
   */
  boonize(unit: Unit, duration: number) {
    let sampled = this._unitSkillSampleWeighted(unit);
    let traitkey = `boon_${sampled.keyword}` as TraitKey;
    let trait = setup.trait[traitkey];

    // amplify duration with mythic
    if (unit.isYourCompany() && duration >= 1) {
      const mystic = State.variables.dutylist.getDuty(
        setup.dutytemplate["mystic" as DutyTemplateKey],
      );
      if (mystic) {
        const proc = mystic.getProc();
        if (proc == "proc" || proc == "crit") {
          let amplify_factor = setup.MYSTIC_BOON_MULTI;
          let limit = setup.MYSTIC_MAX_BOON;
          if (proc == "crit") {
            amplify_factor = setup.MYSTIC_BOON_MULTI_CRIT;
            limit = setup.MYSTIC_MAX_BOON_CRIT;
          }

          const amplification = Math.min(
            Math.round(duration * amplify_factor),
            limit,
          );

          if (amplification) {
            setup.notify(
              `${setup.capitalize(mystic.repYourDutyRep())} adds ${amplification} extra weeks of boon`,
            );
            duration += amplification;
          }
        }
      }
    }

    this.adjustTrauma(unit, trait, duration);
  }

  /**
   * Randomly heal weeks amount of traumas from the unit
   */
  healTrauma(unit: Unit, weeks: number) {
    for (let i = 0; i < weeks; ++i) {
      let traits = this.getTraits(unit);
      let traumas = traits.filter((a) => a.getTags().includes("trauma"));
      if (!traumas.length) return; // nothing to cure
      let tocure = setup.rng.choice(traumas);
      this.adjustTrauma(unit, tocure, -1);
    }
  }

  advanceWeek() {
    for (const [unitkey_, values] of objectEntries(this.unit_traumas)) {
      const unitkey = unitkey_ as UnitKey;
      let unit = State.variables.unit[unitkey];
      let traitkeys = objectKeys(this.unit_traumas[unitkey]) as TraitKey[];
      for (let i = 0; i < traitkeys.length; ++i) {
        this.adjustTrauma(unit, setup.trait[traitkeys[i]], /* duration = */ -1);
      }
    }
  }

  getTraitsWithDurations(unit: Unit): Array<[trait: Trait, duration: number]> {
    let unitkey = unit.key;
    if (!(unitkey in this.unit_traumas)) return [];
    let result: Array<[trait: Trait, duration: number]> = [];
    for (let [traitkey, duration] of objectEntries(this.unit_traumas[unitkey]))
      result.push([setup.trait[traitkey], duration]);
    return result;
  }

  getTraits(unit: Unit): Trait[] {
    let unitkey = unit.key;
    if (!(unitkey in this.unit_traumas)) return [];
    let result: Trait[] = [];
    for (const traitkey of objectKeys(this.unit_traumas[unitkey]))
      result.push(setup.trait[traitkey]);
    return result;
  }

  /**
   * Gets a multiplier for trauma duration from relationship change, e.g, losing unit, breakup
   */
  static _getRelationshipTraumaAdjustmentRaw(unit: Unit): number {
    let adjustment = 0.0;
    for (const trait_key of objectKeys(setup.TRAUMA_TRAIT_ADJUST)) {
      if (unit.isHasTraitExact(trait_key)) {
        adjustment += setup.TRAUMA_TRAIT_ADJUST[trait_key];
      }
    }
    return adjustment;
  }

  /**
   * Gets a multiplier for trauma duration from relationship change, e.g, losing unit, breakup
   */
  static getRelationshipTraumaAdjustment(unit: Unit): number {
    let adjustment =
      1.0 + setup.Trauma._getRelationshipTraumaAdjustmentRaw(unit);
    adjustment = Math.max(adjustment, 0.0);
    return adjustment;
  }

  /**
   * Gets a multiplier for relationship damage from break up
   */
  static getBreakupAdjustment(unit1: Unit, unit2: Unit): number {
    const adjustment1 = setup.Trauma._getRelationshipTraumaAdjustmentRaw(unit1);
    const adjustment2 = setup.Trauma._getRelationshipTraumaAdjustmentRaw(unit2);
    let adjustment = 1.0 - adjustment1 - adjustment2;
    adjustment = Math.max(adjustment, 0.0);
    return adjustment;
  }
}
