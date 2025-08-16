import { TwineClass } from "../_TwineClass";
import Job from "../restriction/unit/Job";

export type LivingKey = BrandedType<string | number, "LivingKey">;

/**
 * What a slaver do after they retire
 */
export class Living extends TwineClass {
  key: LivingKey;
  name: string;
  tags: string[];
  unit_restrictions: Restriction<Unit>[];
  default_preference: number;
  trait_preferences: ChanceObject<TraitKey>;
  business: string[];
  location: string;

  constructor({
    key,
    name,
    tags,
    unit_restrictions,
    default_preference,
    trait_preferences,
    business,
    location,
  }: {
    key: string;
    name: string;
    tags: string[];
    unit_restrictions: Restriction<Unit>[];
    default_preference: number;
    trait_preferences: ChanceObject<TraitKey>;
    business: string[];
    location: string;
  }) {
    super();

    if (!key) throw new Error(`null key for living`);
    this.key = key as LivingKey;

    if (!name) throw new Error(`null name for living ${key}`);
    this.name = name;

    if (!Array.isArray(tags))
      throw new Error(`tags must be array for living ${key}`);
    this.tags = tags;

    if (!Array.isArray(unit_restrictions))
      throw new Error(`unit restrictions must be array for living ${key}`);
    this.unit_restrictions = unit_restrictions;

    this.default_preference = default_preference;

    this.trait_preferences = trait_preferences;
    for (const trait_key of objectKeys(this.trait_preferences)) {
      if (!(trait_key in setup.trait)) {
        throw new Error(`Unknown trait ${trait_key} for living ${key}`);
      }
      if (!this.trait_preferences[trait_key]) {
        throw new Error(`Missing value for ${trait_key} in Living ${key}`);
      }
    }

    if (!Array.isArray(business))
      throw new Error(`business must be array for living ${key}`);
    this.business = business;

    if (!location) {
      throw new Error(`Missing locatin for living ${key}`);
    }
    this.location = location;

    if (key in setup.living)
      throw new Error(`Living with key ${key} duplicated`);
    setup.living[key as LivingKey] = this;

    if (!Story.has(this.getDescriptionPassage())) {
      throw new Error(
        `Passage ${this.getDescriptionPassage()} not found for living ${key}!`,
      );
    }
  }

  getDefaultPreference(): number {
    return this.default_preference;
  }

  getUnitRestrictions(): Restriction<Unit>[] {
    return this.unit_restrictions;
  }

  getTraitPreferences(): ChanceObject<TraitKey> {
    return this.trait_preferences;
  }

  getLocation(): string {
    return this.location;
  }

  getName(): string {
    return this.name;
  }

  getDescriptionPassage(): string {
    return `LIVING_${this.key}`;
  }

  getTags(): string[] {
    return this.tags;
  }

  getBusiness(): string[] {
    return this.business;
  }

  /**
   * Example: "relaxing at home", "brewing alcohol", ...
   */
  repBusiness(unit: Unit): string {
    return setup.Text.replaceUnitMacros(this.getBusiness(), { a: unit });
  }

  computePreference(unit: Unit): number {
    const restrictions = this.getUnitRestrictions();
    if (!setup.RestrictionLib.isUnitSatisfy(unit, restrictions)) {
      // unit cannot get this no matter what
      return 0;
    }

    let base = this.getDefaultPreference();
    const trait_preferences = this.getTraitPreferences();
    for (const [trait_key, value] of objectEntries(trait_preferences)) {
      if (unit.isHasTrait(trait_key)) {
        base += value;
      }
    }

    return Math.max(0, base);
  }

  rep(): string {
    return this.getName();
  }

  /**
   * Choose a living for this unit
   */
  static getLiving(unit: Unit): Living {
    const candidates: ChanceArray<Living> = [];
    for (const living of Object.values(setup.living)) {
      const preference = living.computePreference(unit);
      if (preference) {
        candidates.push([living, preference]);
      }
    }
    if (!candidates.length)
      throw new Error(`Empty living candidates for unit ${unit.getName()}`);
    const chosen = setup.rng.sampleArray(candidates, /* normalize = */ true)!;
    return chosen;
  }

  static isRestrictionsAllowRetired(restrictions: Restriction[]): boolean {
    for (const restriction of restrictions) {
      if (
        restriction instanceof Job &&
        restriction.job_key == setup.job.retired.key
      ) {
        return true;
      }
      if (restriction instanceof setup.qresImpl.Living) {
        return true;
      }
    }
    return false;
  }
}
