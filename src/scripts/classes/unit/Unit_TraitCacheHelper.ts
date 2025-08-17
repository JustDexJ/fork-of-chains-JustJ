import type { Perk } from "../trait/Perk";
import { Trait, TraitKey } from "../trait/Trait";
import type { Unit } from "./Unit";
import { UnitTraitsHelper } from "./Unit_TraitsHelper";

export namespace UnitTraitCacheHelper {
  /**
   * Get unit's cached trait value. Set it first if it was unset.
   */
  export function getTraitMapCacheBackend(
    unit: Unit,
    varkey: string,
    callback: (unit: Unit) => Trait[],
  ): Record<TraitKey, boolean> {
    let map = State.variables.cache.get<Record<TraitKey, boolean>>(
      varkey,
      unit.key,
    );

    if (!map) {
      const trait_list = callback(unit);
      map = {};
      for (const trait of trait_list) {
        map[trait.key] = true;
      }
      State.variables.cache.set(varkey, unit.key, map);
    }

    return map;
  }

  /**
   * Compute units extra traits. Also cached for performance.
   */
  export function _computeAllExtraTraits(unit: Unit): Trait[] {
    const trait_map: Record<TraitKey, boolean> = {};

    /**
     * Extra traits from equipment sets:
     */
    const equipment_set = unit.getEquipmentSet();
    if (equipment_set) {
      const trait_obj = equipment_set.getTraitsObj();
      for (const trait_key of objectKeys(trait_obj)) {
        const trait = setup.trait[trait_key];
        if (trait.isAttachable()) {
          // only attachable traits become extra traits. Computed traits go with "standard" traits.
          trait_map[trait.key] = true;
        }
      }
    }

    /**
     * Extra traits form perks:
     */
    for (const perk of unit.getAllTraitsWithTag("perk") as Perk[]) {
      for (const extra of perk.getPerkExtraTraits()) {
        trait_map[extra.key] = true;
      }
    }

    let traits = objectKeys(trait_map)
      .map((key) => {
        const trait = setup.trait[key];
        return trait && !unit.isHasTrait(trait) ? trait : null;
      })
      .filter((t) => !!t);

    // Remove mindbroken traits
    // Can do this since mindbroken code is special
    const mindbroken = unit.isMindbroken();
    if (mindbroken) {
      traits = UnitTraitsHelper.removeMindbrokenTraits(traits);
    }

    traits.sort(setup.Trait.cmp);

    return traits;
  }

  /**
   * Compute all unit's base traits and return them as a list. Used internally once then cached.
   */
  export function _computeAllBaseTraits(unit: Unit): Trait[] {
    let traits = objectKeys(unit.trait_key_map)
      .map((trait_key) => setup.trait[trait_key])
      .filter((t) => t);
    if (unit.isMindbroken()) {
      traits = UnitTraitsHelper.removeMindbrokenTraits(traits);
    }

    /**
     * Computed (base) traits: corruption and training
     */
    let corruptions = 0;
    let trainings = 0;

    for (const trait of traits) {
      if (trait.getTags().includes("wings")) {
        traits.push(setup.trait.skill_flight);
      }
      if (trait.isCorruption() && !trait.isNeedGenital()) {
        corruptions += 1;
      }
      if (trait.getTags().includes("training")) {
        trainings += 1;
      }
    }

    // use this check to also check if unit is in market
    if (trainings == 0 && unit.isSlaveOrInSlaveMarket()) {
      traits.push(setup.trait.training_none);
    }

    if (corruptions >= 7) {
      traits.push(setup.trait.corruptedfull);
    } else if (corruptions >= 2) {
      traits.push(setup.trait.corrupted);
    }

    /**
     * Computed traits: primary race
     */
    traits.push(unit.getRace());

    /**
     * END
     */
    traits.sort(Trait.cmp);
    return traits;
  }

  /**
   * Compute all unit's traits and return them as a list. Used internally once then cached.
   */
  export function _computeAllTraits(unit: Unit): Trait[] {
    let traits = unit.getBaseTraits();
    const base_trait_map = unit.getBaseTraitMapCache();

    /**
     * Trait from equipment set
     */
    const equipment_set = unit.getEquipmentSet();
    if (equipment_set) {
      let trait_obj = equipment_set.getTraitsObj();
      for (let trait_key of objectKeys(trait_obj)) {
        const trait = setup.trait[trait_key];
        if (!(trait.key in base_trait_map)) {
          if (trait.isAttachable()) {
            // attachable trait from equipments will be included in unit.getExtraTraits() instead.
          } else {
            traits.push(trait);
          }
        }
      }
    }

    /**
     * Computed (base) traits: join time
     */
    if (unit.isYourCompany()) {
      let weeks = unit.getWeeksWithCompany();
      if (weeks < setup.TRAIT_JUNIOR_THRESHOLD) {
        traits.push(setup.trait.join_junior);
      } else if (weeks >= setup.TRAIT_SENIOR_THRESHOLD) {
        traits.push(setup.trait.join_senior);
      }
    }

    /**
     * Computed (base) traits: unit value
     */
    let value = unit.getSlaveValue();
    if (value < setup.TRAIT_VALUE_LOW_THRESHOLD) {
      traits.push(setup.trait.value_low);
    } else {
      for (let i = setup.TRAIT_VALUE_HIGH_THRESHOLDS.length - 1; i >= 0; --i) {
        if (value >= setup.TRAIT_VALUE_HIGH_THRESHOLDS[i]) {
          traits.push(setup.trait[`value_high${i + 1}` as TraitKey]);
          break;
        }
      }
    }

    /**
     * Temporary traits: trauma and boon
     */
    traits = traits.concat(State.variables.trauma.getTraits(unit));

    /**
     * Computed traits: job
     */
    traits.push(unit.getJob().getTrait());

    /**
     * END
     */
    traits.sort(Trait.cmp);
    return traits;
  }
}
