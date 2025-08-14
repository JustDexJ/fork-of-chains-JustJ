import { TwineClassCustom } from "../../../_TwineClass";
import type { Unit } from "../../../unit/Unit";
import type { SexAction } from "../../action/SexAction";
import type { SexInstance } from "../../engine/SexInstance";

/**
 * Abstract class. Governs a particular plan for a unit.
 */
export abstract class SexPlan extends TwineClassCustom {
  /**
   * Create an AI for this unit.
   */
  constructor(
    public unit: Unit,
    public sex: SexInstance,
  ) {
    super();
  }

  override getContainer(): string {
    return `setup.SexPlanClass`;
  }

  /**
   * Select an action out of the given choice, if any compatible plan is found.
   */
  selectAction(actions: SexAction[]): SexAction | null {
    return null;
  }

  /**
   * Whether the plan has been completed or aborted, and a new plan should be taken
   */
  isComplete(): boolean {
    return false;
  }
}
