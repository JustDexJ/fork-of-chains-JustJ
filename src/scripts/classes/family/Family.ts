import { typedRecord } from "../../util/typeutils";
import { TwineClass } from "../_TwineClass";
import { FamilyRelation, FamilyRelationKey } from "./FamilyRelation";

const FAMILY_RELATION_TYPES = typedRecord<{
  [k in BuiltinTraitKey]?: FamilyRelationKey;
}>()({
  sibling: {
    gender_male: "brother",
    gender_female: "sister",
  },
  twin: {
    gender_male: "twinbrother",
    gender_female: "twinsister",
  },
  parent: {
    gender_male: "father",
    gender_female: "mother",
  },
  child: {
    gender_male: "son",
    gender_female: "daughter",
  },
});

export type FamilyRelationType = keyof typeof FAMILY_RELATION_TYPES;

/**
 * Special.
 * Will be assigned to State.variables.family
 */
export class Family extends TwineClass {
  // {unit_key: {unit_key: relation}}
  family_map: {
    [k1 in UnitKey]?: {
      [k2 in UnitKey]?: FamilyRelationType;
    };
  } = {};

  constructor() {
    super();
  }

  // deletes a unit completely from the records.
  deleteUnit(unit: Unit): void {
    let unitkey = unit.key;
    if (unitkey in this.family_map) {
      delete this.family_map[unitkey];
    }
    for (const submap of Object.values(this.family_map)) {
      if (unitkey in submap!) {
        delete submap![unitkey];
      }
    }
  }

  _setRelation(unit: Unit, target: Unit, relation: FamilyRelationType) {
    // unit become target's "relation". E.g., unit become target's father.
    (this.family_map[unit.key] ??= {})[target.key] = relation;
  }

  unsetRelation(unit: Unit, target: Unit): void {
    const submap1 = this.family_map[unit.key];
    if (submap1) {
      delete submap1[target.key];
    }

    const submap2 = this.family_map[target.key];
    if (submap2) {
      delete submap2[unit.key];
    }
  }

  _uniteSurname(unit: Unit, target: Unit): void {
    // unit's surname is changed to target's surname
    unit.setName(unit.first_name, target.surname);
  }

  setSibling(unit: Unit, target: Unit): void {
    // unit and target becomes siblings.
    this.unsetRelation(unit, target);
    this._setRelation(unit, target, "sibling");
    this._setRelation(target, unit, "sibling");
    this._uniteSurname(unit, target);
  }

  setParent(unit: Unit, target: Unit): void {
    // unit becomes target's parent
    this.unsetRelation(unit, target);
    this._setRelation(unit, target, "parent");
    this._setRelation(target, unit, "child");

    // change child's name
    this._uniteSurname(target, unit);
  }

  setTwin(unit: Unit, target: Unit): void {
    // unit becomes target's twin
    this.unsetRelation(unit, target);
    this._setRelation(unit, target, "twin");
    this._setRelation(target, unit, "twin");
    this._uniteSurname(unit, target);
  }

  /**
   * unit is target's xxx (if any)
   */
  getRelation(unit: Unit, target: Unit): FamilyRelation | null {
    const relationtype = this.family_map[unit.key]?.[target.key];
    if (!relationtype) {
      return null;
    }

    let relationmeta = FAMILY_RELATION_TYPES[relationtype];

    if (!relationmeta) {
      throw new Error(
        `??? missing relation type for relationtype ${relationtype}`,
      );
    }

    for (let [traitkey, key] of objectEntries(relationmeta)) {
      if (unit.isHasTrait(setup.trait[traitkey])) {
        return setup.familyrelation[key];
      }
    }
    throw new Error(`Not found relation family for ${unit.key}`);
  }

  // get unit's relation. E.g., get unit's father, if any
  getUnitRelation(unit: Unit, relation: FamilyRelationKey | FamilyRelation) {
    relation = resolveObject(relation, setup.familyrelation);

    if (!relation) {
      throw new Error(`Missing relation in getUnitRelation!`);
    }

    for (const unitkey of objectKeys(this.family_map)) {
      const target = State.variables.unit[unitkey as UnitKey];
      if (this.getRelation(target, unit) === relation) {
        return target;
      }
    }
    return null;
  }

  /** returns {unit_key: family_relation} */
  getFamily(unit: Unit): { [k: UnitKey]: FamilyRelation } {
    const submap = this.family_map[unit.key];
    if (!submap) {
      return {};
    }

    let result: Record<UnitKey, FamilyRelation> = {};
    for (let targetkey of objectKeys(submap) as UnitKey[]) {
      result[targetkey] = this.getRelation(
        unit,
        State.variables.unit[targetkey],
      )!;
    }
    return result;
  }

  getFamilyList(unit: Unit): Array<{ unit: Unit; relation: FamilyRelation }> {
    return objectEntries(this.getFamily(unit)).map(([k, v]) => ({
      unit: State.variables.unit[k as UnitKey],
      relation: v,
    }));
  }
}
