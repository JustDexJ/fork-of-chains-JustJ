import type { Job, JobKey } from "../job/Job";
import type { Unit } from "./Unit";

// Static method collection for handling childbirth
export namespace UnitBirth {
  /**
   * Note that the parents does not have to be biologically male/female
   * @param jobHint Used to determine which gender distribution to use.
   */
  export function generateChild(
    father: Unit,
    mother: Unit,
    job_hint: Job,
  ): Unit | null {
    if (!job_hint) throw new Error(`"job_hint" must be set for generateChild`);

    const unit = doGenerateChild(father, mother, job_hint.key);

    // set family
    State.variables.family.setParent(mother, unit);
    State.variables.family.setParent(father, unit);

    return unit;
  }
}

/**
 * Note that the parents does not have to be biologically male/female
 */
function doGenerateChild(father: Unit, mother: Unit, job_hint: JobKey): Unit {
  const subrace = setup.rng.choice([father.getSubrace(), mother.getSubrace()]);
  const pool = setup.UnitPool.getUnitPool(subrace);

  const base_unit = pool.generateUnit({ job_hint })!;

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
