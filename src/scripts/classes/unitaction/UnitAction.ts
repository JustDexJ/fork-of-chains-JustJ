import { TwineClass } from "../_TwineClass";
import type { QuestInstance } from "../quest/QuestInstance";
import type { QuestTemplate, QuestTemplateKey } from "../quest/QuestTemplate";
import NoTrait from "../restriction/unit/trait/NoTrait";
import NoTraits from "../restriction/unit/trait/NoTraits";
import type { Trait, TraitKey } from "../trait/Trait";
import type { Unit } from "../unit/Unit";

export interface UnitActionDefinition {
  tags: Array<string>;
  quest_template: QuestTemplate | QuestTemplateKey;
  prerequisites: Restriction[];
  unit_requirements: Restriction<Unit>[];
  /** Whether this training can be used with the multitrain feature. */
  is_multitrain?: boolean;
  result_traits?: TraitKey[];
  prerequisite_traits?: TraitKey[];
  /** whether this training will decrease the trait to achieve the final trait. For flesh-shaping */
  is_decrease?: boolean;
  /** can do this action on injured units? */
  is_allow_injured?: boolean;

  repeat_self?: boolean;
}

export type UnitActionKey = BrandedType<string, "UnitActionKey">;

export class UnitAction extends TwineClass {
  key: UnitActionKey;
  tags: string[];
  quest_template_key: QuestTemplateKey;
  prerequisites: Restriction[];
  unit_requirements: Restriction<Unit>[];
  result_trait_keys: TraitKey[];
  prerequisite_trait_keys: TraitKey[];

  is_decrease: boolean;
  is_multitrain: boolean;
  is_allow_injured: boolean;

  constructor(
    key: string,
    {
      tags,
      quest_template,
      prerequisites,
      unit_requirements,
      result_traits,
      prerequisite_traits,
      is_decrease,
      is_multitrain,
      is_allow_injured,
    }: Readonly<UnitActionDefinition>,
  ) {
    super();

    // assumes quest has an actor named "trainee"
    // name is leftover from previous uses
    if (!key) throw new Error(`null key base for ${key}`);
    this.key = key as UnitActionKey;

    if (!Array.isArray(tags))
      throw new Error(`tags for unitaction ${key} must be an array`);
    this.tags = tags;

    if (!quest_template) throw new Error(`null quest base for ${key}`);
    this.quest_template_key = resolveKey(quest_template);

    const quest_template_obj = setup.questtemplate[this.quest_template_key];
    if (!("trainee" in quest_template_obj.getActorUnitGroups())) {
      throw new Error(
        `actor trainee not found in quest ${this.quest_template_key} in training ${key}`,
      );
    }

    this.prerequisites = prerequisites;
    this.unit_requirements = unit_requirements;

    for (let i = 0; i < unit_requirements.length; ++i) {
      if (!unit_requirements[i]) {
        throw new Error(`${i}-th requirement of training ${key} is blank.`);
      }
    }

    for (let i = 0; i < prerequisites.length; ++i) {
      if (!prerequisites[i]) {
        throw new Error(`${i}-th prerequisites of training ${key} is blank.`);
      }
    }

    this.result_trait_keys = result_traits || [];
    if (this.result_trait_keys.filter((t) => !t).length)
      throw new Error(`Missing result trait for ${this.key}`);

    this.prerequisite_trait_keys = prerequisite_traits || [];
    if (this.prerequisite_trait_keys.filter((t) => !t).length)
      throw new Error(`Missing prerequisite trait for ${this.key}`);

    this.is_decrease = !!is_decrease;
    this.is_multitrain = !!is_multitrain;
    this.is_allow_injured = !!is_allow_injured;

    if (key in setup.unitaction)
      throw new Error(`Training ${this.key} duplicated`);
    setup.unitaction[key as UnitActionKey] = this;
  }

  getTags() {
    return this.tags;
  }

  /**
   * Generate quest. If target_traits is given, will generate chained quests.
   */
  generateQuest(
    unit: Unit,
    target_traits?: Trait[] | null,
    no_auto_assign?: boolean,
  ): QuestInstance {
    const actor_map: ActorUnitMap = {};
    actor_map["trainee"] = unit;

    // finally instantiate the quest
    let newquest;
    if (target_traits) {
      newquest = new setup.QuestInstanceUnitAction(
        this.getTemplate(),
        unit,
        target_traits,
      );
    } else {
      newquest = new setup.QuestInstance(this.getTemplate(), actor_map);
    }
    State.variables.company.player.addQuest(newquest);

    setup.notify(`New quest: ${newquest.rep()}`);

    if (!no_auto_assign && State.variables.settings.unitactionautoassign) {
      setup.QuestAssignHelper.tryAutoAssign(newquest);
    }

    return newquest;
  }

  isAvailable(): boolean {
    return setup.RestrictionLib.isPrerequisitesSatisfied(
      this,
      this.prerequisites,
    );
  }

