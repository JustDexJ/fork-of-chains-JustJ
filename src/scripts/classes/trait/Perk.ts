import { Trait, type TraitDefinition } from "./Trait";

export interface PerkDefinition extends TraitDefinition {
  perk_choice_restrictions: Restriction[] | (() => Restriction[]);
  perk_end_of_week_effect: Cost[] | (() => Cost[]);
  perk_null_traits?: /*(Trait | TraitKey)[] |*/ () => (Trait | TraitKey)[];
  perk_extra_traits?: /*(Trait | TraitKey)[] |*/ () => (Trait | TraitKey)[];
}

export class Perk extends Trait {
  perk_choice_restrictions: Restriction[] | (() => Restriction[]);
  perk_end_of_week_effect: Cost[] | (() => Cost[]);
  perk_null_trait_keys: TraitKey[];
  perk_extra_trait_keys: TraitKey[];

  constructor(key: string, def: Readonly<PerkDefinition>) {
    super(key, def);

    this.perk_choice_restrictions = def.perk_choice_restrictions;
    this.perk_end_of_week_effect = def.perk_end_of_week_effect;

    const perk_null_traits =
      typeof def.perk_null_traits === "function"
        ? def.perk_null_traits()
        : def.perk_null_traits;
    this.perk_null_trait_keys = (perk_null_traits || []).map((trait) =>
      resolveKey(trait),
    );

    const perk_extra_traits =
      typeof def.perk_extra_traits === "function"
        ? def.perk_extra_traits()
        : def.perk_extra_traits;
    this.perk_extra_trait_keys = (perk_extra_traits || []).map((trait) =>
      resolveKey(trait),
    );
  }

  getPerkChoiceRestrictions(): Restriction[] {
    return typeof this.perk_choice_restrictions === "function"
      ? this.perk_choice_restrictions()
      : this.perk_choice_restrictions;
  }

  getEndOfWeekEffect(): Cost[] {
    return typeof this.perk_end_of_week_effect === "function"
      ? this.perk_end_of_week_effect()
      : this.perk_end_of_week_effect;
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
