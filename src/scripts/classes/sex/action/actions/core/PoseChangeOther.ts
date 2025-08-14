import type { SexInstance } from "../../../engine/SexInstance";
import type { SexPose } from "../../../pose/SexPose";
import { SexAction } from "../../SexAction";
import { PoseChange } from "./PoseChange";

// abstract
export abstract class PoseChangeOther extends SexAction {
  getTags() {
    return super.getTags().concat(["poseother", "pose", "dom"]);
  }

  desc() {
    return `Switch your partner position to: ${this.getNewPose().getTitle()}`;
  }

  getRestrictions() {
    return super.getRestrictions().concat(this.getNewPose().getRestrictions());
  }

  /**
   * Change position to this
   */
  getNewPose(): SexPose {
    return setup.sexpose.stand;
  }

  getActorDescriptions(): SexActorDescription[] {
    return [
      {
        energy: setup.SexConstants.ENERGY_TINY,
        paces: [setup.sexpace.dom, setup.sexpace.normal],
      },
      {
        energy: setup.SexConstants.ENERGY_TINY,
        restrictions: [
          setup.qres.Not(setup.qres.SexIsBeingPenetrated()),
          setup.qres.SexPoseCanChangeTo(this.getNewPose()),
        ],
        paces: [
          setup.sexpace.normal,
          setup.sexpace.sub,
          setup.sexpace.resist,
          setup.sexpace.forced,
          setup.sexpace.mindbroken,
        ],
      },
    ];
  }

  getOutcomes() {
    return [setup.qc.SexPoseChange("b", this.getNewPose())];
  }

  /**
   * Returns the title of this action, e.g., "Blowjob"
   */
  rawTitle(sex: SexInstance): string {
    return this.getNewPose().getTitle();
  }

  /**
   * Short description of this action. E.g., "Put your mouth in their dick"
   */
  rawDescription(sex: SexInstance): string {
    const unit = this.getActorUnit("b");
    return `Switch ${unit.rep()} to the "${this.getNewPose().getTitle()}" stance`;
  }

  /**
   * Returns a string telling a story about this action to be given to the player
   */
  rawStory(sex: SexInstance): string {
    return PoseChange.describe(this.getActorUnit("b"), this.getNewPose(), sex);
  }
}

export class PoseChangeOtherStand extends PoseChangeOther {
  getNewPose() {
    return setup.sexpose.stand;
  }
}

export class PoseChangeOtherKneel extends PoseChangeOther {
  getNewPose() {
    return setup.sexpose.kneel;
  }
}

export class PoseChangeOtherSit extends PoseChangeOther {
  getNewPose() {
    return setup.sexpose.sit;
  }
}

export class PoseChangeOtherAllFours extends PoseChangeOther {
  getNewPose() {
    return setup.sexpose.allfours;
  }
}

export class PoseChangeOtherLieUp extends PoseChangeOther {
  getNewPose() {
    return setup.sexpose.lieup;
  }
}

export class PoseChangeOtherMissionary extends PoseChangeOther {
  getNewPose() {
    return setup.sexpose.missionary;
  }
}

export class PoseChangeOtherCowGirl extends PoseChangeOther {
  getNewPose() {
    return setup.sexpose.cowgirl;
  }
}

export class PoseChangeOtherSixtyNine extends PoseChangeOther {
  getNewPose() {
    return setup.sexpose.sixtynine;
  }
}

export class PoseChangeOtherFaceSit extends PoseChangeOther {
  getNewPose() {
    return setup.sexpose.facesit;
  }
}

export class PoseChangeOtherUpsideDown extends PoseChangeOther {
  getNewPose() {
    return setup.sexpose.upsidedown;
  }
}
