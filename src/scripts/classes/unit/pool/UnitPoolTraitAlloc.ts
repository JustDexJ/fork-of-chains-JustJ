import { TwineClass } from "../../_TwineClass";
import { TraitHelper } from "../../trait/Trait";
import type { ChancesWithMinMax } from "./UnitPoolHelper";

export class UnitPoolTraitAlloc extends TwineClass {
  /** how much does this pool prefers a certain trait. */
  trait_preferences: ChanceObject<TraitKey>;

  /** how much does this pool hates a certain trait. */
  trait_dispreferences: ChanceObject<TraitKey>;

  constructor(
    trait_preferences: ChanceObject<TraitKey>,
    trait_dispreferences: ChanceObject<TraitKey>,
  ) {
    super();

    this.trait_preferences = trait_preferences;
    this.trait_dispreferences = trait_dispreferences;

    for (const [trait_key, value] of objectEntries(trait_preferences)) {
      if (!(trait_key in setup.trait))
        throw new Error(
          `Unknown trait key in preference unit pool trait alloc: ${trait_key}`,
        );
      if (value === undefined || value === null)
        throw new Error(
          `Found ${value} value for trait ${trait_key} in triat alloc!`,
        );
    }

    // check all bg traits are tehre
    for (const trait of Object.values(setup.trait).filter((t) =>
      t.getTags().includes("bg"),
    )) {
      if (!(trait.key in trait_preferences))
        throw new Error(
          `Missing background trait from unit pool trait alloc: ${trait.key}`,
        );
    }

    for (const trait_key in trait_dispreferences) {
      if (!(trait_key in setup.trait))
        throw new Error(
          `Unknown trait key in dispreference unit pool trait alloc: ${trait_key}`,
        );
    }
  }

  _setupOneObj(
    prefs: Record<string, ChancesWithMinMax>,
    trait_tag: string,
  ): void {
    let found = null;
    for (const trait_key of objectKeys(this.trait_preferences)) {
      const trait = setup.trait[trait_key];
      if (trait.getTags().includes(trait_tag)) {
        if (found) {
          throw new Error(
            `Duplicate ${trait_tag} for unit pool trait alloc!: ${found.key}`,
          );
        }
        found = trait;
      }
    }
    if (!found)
      throw new Error(`Missing ${trait_tag} for unit pool trait alloc!`);
    prefs[trait_tag] = setup.UnitPoolHelper.getOneTraitObj(found);
  }

  _setupTaggedTraits(
    prefs: Record<string, ChancesWithMinMax>,
    tag: string,
    gender: Trait,
    must_be_one?: boolean,
  ): void {
    const trait_map: ChanceObject<TraitKey> = {};
    for (const [trait_key, value] of objectEntries(this.trait_preferences)) {
      const trait = setup.trait[trait_key];
      if (trait.getTags().includes(tag)) {
        if (!trait.isCompatibleWithGender(gender)) continue;
        trait_map[trait.key] = value;
      }
    }

    if (Object.keys(trait_map).length) {
      prefs[tag] = {
        chances: trait_map,
        min: must_be_one ? 1 : 0,
        max: must_be_one ? 1 : Object.keys(trait_map).length,
      };
    }
  }

  _applyModifiers(prefs: Record<string, ChancesWithMinMax>): void {
    // add positive modifiers
    for (const [trait_key, value] of objectEntries(this.trait_preferences)) {
      const trait = setup.trait[trait_key];
      let found = false;
      for (const trait_tag in prefs) {
        if (trait.getTags().includes(trait_tag)) {
          if (found)
            throw new Error(
              `Double positive trait for ${trait_key} in unit pool alloc.`,
            );
          if (!(trait_key in prefs[trait_tag].chances))
            throw new Error(
              `Missing positive trait: ${trait_key} in unit pool alloc for tag ${trait_tag}`,
            );
          prefs[trait_tag].chances[trait_key] += value;
        }
      }

      // can be not found for skin, race, bg traits
    }

    // add negative modifiers
    for (const [trait_key, value] of objectEntries(this.trait_dispreferences)) {
      const trait = setup.trait[trait_key];
      let found = false;
      for (const trait_tag in prefs) {
        if (trait.getTags().includes(trait_tag)) {
          if (found)
            throw new Error(
              `Double negative trait for ${trait_key} in unit pool alloc.`,
            );
          if (!(trait_key in prefs[trait_tag].chances))
            throw new Error(
              `Missing negative trait: ${trait_key} in unit pool alloc for tag ${trait_tag}`,
            );
          prefs[trait_tag].chances[trait_key] /= value;
        }
      }

      // can be not found for skin, race, bg traits
    }
  }

