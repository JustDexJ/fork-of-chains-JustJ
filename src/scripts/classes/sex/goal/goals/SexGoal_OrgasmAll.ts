import type { SexPlanner } from "../../ai/planner/SexPlanner";
import { SexPlanner_OrgasmAll } from "../../ai/planner/planners/SexPlanner_Consensual";
import { SexGoal } from "../SexGoal";

export class SexGoal_OrgasmAll extends SexGoal {
  constructor() {
    super(
      "orgasmall",
      [
        /* tags */
      ],
      "Orgasm on all",
      "Will try to make all participants reach orgasm",
      2 /* base chance weight */,
      {
        per_gregarious: 1,
        per_loner: -1,
        per_lavish: 1,
        per_frugal: -1,
        per_proud: -1,
        per_humble: 1,
        per_cruel: -1,
        per_kind: 1,
        per_masochistic: -5,
        per_loyal: 1,
        per_independent: -1,
        per_dominant: -1,
        per_submissive: -1,
        per_honorable: 2,
        per_evil: -2,
      },
    );
  }

  override getPlanner(unit: Unit, sex: SexInstance): SexPlanner {
    return new SexPlanner_OrgasmAll(unit, sex);
  }
}
