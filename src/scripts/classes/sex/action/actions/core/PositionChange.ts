import type { Unit } from "../../../../unit/Unit";
import { SexBodypart } from "../../../bodypart/SexBodypart";
import type { SexInstance } from "../../../engine/SexInstance";
import type { SexPosition } from "../../../position/SexPosition";
import { SexAction } from "../../SexAction";

// abstract
export abstract class PositionChange extends SexAction {
  getTags() {
    return super.getTags().concat(["positionself", "normal"]);
  }

  /**
   * A little special because of swapping
   */
  isAIAllowed(main_unit: Unit, sex: SexInstance) {
    const swap_with = sex.getUnitAtPosition(this.getNewPosition());
    if (swap_with && swap_with != main_unit) {
      // considered a swap action, so will have harder permission
      const permission = sex.getPermission(main_unit);
      if (permission.getDisallowedTags().includes("positionother"))
        return false;
    }
    return super.isAIAllowed(main_unit, sex);
  }

  /**
   * Change position to this
   */
  getNewPosition(): SexPosition {
    return setup.sexposition.center;
  }

  getActorDescriptions(): SexActorDescription[] {
    return [
      {
        energy: setup.SexConstants.ENERGY_TINY,
        restrictions: [
          setup.qres.Not(setup.qres.SexIsBeingPenetrated()),
          setup.qres.SexPositionCanChangeTo(this.getNewPosition()),
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
    return [setup.qc.SexPositionChange("a", this.getNewPosition())];
  }

  /**
   * Returns the title of this action, e.g., "Blowjob"
   */
  rawTitle(sex: SexInstance): string {
    return `Move to ${this.getNewPosition().getTitle()}`;
  }

  /**
   * Short description of this action. E.g., "Put your mouth in their dick"
   */
  rawDescription(sex: SexInstance): string {
    return `Move to the "${this.getNewPosition().getTitle()}" position`;
  }

  /**
   * Returns a string telling a story about this action to be given to the player
   */
  rawStory(sex: SexInstance): string {
    return PositionChange.describe(
      this.getActorUnit("a"),
      this.getNewPosition(),
      sex,
    );
  }

  static describe(unit: Unit, new_position: SexPosition, sex: SexInstance) {
    const sentences = [];

    if (sex.getPosition(unit) == new_position) return "";

    const swap_with = sex.getUnitAtPosition(new_position);

    // First, remove all ongoing penetrations involving units
    const penetrations = sex.getAllOngoing(unit);
    sentences.push(SexBodypart.describePenetrationEnds(penetrations, sex));
    if (swap_with) {
      sentences.push(
        SexBodypart.describePenetrationEnds(sex.getAllOngoing(swap_with), sex),
      );
    }

    // Next, move unit to new positions
    let swap_pose = new_position.getDefaultPose();
    if (swap_with) swap_pose = sex.getPose(swap_with);
    sentences.push(new_position.describe(unit, sex));

    return sentences.join(" ");
  }
}

export class PositionChangeStand extends PositionChange {
  getNewPosition() {
    return setup.sexposition.front;
  }
}

export class PositionChangeBack extends PositionChange {
  getNewPosition() {
    return setup.sexposition.back;
  }
}

export class PositionChangeCenter extends PositionChange {
  getNewPosition() {
    return setup.sexposition.center;
  }
}

export class PositionChangeTop extends PositionChange {
  getNewPosition() {
    return setup.sexposition.top;
  }
}
