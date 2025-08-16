import type { SexFacing } from "./facing/SexFacing";
import type { SexGoal } from "./goal/SexGoal";
import type { SexHeight } from "./height/SexHeight";
import type { SexLocation } from "./location/SexLocation";
import { SexLocation_Bedchamber } from "./location/locations/SexLocation_Bedchamber";

export namespace SexClasses {
  export function getAllPaces(): SexPace[] {
    return Object.values(setup.sexpace);
  }

  export function getAllPositions(): SexPosition[] {
    return Object.values(setup.sexposition);
  }

  export function getAllPoses(): SexPose[] {
    return Object.values(setup.sexpose).filter((pose) => pose.isUnlocked());
  }

  export function getAllPermissions(): SexPermission[] {
    return Object.values(setup.sexpermission);
  }

  export function getAllHeights(): SexHeight[] {
    return Object.values(setup.sexheight);
  }

  export function getAllGoals(): SexGoal[] {
    return Object.values(setup.sexgoal);
  }

  export function getAllFacings(): SexFacing[] {
    return Object.values(setup.sexfacing);
  }

  export function getAllBodyparts(): SexBodypart[] {
    return Object.values(setup.sexbodypart);
  }

  export function getAllSexActions(): {
    new (units: Unit[], sex: SexInstance): SexAction;
  }[] {
    return Object.values(setup.SexActionClass) as unknown as Array<{
      new (units: Unit[], sex: SexInstance): SexAction;
    }>;
  }

  export function getAllLocations(): SexLocation[] {
    const base: SexLocation[] = Object.values(setup.sexlocation);

    for (const bedchamber of Object.values(State.variables.bedchamber)) {
      base.push(new SexLocation_Bedchamber(bedchamber, /* high = */ true));
      base.push(new SexLocation_Bedchamber(bedchamber, /* high = */ false));
    }

    return base;
  }

  export function getAllAllowedLocations(sex: SexInstance): SexLocation[] {
    return getAllLocations().filter((location) => location.isAllowed(sex));
  }
}
