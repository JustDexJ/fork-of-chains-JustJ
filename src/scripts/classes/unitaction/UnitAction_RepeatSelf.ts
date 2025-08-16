import { UnitAction, type UnitActionInit } from "./UnitAction";

/** Repeatedly purifies the unit. */
export class UnitAction_RepeatSelf extends UnitAction {
  constructor(args: UnitActionInit) {
    super(args);
  }

  getName() {
    return `${super.getName()} (Repeated)`;
  }

  getDescriptionPassage() {
    return `QuestInstanceUnitActionRepeatSelfPassage`;
  }

  /**
   * Generate quest. If target_traits is given, will generate chained quests.
   * @param target_traits - not used
   */
  generateQuest(
    unit: Unit,
    target_traits?: Trait[],
    no_auto_assign?: boolean,
  ): QuestInstance {
    // finally instantiate the quest
    const newquest = new setup.QuestInstanceUnitActionRepeatSelf(
      this.getTemplate(),
      unit,
      this,
    );

    State.variables.company.player.addQuest(newquest);
    setup.notify(`New quest: ${newquest.rep()}`);

    if (!no_auto_assign && State.variables.settings.unitactionautoassign) {
      setup.QuestAssignHelper.tryAutoAssign(newquest);
    }

    return newquest;
  }
}
