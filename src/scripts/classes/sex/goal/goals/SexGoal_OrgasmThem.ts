import type { SexPlanner } from "../../ai/planner/SexPlanner";
import { SexPlanner_OrgasmThem } from "../../ai/planner/planners/SexPlanner_Consensual";
import { SexGoal } from "../SexGoal";

export class SexGoal_OrgasmThem extends SexGoal {
  constructor() {
    super(
      "orgasmthem",
      [
        /* tags */
      ],
      "Orgasm on them",
      "Will try to satisfy other participants' desires above all",
      2 /* base chance weight */,
      {
        per_lavish: 1,
        per_frugal: -1,
        per_proud: -1,
        per_humble: 1,
        per_cruel: -1,
        per_kind: 1,
        per_masochistic: 5,
        per_dominant: -2,
        per_submissive: 2,
        per_honorable: -1,
        per_evil: -1,
        per_curious: 1,
        per_stubborn: -1,
      },
    );
  }

  override getPlanner(unit: Unit, sex: SexInstance): SexPlanner {
    return new SexPlanner_OrgasmThem(unit, sex);
  }
}
