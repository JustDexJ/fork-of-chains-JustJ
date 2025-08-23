import { TwineClassCustom } from "../../_TwineClass";
import type { TraitKey } from "../../trait/Trait";
import type { Unit } from "../../unit/Unit";
import type { SexInstance } from "../engine/SexInstance";

/**
 * A unit's preferences for sex. Each unit will have one.
 */
export class SexPace extends TwineClassCustom {
  constructor(
    public key: string,
    public tags: string[],
    public title: string,
    public description: string,
    public base_chance: number,
    public trait_preference: { [k in TraitKey]?: number },
  ) {
    super();
  }

  override getContainer(): string {
    return `setup.SexPaceClass`;
  }

  getTags(): string[] {
    return this.tags;
  }

  getTitle(): string {
    return this.title;
  }

  rep(): string {
    return this.getTitle();
  }

  getDescription(): string {
    return this.description;
  }

  isMindbroken(): boolean {
    return this.key == "MINDBROKEN";
  }

  computeScore(unit: Unit): number {
    const traits = unit.getTraits();
    let score = this.base_chance;
    for (const trait of traits) {
      score += this.trait_preference[trait.key] || 0;
    }
    return score;
  }

  /* =========================
      TEXT
  ========================= */

  rawRepStart(unit: Unit, sex: SexInstance): string | string[] {
    return ``;
  }

  repStart(unit: Unit, sex: SexInstance): string {
    return setup.SexUtil.convert(this.rawRepStart(unit, sex), { a: unit }, sex);
  }

  /**
   * Get a random adverb suitable for this pace. E.g., gently, violently, etc.
   */
  repAdverb(unit: Unit, sex: SexInstance): string {
    return ``;
  }

  /* =========================
      STATIC
  ========================= */

  /**
   * Get unit's default pace.
   */
  static getStartingPace(unit: Unit): SexPace {
    const pace_chances = this.getPaceChances(unit);
    return setup.rng.sampleArray(pace_chances)!;
  }

  /**
   * Returns pace chances of this unit
   * @return [[pace, chance], ...]
   */
  static getPaceChances(unit: Unit): ChanceArray<SexPace> {
    if (unit.isMindbroken()) return [[setup.sexpace.mindbroken, 1.0]];

    if (unit.isSlave()) {
      if (unit.isObedient() || (unit.isCompliant() && unit.isSubmissive())) {
        return [[setup.sexpace.sub, 1.0]];
      } else if (unit.isCompliant()) {
        return [[setup.sexpace.forced, 1.0]];
      } else {
        return [[setup.sexpace.resist, 1.0]];
      }
    }

    const pace_chances: ChanceArray<SexPace> = [];
    let has_nonzero = false;
    for (const pace of setup.SexClasses.getAllPaces()) {
      const score = pace.computeScore(unit);
      if (score > 0) {
        has_nonzero = true;
        pace_chances.push([pace, score]);
      }
    }

    if (!has_nonzero) {
      return [[setup.sexpace.normal, 1.0]];
    }
    setup.rng.normalizeChanceArray(pace_chances)!;
    return pace_chances;
  }
}
