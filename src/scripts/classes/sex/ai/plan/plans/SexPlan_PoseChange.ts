import { SexConstants } from "../../../SexConstants";
import { PoseChange } from "../../../action/actions/core/PoseChange";
import { PoseChangeOther } from "../../../action/actions/core/PoseChangeOther";
import { SexBodypart } from "../../../bodypart/SexBodypart";
import { SexPlan } from "../SexPlan";

type TargetPoses = {
  my_pose: SexPose;
  target: Unit;
  target_pose: SexPose;
};

/**
 * Get all the possible (my_pose, target_unit, target_pose) combinations
 */
function enumeratePenetrations(
  my_unit: Unit,
  my_bodypart: SexBodypart,
  my_pose: SexPose,
  their_unit: Unit,
  their_bodypart: SexBodypart,
  their_pose: SexPose,
  my_permission: SexPermission,
  sex: SexInstance,
): TargetPoses[] {
  if (!my_bodypart.isCanPenetrate(their_bodypart)) return [];

  const my_position = sex.getPosition(my_unit);
  if (
    sex.getPose(my_unit) != my_pose &&
    !my_pose.isAllowed(my_unit, sex, my_position)
  )
    return [];

  // missing permission case
  if (
    sex.getPose(my_unit) != my_pose &&
    my_permission.getDisallowedTags().includes("poseself")
  )
    return [];

  const their_position = sex.getPosition(their_unit);
  if (
    sex.getPose(their_unit) != their_pose &&
    !their_pose.isAllowed(their_unit, sex, their_position)
  )
    return [];

  // missing permission case again
  if (
    sex.getPose(their_unit) != their_pose &&
    my_permission.getDisallowedTags().includes("poseother")
  )
    return [];

  if (
    !my_bodypart.isCanInteractWith(
      my_position,
      my_pose.getFacingHeight(my_bodypart, my_position, sex),
      their_bodypart,
      their_position,
      their_pose.getFacingHeight(their_bodypart, their_position, sex),
    )
  ) {
    // cannot interact, so no
    return [];
  }

  return [{ my_pose: my_pose, target: their_unit, target_pose: their_pose }];
}

export class SexPlan_PoseChange extends SexPlan {
  tries_remain: number;
  target_config: TargetPoses | null;

  constructor(...args: ConstructorParameters<typeof SexPlan>) {
    super(...args);

    const sexpace_key = this.sex.getPace(this.unit).key;
    this.tries_remain =
      SexConstants.AI_POSE_CHANGE_MAX_ATTEMPTS[
        sexpace_key as keyof typeof SexConstants.AI_POSE_CHANGE_MAX_ATTEMPTS
      ] ?? 1;
    const pace = this.sex.getPace(this.unit);
    const my_permission = this.sex.getPermission(this.unit);

    let poses_candidate: TargetPoses[] = [];
    for (const target of this.sex.getUnits()) {
      if (target == this.unit) continue;
      // try every possible bodypart combination
      for (const my_bodypart of setup.SexClasses.getAllBodyparts()) {
        for (const their_bodypart of setup.SexClasses.getAllBodyparts()) {
          if (
            my_bodypart.isHasBodypart(this.unit, this.sex) &&
            their_bodypart.isHasBodypart(target, this.sex) &&
            (my_bodypart.isCanPenetrate(their_bodypart) ||
              their_bodypart.isCanPenetrate(my_bodypart))
          ) {
            for (const my_pose of setup.SexClasses.getAllPoses()) {
              for (const their_pose of setup.SexClasses.getAllPoses()) {
                // dom will want to penetrate. sub will want to be penetrated. normal wants both.
                let dompaces = [setup.sexpace.dom, setup.sexpace.normal];
                let subpaces = [setup.sexpace.sub, setup.sexpace.normal];
                if (my_bodypart.isSubmissivePenetration(their_bodypart)) {
                  [dompaces, subpaces] = [subpaces, dompaces];
                }
                if (dompaces.includes(pace)) {
                  poses_candidate.push(
                    ...enumeratePenetrations(
                      this.unit,
                      my_bodypart,
                      my_pose,
                      target,
                      their_bodypart,
                      their_pose,
                      my_permission,
                      this.sex,
                    ),
                  );
                }
                if (subpaces.includes(pace)) {
                  poses_candidate.push(
                    ...enumeratePenetrations(
                      target,
                      their_bodypart,
                      my_pose,
                      this.unit,
                      my_bodypart,
                      their_pose,
                      my_permission,
                      this.sex,
                    ),
                  );
                }
              }
            }
          }
        }
      }
    }

    this.target_config = null;

    if (!poses_candidate.length) {
      this.giveUp();
    } else {
      this.target_config = setup.rng.choice(poses_candidate)!;
    }
  }

  override selectAction(actions: SexAction[]): SexAction | null {
    this.tries_remain -= 1;

    const target_config = this.target_config!;

    // change my position
    {
      const want = target_config.my_pose;
      const possible = actions.filter(
        (action) => action instanceof PoseChange && action.getNewPose() == want,
      );
      if (possible.length) return setup.rng.choice(possible);
    }

    // change their position
    {
      const want = target_config.target_pose;
      const possible = actions.filter(
        (action) =>
          action instanceof PoseChangeOther &&
          action.getActorUnit("b") == target_config.target &&
          action.getNewPose() == want,
      );
      if (possible.length) return setup.rng.choice(possible);
    }

    return this.giveUp();
  }

  giveUp() {
    this.tries_remain = 0;
    return null;
  }

  /**
   * Whether the plan has been completed or aborted, and a new plan should be taken
   */
  override isComplete(): boolean {
    if (this.tries_remain == 0) return true;

    const target_config = this.target_config!;
    if (
      this.sex.getPose(this.unit) == target_config.my_pose &&
      this.sex.getPose(target_config.target) == target_config.target_pose
    )
      return true;
    return false;
  }
}
