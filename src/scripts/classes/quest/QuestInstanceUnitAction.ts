import { QuestInstance } from "./QuestInstance";

export class QuestInstanceAllowedInjured extends QuestInstance {
  hasInjuredUnit(): boolean {
    for (const [actor_name, unit] of this.getActorsList()) {
      if (unit && State.variables.hospital.isInjured(unit)) {
        return true;
      }
    }
    return false;
  }

  advanceQuestOneWeek(): void {
    // Check for injuries. If anyone is injured, suspend it.
    if (this.getTeam()) {
      if (!this.hasInjuredUnit()) {
        this.elapsed_week += 1;
      }
    } else {
      super.advanceQuestOneWeek();
    }
  }
}

/**
 * Special quest instance that will choose a multitrain unit action to perform,
 * based on the target traits.
 */
export class QuestInstanceUnitAction extends QuestInstanceAllowedInjured {
  trainee_unit_key: UnitKey;
  target_trait_keys: TraitKey[];

  constructor(
    quest_template: QuestTemplate,
    trainee_unit: Unit,
    target_traits: Trait[],
  ) {
    super(quest_template, { trainee: trainee_unit });

    this.trainee_unit_key = trainee_unit.key;
    this.target_trait_keys = target_traits.map((trait) => trait.key);
  }

  getDescriptionPassage() {
    return `QuestInstanceUnitActionDescriptionPassage`;
  }

  getTargetTraits(): Trait[] {
    return this.target_trait_keys.map((key) => setup.trait[key]);
  }

  getTraineeUnit(): Unit {
    return State.variables.unit[this.trainee_unit_key];
  }

  override finalize(): void {
    super.finalize();

    // find next quest to generate.
    const unit = this.getTraineeUnit();
    const target_traits = this.getTargetTraits();
    const forced_units = Object.keys(this.getTemplate().getUnitCriterias()).map(
      (actor_name) => this.getActorUnit(actor_name),
    );
    setup.UnitActionHelper.generateQuest(unit, target_traits, forced_units);
  }
}
