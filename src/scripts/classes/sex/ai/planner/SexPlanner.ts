import { TwineClassCustom } from "../../../_TwineClass";
import type { Unit } from "../../../unit/Unit";
import type { SexInstance } from "../../engine/SexInstance";
import type { SexPlan } from "../plan/SexPlan";

/**
 * Abstract class. Creates a plan sequence
 */
export abstract class SexPlanner extends TwineClassCustom {
  constructor(
    public unit: Unit,
    public sex: SexInstance,
  ) {
    super();
  }

  override getContainer(): string {
    return `setup.SexPlannerClass`;
  }

  abstract getNextPlan(): SexPlan;
}