  isCanTrain(unit: Unit): boolean {
    // if (unit.isBusy()) return false
    if (!this.isAvailable()) return false;
    if (this.is_allow_injured) {
      if (!unit.isHome()) return false;
    } else {
      if (!unit.isAvailable()) return false;
    }
    let restrictions = this.getUnitRequirements();
    if (!setup.RestrictionLib.isUnitSatisfyIncludeDefiancy(unit, restrictions))
      return false;
    return true;
  }

  getName(): string {
    return this.getTemplate().getName();
  }

  getDescriptionPassage(): string {
    return this.getTemplate().getDescriptionPassage();
  }

  getUnitRequirements(): Restriction<Unit>[] {
    return this.unit_requirements;
  }

  getPrerequisites(): Restriction<Unit>[] {
    return this.prerequisites;
  }

  getTemplate(): QuestTemplate {
    return setup.questtemplate[this.quest_template_key];
  }

  /**
   * Whether this unit action is unlocked for this unit.
   */
  isUnlocked(unit: Unit): boolean {
    for (const restriction of this.getPrerequisites()) {
      if (
        restriction instanceof setup.qresImpl.Building &&
        !restriction.isOk()
      ) {
        return false;
      }
    }
    if (
      unit.isDefiant() &&
      !setup.RestrictionLib.isRestrictionsAllowDefiant(
        this.getUnitRequirements(),
      )
    ) {
      return false;
    }
    for (const restriction of this.getUnitRequirements()) {
      if (
        restriction instanceof setup.qresImpl.Building &&
        !restriction.isOk()
      ) {
        return false;
      }
      if (
        restriction instanceof setup.qresImpl.Job &&
        !restriction.isOk(unit)
      ) {
        return false;
      }
      // master training restriction:
      if (restriction instanceof NoTraits && !restriction.isOk(unit)) {
        return false;
      }
      if (
        restriction instanceof NoTrait &&
        restriction.trait_key == setup.trait.training_mindbreak.key &&
        !restriction.isOk(unit)
      ) {
        return false;
      }
    }
    // no trait to gain:
    if (this.isMultiTrain() && !this.getFinalTraits(unit).length) {
      return false;
    }

    return true;
  }

  isHidden(unit: Unit): boolean {
    if (!this.isUnlocked(unit)) return true;

    // missing prerequisite from the same trait group
    const banned_groups = this.getResultTraits()
      .map((trait) => trait.getTraitGroup())
      .filter((tg) => tg);
    for (const prereq of this.getRequiredTraits()) {
      if (banned_groups.includes(prereq.getTraitGroup())) {
        if (!unit.isHasTrait(prereq)) {
          return true;
        }
      }
    }

    return false;
  }

  isMultiTrain(): boolean {
    return this.is_multitrain;
  }

  isDecreaseTrait(): boolean {
    return this.is_decrease;
  }

  /**
   * If unit go on this training, will they get closer to their target traits?
   */
  isPartOfTraining(unit: Unit, target_traits: Trait[]): boolean {
    const final_traits = this.getFinalTraits(unit);
    for (const target of target_traits) {
      if (unit.isHasTraitExact(target)) {
        // already achieve this target
        continue;
      }

      const trait_group = target.getTraitGroup();
      for (const will_get of final_traits) {
        if (trait_group) {
          if (trait_group == will_get.getTraitGroup()) {
            const current_trait = unit.getTraitFromTraitGroup(trait_group);
            const current_index = trait_group._getTraitIndex(current_trait);
            const target_index = trait_group._getTraitIndex(target);

            if (
              (target_index - current_index) *
                (this.isDecreaseTrait() ? -1 : 1) >
              0
            ) {
              // on the correct direction
              return true;
            }
          }
        } else {
          if (will_get == target) return true;
        }
      }
    }

    return false;
  }

  /**
   * Return list of traits that this unit action can possibly bestow upon its targets.
   */
  getFinalTraits(unit: Unit): Trait[] {
    const raw_traits = this.getResultTraits();
    const res = [];
    for (const will_get of raw_traits) {
      if (!unit.isTraitCompatible(will_get)) continue;
      if (this.isDecreaseTrait()) {
        const trait_group = will_get.getTraitGroup();
        if (!trait_group)
          throw new Error(`Missing trait group from trait: ${will_get.key}`);
        const current_trait = unit.getTraitFromTraitGroup(trait_group);
        const my_index = trait_group._getTraitIndex(current_trait);
        const target_index = trait_group._getTraitIndex(will_get);
        if (target_index < my_index) {
          res.push(will_get);
        }
      } else {
        if (!unit.isHasTrait(will_get)) res.push(will_get);
      }
    }
    return res;
  }

  /**
   * Get list of traits this quest could possibly bestow at the end.
   */
  getResultTraits(): Trait[] {
    return this.result_trait_keys.map((key) => setup.trait[key]);
  }

  /**
   * Return list of traits from OTHER TRAININGS that is required to gain this.
   */
  getRequiredTraits(): Trait[] {
    return this.prerequisite_trait_keys.map(
      (trait_key) => setup.trait[trait_key],
    );
  }
}
