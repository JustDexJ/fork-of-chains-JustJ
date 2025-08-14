import type { SexInstance } from "../../../engine/SexInstance";
import type { SexPosition } from "../../../position/SexPosition";
import { SexAction } from "../../SexAction";
import { PositionChange } from "./PositionChange";

// abstract
export abstract class PositionChangeOther extends SexAction {
  getTags() {
    return super.getTags().concat(["positionother", "dom"]);
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
        paces: [setup.sexpace.dom, setup.sexpace.normal],
      },
      {
        energy: setup.SexConstants.ENERGY_TINY,
        restrictions: [
          setup.qres.Not(setup.qres.SexIsBeingPenetrated()),
          setup.qres.SexPositionCanChangeTo(this.getNewPosition()),
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
    return [setup.qc.SexPositionChange("b", this.getNewPosition())];
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
    const unit = this.getActorUnit("b");
    return `Move ${unit.rep()} to the "${this.getNewPosition().getTitle()}" position`;
  }

  /**
   * Returns a string telling a story about this action to be given to the player
   */
  rawStory(sex: SexInstance): string {
    return PositionChange.describe(
      this.getActorUnit("b"),
      this.getNewPosition(),
      sex,
    );
  }
}

export class PositionChangeOtherStand extends PositionChangeOther {
  getNewPosition() {
    return setup.sexposition.front;
  }
}

export class PositionChangeOtherBack extends PositionChangeOther {
  getNewPosition() {
    return setup.sexposition.back;
  }
}

export class PositionChangeOtherCenter extends PositionChangeOther {
  getNewPosition() {
    return setup.sexposition.center;
  }
}

export class PositionChangeOtherTop extends PositionChangeOther {
  getNewPosition() {
    return setup.sexposition.top;
  }
}