  computePreferences(gender: Trait) {
    const prefs = setup.UnitPoolTraitAlloc.getBaseTraitPreferences(gender);

    // apply modifiers
    this._applyModifiers(prefs);

    // setup basic ones
    this._setupOneObj(prefs, "subrace");

    // setup skin traits and bg traits
    this._setupTaggedTraits(prefs, "skin", gender);
    this._setupTaggedTraits(prefs, "bg", gender, /* must_be_one = */ true);

    return prefs;
  }

  static getBaseTraitPreferences(gender: Trait): {
    gender: ChancesWithMinMax;
    per: ChancesWithMinMax;
    skill: ChancesWithMinMax;
  } {
    const prefs: ReturnType<typeof this.getBaseTraitPreferences> = {
      // setup gender
      gender: setup.UnitPoolHelper.getOneTraitObj(gender),

      // setup basic personality traits
      per: setup.UnitPoolHelper.getTraitChanceObj(
        [
          [
            TraitHelper.getAllTraitsOfTags(["per", "common"]),
            setup.UNIT_POOL_PER_TRAITS_AVERAGE_COMMON,
          ],
          [
            TraitHelper.getAllTraitsOfTags(["per", "medium"]),
            setup.UNIT_POOL_PER_TRAITS_AVERAGE_MEDIUM,
          ],
          [
            TraitHelper.getAllTraitsOfTags(["per", "rare"]),
            setup.UNIT_POOL_PER_TRAITS_AVERAGE_RARE,
          ],
          [
            TraitHelper.getAllTraitsOfTags(["per", "unicorn"]),
            setup.UNIT_POOL_PER_TRAITS_AVERAGE_UNICORN,
          ],
        ],
        setup.UNIT_POOL_PER_TRAITS_MIN,
        setup.UNIT_POOL_PER_TRAITS_MAX,
      ),

      // setup skill traits
      skill: setup.UnitPoolHelper.getTraitChanceObj(
        [
          [
            TraitHelper.getAllTraitsOfTags(["skill", "common"]),
            setup.UNIT_POOL_SKILL_TRAITS_AVERAGE_COMMON,
          ],
          [
            TraitHelper.getAllTraitsOfTags(["skill", "medium"]),
            setup.UNIT_POOL_SKILL_TRAITS_AVERAGE_MEDIUM,
          ],
          [
            TraitHelper.getAllTraitsOfTags(["skill", "rare"]),
            setup.UNIT_POOL_SKILL_TRAITS_AVERAGE_RARE,
          ],
          [
            TraitHelper.getAllTraitsOfTags(["skill", "unicorn"]),
            setup.UNIT_POOL_SKILL_TRAITS_AVERAGE_UNICORN,
          ],
        ],
        setup.UNIT_POOL_SKILL_TRAITS_MIN,
        setup.UNIT_POOL_SKILL_TRAITS_MAX,
      ),
    };

    // physical traits
    if (gender == setup.trait.gender_male) {
      setup.UnitPoolHelper.physHelperMale(prefs);
    } else if (gender == setup.trait.gender_female) {
      setup.UnitPoolHelper.physHelperFemale(prefs);
    } else {
      throw new Error(`Unknown gender for unit pool generation: ${gender.key}`);
    }

    return prefs;
  }
}
