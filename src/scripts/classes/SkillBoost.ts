import { TwineClass } from "./_TwineClass";
import type { Skill, SkillValuesArray } from "./Skill";
import type { UnitKey } from "./unit/Unit";

/**
 * Extra permanent skill boost that units can get. Soft-capped.
 * Stores at $skillboost
 */
export class SkillBoost extends TwineClass {
  unit_key_to_skill_boosts: Record<UnitKey, SkillValuesArray> = {};

  constructor() {
    super();
  }

  /**
   * Deletes unit completely from the records
   */
  deleteUnit(unit: Unit) {
    delete this.unit_key_to_skill_boosts[unit.key];
  }

  _getUnitBoosts(unit: Unit): SkillValuesArray | null {
    if (!(unit.key in this.unit_key_to_skill_boosts)) {
      return null;
    }
    return this.unit_key_to_skill_boosts[unit.key];
  }

  isHasBoost(unit: Unit, skill: Skill): boolean {
    const raw_boosts = this._getUnitBoosts(unit);
    return !!raw_boosts && !!raw_boosts[skill.key];
  }

  isHasAnyBoost(unit: Unit): boolean {
    return !!this._getUnitBoosts(unit);
  }

  getBoost(unit: Unit, skill: Skill): number {
    const raw_boosts = this._getUnitBoosts(unit);
    if (raw_boosts) {
      return raw_boosts[skill.key];
    } else {
      return 0;
    }
  }

  getBoosts(unit: Unit): SkillValuesArray {
    const raw_boosts = this._getUnitBoosts(unit);
    if (raw_boosts) {
      return raw_boosts;
    }
    return Array(setup.skill.length).fill(0);
  }

  _adjustBoost(unit: Unit, skill: Skill, amount: number) {
    if (!(unit.key in this.unit_key_to_skill_boosts)) {
      this.unit_key_to_skill_boosts[unit.key] = Array(setup.skill.length).fill(
        0,
      );
    }

    this.unit_key_to_skill_boosts[unit.key][skill.key] += amount;
    unit.resetCache();
  }

  /**
   * Return the decayed skills, if any
   */
  _decaySkills(unit: Unit): Skill[] {
    const decayed: Skill[] = [];
    for (const skill of setup.skill) {
      const unit_skill = this.getBoost(unit, skill);
      const chance = unit_skill * setup.SKILL_BOOST_DECAY_RATE;
      if (Math.random() < chance) {
        // decay it
        this._adjustBoost(unit, skill, -1);
        decayed.push(skill);
      }
    }
    return decayed;
  }

  addBoost(unit: Unit, skill: Skill) {
    // first decay existing boosts
    const decayed = this._decaySkills(unit);

    if (unit.isYourCompany() && decayed.length) {
      setup.notify(
        `Due to having too many boosts, some of ${unit.isYou() ? "your" : `${unit.rep()}'s`}
         skill boosts have decayed: ${decayed.map((skill) => skill.rep())}
         <<include 'SkillBoostHelpText'>>
        `,
        { a: unit },
      );
    }

    // then boost it
    this._adjustBoost(unit, skill, 1);
    if (unit.isYourCompany()) {
      setup.notify(
        `a|Reps ${skill.rep()} has been permanently boosted
         <<include 'SkillBoostHelpText'>>
         by 1`,
        { a: unit },
      );
    }
  }
}
