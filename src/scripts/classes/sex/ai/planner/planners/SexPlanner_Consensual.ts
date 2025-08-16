import { SexConstants } from "../../../SexConstants";
import { SexPlanClass } from "../../plan/_index";
import {
  SexPlan_PositionChangeBack,
  SexPlan_PositionChangeCenter,
  SexPlan_PositionChangeFront,
  SexPlan_PositionChangeTop,
} from "../../plan/plans/SexPlan_PositionChange";
import type { SexPlan } from "../../plan/SexPlan";
import { SexPlanner } from "../SexPlanner";

/**
 * Aims to maximize self pleasure.
 */
class SexPlanner_ConsensualBase extends SexPlanner {
  is_last_orgasm = false;
  plan_count = 0;

  constructor(...args: ConstructorParameters<typeof SexPlanner>) {
    super(...args);
  }

  getSexPlan(): SexPlan {
    return new SexPlanClass.SexPlan_OrgasmSelf(this.unit, this.sex);
  }

  override getNextPlan(): SexPlan {
    this.plan_count += 1;
    if (this.plan_count == 1) {
      if (
        this.sex
          .getPermission(this.unit)
          .getDisallowedTags()
          .includes("positionself")
      ) {
        // cannot change position, abort plan
        this.plan_count += 1;
      } else {
        // position change to a random one.
        const planclass = setup.rng.choice([
          SexPlan_PositionChangeFront,
          SexPlan_PositionChangeCenter,
          SexPlan_PositionChangeBack,
          SexPlan_PositionChangeTop,
        ]);
        return new planclass(this.unit, this.sex);
      }
    }
    if (
      this.plan_count == 2 ||
      (this.is_last_orgasm &&
        Math.random() < SexConstants.AI_POSE_CHANGE_PLAN_CHANCE)
    ) {
      if (
        this.sex
          .getPermission(this.unit)
          .getDisallowedTags()
          .includes("poseself")
      ) {
        // cannot change pose
        this.plan_count += 1;
      } else {
        this.is_last_orgasm = false;
        if (this.sex.getPace(this.unit) == setup.sexpace.dom) {
          // a small chance to change position
          if (Math.random() < SexConstants.AI_POSITION_CHANGE_PLAN_CHANCE) {
            const planclass = setup.rng.choice([
              SexPlan_PositionChangeFront,
              SexPlan_PositionChangeCenter,
              SexPlan_PositionChangeBack,
              SexPlan_PositionChangeTop,
            ]);
            return new planclass(this.unit, this.sex);
          }
        }
        return new SexPlanClass.SexPlan_PoseChange(this.unit, this.sex);
      }
    }

    this.is_last_orgasm = true;
    return this.getSexPlan();
  }
}

/**
 * Aims to maximize self pleasure.
 */
export class SexPlanner_OrgasmSelf extends SexPlanner_ConsensualBase {
  override getSexPlan(): SexPlan {
    return new SexPlanClass.SexPlan_OrgasmSelf(this.unit, this.sex);
  }
}

/**
 * Aims to maximize both pleasure.
 */
export class SexPlanner_OrgasmAll extends SexPlanner_ConsensualBase {
  override getSexPlan(): SexPlan {
    return new SexPlanClass.SexPlan_OrgasmAll(this.unit, this.sex);
  }
}

/**
 * Aims to maximize both pleasure.
 */
export class SexPlanner_OrgasmThem extends SexPlanner_ConsensualBase {
  override getSexPlan(): SexPlan {
    return new SexPlanClass.SexPlan_OrgasmThem(this.unit, this.sex);
  }
}
