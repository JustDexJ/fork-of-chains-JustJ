// trait_list: list of traits in order, from the "most negative" to the "most positive"
// for example, for muscle would be
// [muscle_extremelythin, muscle_verythin, muscle_thin, null, muscle_strong, muscle_verystrong, muscle_extremelystrong]
// the null means that if the trait were to "increase", it goes back to nothing.

import type { _TraitGroupKey } from "../../data/traits/_index";
import { TwineClass } from "../_TwineClass";
import type { Unit } from "../unit/Unit";
import type { Trait, TraitKey } from "./Trait";

export interface TraitGroupDefinition {
  key?: string | null;

  sequence?: (Trait | TraitKey | null)[];
  pool?: (Trait | TraitKey)[];
  trait_tag?: string;
}

//export type TraitGroupKey = BrandedType<number | string, "TraitGroupKey">;
export type TraitGroupKey = _TraitGroupKey;

// tags is shorthand to add the same tag to all traits in this group

// is_not_ordered = true means that the trait does not have an order
// e.g., gender is is_not_ordered.
export class TraitGroup extends TwineClass {
  key: TraitGroupKey;
  trait_key_list: (TraitKey | null)[];
  is_not_ordered: boolean;

  trait_tag: string | undefined;

  static keygen = 1;

  constructor(key_: string | undefined, def: Readonly<TraitGroupDefinition>) {
    super();

    const key = (key_ ?? TraitGroup.keygen++) as TraitGroupKey;

    this.key = key;

    const is_sequence = !!def.sequence;
    const traits = def.sequence ?? def.pool ?? [];

    let nullcnt = 0;
    this.trait_key_list = [];
    for (const value of traits) {
      const trait = value ? resolveObject(value, setup.trait) : null;
      if (trait) {
        this.trait_key_list.push(trait.key);

        if (trait.trait_group_key)
          throw new Error(`Trait ${trait.key} already have a trait group`);
        trait.trait_group_key = this.key;
      } else {
        nullcnt += 1;
        this.trait_key_list.push(null);
      }
    }
    if (nullcnt > 1)
      throw new Error(
        `Too many nulls for ${tags}. Did you forgot to add new to the trait?`,
      );

    this.is_not_ordered = !is_sequence;

    this.trait_tag = def.trait_tag;
    if (def.trait_tag) {
      this._checkAndAddMissingTraits();
    }

    if (this.key in setup.traitgroup)
      throw new Error(`${this.key} duplicated on trait group`);
    setup.traitgroup[this.key] = this;
  }

  _addTrait(trait: Trait) {
    this.trait_key_list.push(trait.key);

    if (trait.trait_group_key)
      throw new Error(`Trait ${trait.key} already have a trait group`);
    trait.trait_group_key = this.key;
  }

  _checkAndAddMissingTraits() {
    if (this.trait_tag) {
      for (const trait of Object.values(setup.trait)) {
        if (
          trait.trait_group_key !== this.key &&
          trait.tags.includes(this.trait_tag)
        ) {
          this._addTrait(trait);
        }
      }
    }
  }

  isOrdered() {
    return !this.is_not_ordered;
  }

  _getTraitIndex(trait: Trait | null): number {
    if (this.is_not_ordered) throw new Error(`trait group is unordered index`);

    let all_traits = this.getTraits();
    for (let i = 0; i < all_traits.length; ++i) {
      if (all_traits[i] == trait) return i;
    }
    if (!trait) return -1;
    throw new Error(`Trait not found: ${trait.key}`);
  }

  computeResultingTrait(unit: Unit, new_trait: Trait | null): Trait | null {
    // if a unit is supposed to gain new_trait, what trait
    // the unit actually get?
    // formula: first find the 'null'. If null is found, then that
    // becomes the "0" position. Otherwise, "0" position is at start.
    // if unit_trait is after the 0 position, then try to increase trait up to unit_trait
    // otherwise, try to decrease trait up to unit_trait

    if (this.is_not_ordered) throw new Error(`trait group is unordered`);

    // find the existing trait
    let existing_trait = null;
    let existing_trait_position = -1;
    let all_traits = this.getTraits();
    for (let i = 0; i < all_traits.length; ++i) {
      const trait = all_traits[i];
      if (trait && unit.isHasTraitExact(trait)) {
        existing_trait = trait;
        existing_trait_position = i;
        break;
      }
    }

    if (existing_trait == new_trait) return existing_trait;

    // find new trait and null position
    let new_trait_position = this._getTraitIndex(new_trait);
    let null_position = this._getTraitIndex(null);

    if (existing_trait === null) {
      existing_trait_position = null_position;
    }

    // compute direction
    let change = null;
    if (new_trait == null) {
      if (null_position < existing_trait_position) {
        change = -1;
      } else {
        change = 1;
      }
    } else if (new_trait_position > null_position) {
      change = 1;
    } else if (new_trait_position < null_position) {
      change = -1;
    } else {
      throw new Error(`Unknown error weird null position`);
    }

    if (change > 0 && existing_trait_position > new_trait_position)
      return existing_trait;
    if (change < 0 && existing_trait_position < new_trait_position)
      return existing_trait;

    // Find next trait in direction.
    let new_position = existing_trait_position + change;
    if (new_position == -1) return null;
    if (new_position < -1 || new_position >= all_traits.length)
      throw new Error(`Cant find next trait`);

    return all_traits[new_position];
  }

  getTraits(): (Trait | null)[] {
    let result: (Trait | null)[] = [];
    for (let i = 0; i < this.trait_key_list.length; ++i) {
      let tkey = this.trait_key_list[i];
      if (tkey) {
        result.push(setup.trait[tkey]);
      } else {
        result.push(null);
      }
    }
    return result;
  }

  getSmallestTrait(): Trait {
    let traits = this.getTraits();
    for (let i = 0; i < traits.length; ++i) {
      const trait = traits[i];
      if (trait) return trait;
    }
    throw new Error(`Smallest trait not found`);
  }

  getLargestTrait(): Trait {
    let traits = this.getTraits();
    for (let i = traits.length - 1; i >= 0; --i) {
      const trait = traits[i];
      if (trait) return trait;
    }
    throw new Error(`Largest trait not found`);
  }

  /**
   * Given a trait: if positive trait, then this and all the traits after that.
   * Otherwise the opposite.
   *
   * If param `is_opposite` is true, then direction is reversed.
   *
   * A "null" in the returned array marks the absence of trait of the group (as in the default).
   */
  getTraitCover(trait: Trait | null, is_opposite?: boolean): (Trait | null)[] {
    if (this.is_not_ordered) return [trait];

    let position = this._getTraitIndex(trait);
    let nullposition = this._getTraitIndex(null);
    let direction = 1;
    if (nullposition > position) direction = -1;
    if (is_opposite) direction *= -1;

    let traits = this.getTraits();
    let result: (Trait | null)[] = [];
    for (let i = 0; i < traits.length; ++i) {
      if (traits[i]) {
        if (
          (direction == 1 && i >= position) ||
          (direction == -1 && i <= position)
        ) {
          result.push(traits[i]);
        }
      }
    }
    return result;
  }
}
