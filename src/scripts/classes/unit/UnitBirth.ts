import type { TraitKey } from "../trait/Trait";
import type { Unit } from "./Unit";

// Static method collection for handling childbirth
export namespace UnitBirth {
  /**
   * Note that the parents does not have to be biologically male/female
   */
  export function generateChild(
    father: Unit,
    mother: Unit,
    preference?: {
      retries: number;
      trait_key: TraitKey | BuiltinTraitKey;
    },
  ): Unit | null {
    if (!preference)
      throw new Error(`preference must be set for generateChild`);

    // keep attempting to find the target unit
    let max_retries = 1;
    if (preference) max_retries = preference.retries + 1;

    let unit: Unit;
    let i = 0;
    do {
      unit = doGenerateChild(father, mother);
      if (
        i < max_retries - 1 &&
        preference &&
        !unit.isHasTraitExact(setup.trait[preference.trait_key])
      ) {
        unit.delete();
      } else {
        break;
      }
    } while (i++ < max_retries);

    // set family
    State.variables.family.setParent(mother, unit);
    State.variables.family.setParent(father, unit);

    return unit;
  }
}

/**
 * Note that the parents does not have to be biologically male/female
 */
function doGenerateChild(father: Unit, mother: Unit): Unit {
  const subrace = setup.rng.choice([father.getSubrace(), mother.getSubrace()]);
  const pool = setup.UnitPool.getUnitPool(subrace);

  const base_unit = pool.generateUnit()!;

  // first, inherit background if lucky
  if (Math.random() < setup.CHILD_TRAIT_BACKGROUND_INHERIT_CHANCE) {
    const father_backgrounds = father
      .getAllTraitsWithTag("bg")
      .filter((trait) => father.isHasRemovableTrait(trait));
    const mother_backgrounds = mother
      .getAllTraitsWithTag("bg")
      .filter((trait) => mother.isHasRemovableTrait(trait));
    const backgrounds = father_backgrounds.concat(mother_backgrounds);
    if (backgrounds.length) {
      const chosen = setup.rng.choice(backgrounds);
      setup.qc
        .BgTraitReset("unit", chosen)
        .apply(setup.costUnitHelper(base_unit));
    }
  }

  // inherit traits
  const traits = father
    .getInheritableTraits()
    .concat(mother.getInheritableTraits())
    .concat(base_unit.getInheritableTraits());

  setup.qc
    .RemoveTraitsWithTag("unit", "per")
    .apply(setup.costUnitHelper(base_unit));
  setup.qc
    .RemoveTraitsWithTag("unit", "skill")
    .apply(setup.costUnitHelper(base_unit));

  setup.rng.shuffleArray(traits);

  for (const trait of traits) {
    if (!base_unit.isTraitCompatible(trait)) continue;
    const tags = trait.getTags();

    // breast is an exception
    if (tags.includes("breast") && base_unit.isMale()) continue;

    if (Math.random() < setup.CHILD_TRAIT_NON_BACKGROUND_INHERIT_CHANCE) {
      // inherit
      setup.qc
        .TraitReplace("unit", trait)
        .apply(setup.costUnitHelper(base_unit));
    }
  }

  base_unit.resetInnateTraits();

  return base_unit;
}
