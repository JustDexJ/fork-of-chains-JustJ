import type { SkillValuesInit } from "../Skill";
import { Trait, type TraitIconSettings } from "./Trait";

export class Perk extends Trait {
  perk_choice_restrictions: Restriction[];
  perk_end_of_week_effect: Cost[];
  perk_null_trait_keys: TraitKey[];
  perk_extra_trait_keys: TraitKey[];

  constructor(
    key: string,
    name: string,
    description: string,
    slave_value: number,
    skill_bonuses: SkillValuesInit,
    tags: string[],
    icon_settings: TraitIconSettings,
    {
      perk_choice_restrictions,
      perk_end_of_week_effect,
      perk_null_traits,
      perk_extra_traits,
    }: {
      perk_choice_restrictions: Restriction[];
      perk_end_of_week_effect: Cost[];
      perk_null_traits?: (Trait | TraitKey)[];
      perk_extra_traits?: (Trait | TraitKey)[];
    },
  ) {
    super(
      key,
      name,
      description,
      slave_value,
      skill_bonuses,
      tags,
      icon_settings,
    );

    this.perk_choice_restrictions = perk_choice_restrictions;
    this.perk_end_of_week_effect = perk_end_of_week_effect;
    this.perk_null_trait_keys = (perk_null_traits || []).map((trait) =>
      resolveKey(trait),
    );
    this.perk_extra_trait_keys = (perk_extra_traits || []).map((trait) =>
      resolveKey(trait),
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
