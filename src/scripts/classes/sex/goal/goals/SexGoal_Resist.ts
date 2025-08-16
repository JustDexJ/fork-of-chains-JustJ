import { SexPlanner_Random } from "../../ai/planner/planners/SexPlanner_Random";
import type { SexPlanner } from "../../ai/planner/SexPlanner";
import { SexGoal } from "../SexGoal";

export class SexGoal_Resist extends SexGoal {
  constructor() {
    super(
      "resist",
      [
        /* tags */
      ],
      "Resist",
      "Will try to resist getting penetrated",
      0 /* base chance weight */,
      {
        per_lunatic: 2,
      },
    );
  }

  override getPlanner(unit: Unit, sex: SexInstance): SexPlanner {
    return new SexPlanner_Random(unit, sex);
  }
}
