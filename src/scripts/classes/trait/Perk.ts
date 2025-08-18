import { Trait, type TraitDefinition } from "./Trait";

export interface PerkDefinition extends TraitDefinition {
  perk_choice_restrictions: Restriction[];
  perk_end_of_week_effect: Cost[];
  perk_null_traits?: (Trait | TraitKey | BuiltinTraitKey)[];
  perk_extra_traits?: (Trait | TraitKey | BuiltinTraitKey)[];
}

export class Perk extends Trait {
  perk_choice_restrictions: Restriction[];
  perk_end_of_week_effect: Cost[];
  perk_null_trait_keys: TraitKey[];
  perk_extra_trait_keys: TraitKey[];

  constructor(key: string, def: Readonly<PerkDefinition>) {
    super(key, def);

    this.perk_choice_restrictions = def.perk_choice_restrictions;
    this.perk_end_of_week_effect = def.perk_end_of_week_effect;
    this.perk_null_trait_keys = (def.perk_null_traits || []).map((trait) =>
      resolveKey(trait as TraitKey | Trait),
    );
    this.perk_extra_trait_keys = (def.perk_extra_traits || []).map((trait) =>
      resolveKey(trait as TraitKey | Trait),
    );
  }

  getPerkChoiceRestrictions(): Restriction[] {
    return this.perk_choice_restrictions;
  }

  getEndOfWeekEffect(): Cost[] {
    return this.perk_end_of_week_effect;
  }

  /**
   * Return list of traits whose disaster effects are nullified by this perk.
   */
  getPerkNullTraits(): Trait[] {
    return this.perk_null_trait_keys.map((key) => setup.trait[key]);
  }

  /**
   * Return list of extra traits from perk
   */
  getPerkExtraTraits(): Trait[] {
    return this.perk_extra_trait_keys.map((key) => setup.trait[key]);
  }

  isPerkAvailableInChoiceFor(unit: Unit) {
    return setup.RestrictionLib.isUnitSatisfy(
      unit,
      this.getPerkChoiceRestrictions(),
    );
  }

  /**
   * Special trait has their own limits.
   */
  isSpecial(): boolean {
    return this.getTags().includes("perkspecial");
  }

  /**
   * Called at end of each week from the unit.
   */
  advanceWeek(unit: Unit) {
    super.advanceWeek(unit);
    if (unit.isSlaver()) {
      setup.RestrictionLib.applyAll(
        this.getEndOfWeekEffect(),
        setup.costUnitHelper(unit, this.getName()),
      );
    }
  }
}
