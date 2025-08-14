import { SexBodypart } from "../../../bodypart/SexBodypart";
import type { SexInstance } from "../../../engine/SexInstance";
import { SexAction } from "../../SexAction";

// abstract
export abstract class PoseChange extends SexAction {
  getTags() {
    return super.getTags().concat(["poseself", "pose", "normal"]);
  }

  desc() {
    return this.getNewPose().getTitle();
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
        restrictions: [
          setup.qres.Not(setup.qres.SexIsBeingPenetrated()),
          setup.qres.SexPoseCanChangeTo(this.getNewPose()),
        ],
        paces: [
          setup.sexpace.dom,
          setup.sexpace.normal,
          setup.sexpace.sub,
          setup.sexpace.forced,
          setup.sexpace.resist,
        ],
      },
    ];
  }

  getOutcomes() {
    return [setup.qc.SexPoseChange("a", this.getNewPose())];
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
    return `Move and switch to the "${this.getNewPose().getTitle()}" stance`;
  }

  /**
   * Returns a string telling a story about this action to be given to the player
   */
  rawStory(sex: SexInstance): string {
    return PoseChange.describe(this.getActorUnit("a"), this.getNewPose(), sex);
  }

  static describe(unit: Unit, pose: SexPose, sex: SexInstance) {
    // two parts. First, remove all ongoing penetrations. Then, switch pose.
    const sentences = [];

    sentences.push(
      SexBodypart.describePenetrationEnds(sex.getAllOngoing(unit), sex),
    );

    // now switch pose
    sentences.push(pose.describe(unit, sex));
    return sentences.join(" ");
  }
}

export class PoseChangeStand extends PoseChange {
  getNewPose() {
    return setup.sexpose.stand;
  }
}

export class PoseChangeKneel extends PoseChange {
  getNewPose() {
    return setup.sexpose.kneel;
  }
}

export class PoseChangeSit extends PoseChange {
  getNewPose() {
    return setup.sexpose.sit;
  }
}

export class PoseChangeAllFours extends PoseChange {
  getNewPose() {
    return setup.sexpose.allfours;
  }
}

export class PoseChangeLieUp extends PoseChange {
  getNewPose() {
    return setup.sexpose.lieup;
  }
}

export class PoseChangeMissionary extends PoseChange {
  getNewPose() {
    return setup.sexpose.missionary;
  }
}

export class PoseChangeCowGirl extends PoseChange {
  getNewPose() {
    return setup.sexpose.cowgirl;
  }
}

export class PoseChangeSixtyNine extends PoseChange {
  getNewPose() {
    return setup.sexpose.sixtynine;
  }
}

export class PoseChangeFaceSit extends PoseChange {
  getNewPose() {
    return setup.sexpose.facesit;
  }
}

export class PoseChangeUpsideDown extends PoseChange {
  getNewPose() {
    return setup.sexpose.upsidedown;
  }
}
