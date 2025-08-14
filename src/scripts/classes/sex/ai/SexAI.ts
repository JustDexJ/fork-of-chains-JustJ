import { TwineClass } from "../../_TwineClass";
import type { Unit } from "../../unit/Unit";
import type { SexAction } from "../action/SexAction";
import type { SexInstance } from "../engine/SexInstance";
import type { SexPlan } from "./plan/SexPlan";
import { SexPlanner } from "./planner/SexPlanner";
import { SexPlanner_Random } from "./planner/planners/SexPlanner_Random";

/**
 * Governs how NPC gets their next action.
 */
export class SexAI extends TwineClass {
  plan: SexPlan | null = null;
  planner: SexPlanner | null = null;

  /**
   * Create an AI for this unit.
   */
  constructor(
    public unit: Unit,
    public sex: SexInstance,
  ) {
    super();

    // create a planner
    if (this.unit.isMindbroken()) {
      this.planner = new SexPlanner_Random(this.unit, this.sex);
    } else {
      const goal = sex.getGoal(unit);
      this.planner = goal.getPlanner(unit, sex);
    }
  }

  _doSelectAction(
    actions: SexAction[],
    unit: Unit,
    sex: SexInstance,
  ): SexAction {
    // If orgasming, it takes priority
    {
      const orgasms = actions.filter((action) =>
        action.getTags().includes("orgasm"),
      );
      if (orgasms.length) {
        return setup.rng.choice(orgasms);
      }
    }

    // If no more energy, chance to end the intercourse
    {
      if (
        sex.isEnergyDepleted(unit) &&
        Math.random() < setup.SexConstants.AI_END_SEX_CHANCE
      ) {
        const end_sex = actions.filter(
          (action) => action instanceof setup.SexActionClass.SexEnd,
        );
        if (end_sex.length) return setup.rng.choice(end_sex);
      }
    }

    // If in great discomfort, also takes priority
    {
      const discomfort = sex.getDiscomfort(unit);
      let chance =
        (discomfort - setup.SexConstants.DISCOMFORT_MIN_TRIGGER) /
        (setup.SexConstants.DISCOMFORT_MAX_TRIGGER -
          setup.SexConstants.DISCOMFORT_MIN_TRIGGER);
      if (!this.unit.isMasochistic() && Math.random() < chance) {
        // Force a relieving action.
        const reliefs = actions.filter(
          (action) => action.getDiscomfort(unit, sex) < 0,
        );
        if (reliefs.length) {
          return setup.rng.sampleArray(
            reliefs.map((action) => [action, -action.getDiscomfort(unit, sex)]),
            /* normalize = */ true,
          )!;
        }
      }
    }

    // If cannot orgasm and arousing is starting to bud, then arousal reducers take priority.
    {
      const arousal = sex.getArousal(unit);
      let chance =
        (arousal - setup.SexConstants.AROUSAL_MIN_TRIGGER) /
        (setup.SexConstants.AROUSAL_MAX_TRIGGER -
          setup.SexConstants.AROUSAL_MIN_TRIGGER);
      if (!this.unit.isCanOrgasm() && Math.random() < chance) {
        // Force an arousal decreasing action
        const reliefs = actions.filter(
          (action) => action.getArousal(unit, sex) < 0,
        );
        if (reliefs.length) {
          return setup.rng.sampleArray(
            reliefs.map((action) => [action, -action.getArousal(unit, sex)]),
            /* normalize = */ true,
          )!;
        }
      }
    }

    // Use planner to pick
    while (!this.plan || this.plan.isComplete()) {
      this.plan = this.planner!.getNextPlan();
    }

    const action = this.plan.selectAction(actions);

    if (action) {
      return action;
    }

    // Do nothing then.
    return actions.filter(
      (action) => action instanceof setup.SexActionClass.DoNothing,
    )[0];
  }

  /**
   * Choose an action out of the given list of possible actions
   * Should take into account: Pace, goal, permissions, unit traits, action history
   */
  selectAction(
    unit: Unit,
    raw_actions: SexAction[],
    sex: SexInstance,
  ): SexAction {
    const goal = sex.getGoal(unit);

    let actions = raw_actions.filter((action) => action.isAIAllowed(unit, sex));
    if (!actions.length)
      throw new Error(`Must have at least one eligible action!`);

    return this._doSelectAction(actions, unit, sex);
  }
}
