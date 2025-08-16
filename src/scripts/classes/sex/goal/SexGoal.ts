import { TwineClassCustom } from "../../_TwineClass";
import type { TraitKey } from "../../trait/Trait";
import type { Unit } from "../../unit/Unit";
import type { SexPlanner } from "../ai/planner/SexPlanner";
import type { SexInstance } from "../engine/SexInstance";

/**
 * Determines how a unit chooses its next action for SexAI
 */
export abstract class SexGoal extends TwineClassCustom {
  constructor(
    public key: string,
    public tags: string[],
    public title: string,
    public description: string,
    public base_chance: number,
    public trait_preference: { [k in TraitKey | BuiltinTraitKey]?: number },
  ) {
    super();
  }

  abstract getPlanner(unit: Unit, sex: SexInstance): SexPlanner;

  getTags(): string[] {
    return this.tags;
  }

  getTitle(): string {
    return this.title;
  }

  getDescription(): string {
    return this.description;
  }

  override getContainer(): string {
    return `setup.SexGoalClass`;
  }

  computeScore(unit: Unit): number {
    const traits = unit.getTraits();
    let score = this.base_chance;
    for (const trait of traits) {
      score += this.trait_preference[trait.key] || 0;
    }
    return score;
  }

  /**
   * Get unit's goal.
   */
  static getStartingGoal(unit: Unit): SexGoal {
    const goal_chances = this.getGoalChances(unit);
    return setup.rng.sampleArray(goal_chances)!;
  }

  /**
   * @returns [[goal, chance], ...]
   */
  static getGoalChances(unit: Unit): ChanceArray<SexGoal> {
    // mindbroken unit's goal isn't used
    if (unit.isMindbroken()) return [[setup.sexgoal.resist, 1.0]];

    if (unit.isSlave()) {
      if (unit.isObedient() && unit.isDominantSlave()) {
        return [[setup.sexgoal.orgasmall, 1.0]];
      } else if (unit.isCompliant()) {
        return [[setup.sexgoal.orgasmthem, 1.0]];
      } else {
        return [[setup.sexgoal.resist, 1.0]];
      }
    }

    const goal_chances: ChanceArray<SexGoal> = [];
    let has_nonzero = false;
    for (const goal of setup.SexClasses.getAllGoals()) {
      const score = goal.computeScore(unit);
      if (score > 0) {
        has_nonzero = true;
        goal_chances.push([goal, score]);
      }
    }

    if (!has_nonzero) {
      return [[setup.sexgoal.orgasmall, 1.0]];
    }

    setup.rng.normalizeChanceArray(goal_chances);
    return goal_chances;
  }
}
