import { QuestAssignHelper } from "../../util/questassign";
import type { UnitAction, UnitActionKey } from "../unitaction/UnitAction";
import { QuestInstanceAllowedInjured } from "./QuestInstanceUnitAction";

/**
 * Special quest instance that will repeatedly purify a unit until it is fully cleansed.
 */
export class QuestInstanceUnitActionRepeatSelf extends QuestInstanceAllowedInjured {
  trainee_unit_key: UnitKey;
  unit_action_key: UnitActionKey;

  constructor(
    quest_template: QuestTemplate,
    trainee_unit: Unit,
    unit_action: UnitAction,
  ) {
    super(quest_template, { trainee: trainee_unit });

    this.trainee_unit_key = trainee_unit.key;
    this.unit_action_key = unit_action.key;
  }

  getDescriptionPassage(): string {
    return `QuestInstanceUnitActionRepeatSelfPassage`;
  }

  getTraineeUnit(): Unit {
    return State.variables.unit[this.trainee_unit_key];
  }

  getUnitAction(): UnitAction {
    return setup.unitaction[this.unit_action_key];
  }

  override finalize(): void {
    super.finalize();

    const unit_action = this.getUnitAction();
    const trainee = this.getTraineeUnit();
    if (unit_action.isCanTrain(trainee)) {
      // can re-train, so do it with the exact same actors.

      const quest = unit_action.generateQuest(
        trainee,
        null,
        /* no auto assign =*/ true,
      );

      // Assign the same team, if possible.
      if (
        State.variables.company.player.isCanDeployTeam() &&
        quest.isCostsSatisfied()
      ) {
        const assignment: ActorUnitKeyMap = {};
        for (const actor_name in this.getTemplate().getUnitCriterias()) {
          assignment[actor_name] = this.getActorUnit(actor_name).key;
        }

        // assign the team
        QuestAssignHelper.doFinalize(quest, assignment);
      } else {
        setup.notify(`Unable to assign team automatically for a|reps quest.`, {
          a: trainee,
        });
      }
    } else {
      setup.notify(`No more actions for a|rep.`, { a: trainee });
    }
  }
}
