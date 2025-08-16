import { SexPlanClass } from "../../plan/_index";
import type { SexPlan } from "../../plan/SexPlan";
import { SexPlanner } from "../SexPlanner";

export class SexPlanner_Random extends SexPlanner {
  constructor(...args: ConstructorParameters<typeof SexPlanner>) {
    super(...args);
  }

  override getNextPlan(): SexPlan {
    return new SexPlanClass.SexPlan_Random(this.unit, this.sex);
  }
}
