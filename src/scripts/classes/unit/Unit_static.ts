import { TraitHelper, type Trait } from "../trait/Trait";

import type { Unit } from "./Unit";

export function Unit_CmpDefault(unit1: Unit, unit2: Unit): number {
  const result = setup.Job.cmp(unit1.getJob(), unit2.getJob());
  if (result != 0) return result;

  if (unit1.getName() < unit2.getName()) return -1;
  if (unit1.getName() > unit2.getName()) return 1;

  return 0;
}

export function Unit_CmpName(unit1: Unit, unit2: Unit): number {
  if (unit1.getName() < unit2.getName()) return -1;
  if (unit1.getName() > unit2.getName()) return 1;
  return setup.Unit_CmpDefault(unit1, unit2);
}

export function Unit_CmpJob(unit1: Unit, unit2: Unit): number {
  const result = setup.Job.cmp(unit1.getJob(), unit2.getJob());
  if (result) return result;
  return setup.Unit_CmpDefault(unit1, unit2);
}

/**
 * Return list of pair of traits where these two units conflict with each other.
 */
export function Unit_getConflictingPerTraits(
  unit1: Unit,
  unit2: Unit,
): Array<[Trait, Trait]> {
  const traits = TraitHelper.getAllTraitsOfTags(["per"]);

  const result: Array<[Trait, Trait]> = [];
  for (const trait of traits) {
    const trait_group = trait.getTraitGroup();
    if (trait_group && unit1.isHasTraitExact(trait)) {
      const enemy_trait = unit2.getTraitFromTraitGroup(trait_group);
      if (
        enemy_trait &&
        (!trait_group.isOrdered() ||
          trait_group._getTraitIndex(trait) *
            trait_group._getTraitIndex(enemy_trait) <
            0)
      ) {
        result.push([trait, enemy_trait]);
      }
    }
  }
  return result;
}

/**
 * Return list of pair of traits where these two units conflict with each other.
 */
export function Unit_getAnyConflictingPerTraits(
  unit1: Unit,
  unit2: Unit,
): [Trait, Trait] | null {
  const traits = setup.Unit.getConflictingPerTraits(unit1, unit2);
  if (traits.length) {
    return setup.rng.choice(traits);
  } else {
    return null;
  }
}

/**
 * Return list of per traits that bost unit have in common
 */
export function Unit_getSamePerTraits(unit1: Unit, unit2: Unit): Trait[] {
  return TraitHelper.getAllTraitsOfTags(["per"]).filter(
    (trait) => unit1.isHasTraitExact(trait) && unit2.isHasTraitExact(trait),
  );
}

/**
 * Return list of pair of traits where these two units conflict with each other.
 */
export function Unit_getAnySamePerTraits(
  unit1: Unit,
  unit2: Unit,
): Trait | null {
  const traits = setup.Unit.getSamePerTraits(unit1, unit2);
  if (traits.length) {
    return setup.rng.choice(traits);
  } else {
    return null;
  }
}

/**
 * Auto assigns all available perks
 */
export function Unit_autoAssignPerks() {
  const units = State.variables.company.player
    .getUnits({ job: setup.job.slaver })
    .filter((unit) => unit.isCanLearnNewPerk());
  for (const unit of units) {
    // get the unit's skills, and sort them.
    const skill_values = unit.getSkillsBase();
    const skill_value_arr = [];
    for (let i = 0; i < skill_values.length; ++i) {
      skill_value_arr.push([i, skill_values[i]]);
    }
    skill_value_arr.sort((a, b) => b[1] - a[1]);

    for (const [skill_key, v] of skill_value_arr) {
      if (unit.isCanLearnNewPerk()) {
        const perk_to_learn =
          setup.trait[`perk_${setup.skill[skill_key].keyword}` as TraitKey];
        unit.addTrait(perk_to_learn);
      }
    }
  }
}
