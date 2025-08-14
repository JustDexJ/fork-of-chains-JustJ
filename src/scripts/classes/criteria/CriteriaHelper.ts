import type { UnitCriteria } from "./UnitCriteria";

export namespace CriteriaHelper {
  export function CritTraits(
    traits: Trait[],
    criteria: UnitCriteria,
  ): UnitCriteria {
    // adds crit traits to the criteria.
    let newcriteria = setup.deepCopy(criteria);

    for (let i = 0; i < traits.length; ++i) {
      if (!traits[i]) throw new Error(`Missing ${i}-th trait for CritTrait`);
      newcriteria.crit_trait_map[traits[i].key] = true;
    }

    return newcriteria;
  }

  export function DisasterTraits(
    traits: Trait[],
    criteria: UnitCriteria,
  ): UnitCriteria {
    // adds disaster traits to the criteria.
    let newcriteria = setup.deepCopy(criteria);

    for (let i = 0; i < traits.length; ++i) {
      if (!traits[i]) throw new Error(`Missing ${i}-th trait for CritTrait`);
      newcriteria.disaster_trait_map[traits[i].key] = true;
    }

    return newcriteria;
  }

  export function Restrictions(
    restrictions: Restriction[],
    criteria: UnitCriteria,
  ): UnitCriteria {
    // adds [restriction1, restriction2]
    let newcriteria = setup.deepCopy(criteria);

    for (let i = 0; i < restrictions.length; ++i) {
      if (!restrictions[i])
        throw new Error(`Missing ${i}-th trait for CritTrait`);
      newcriteria.restrictions.push(restrictions[i]);
    }

    return newcriteria;
  }

  export function Name(name: string, criteria: UnitCriteria): UnitCriteria {
    // adds [restriction1, restriction2]
    let newcriteria = setup.deepCopy(criteria);
    newcriteria.name = name;

    return newcriteria;
  }
}
