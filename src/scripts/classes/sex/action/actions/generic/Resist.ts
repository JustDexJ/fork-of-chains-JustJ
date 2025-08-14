/* TEXT ADOPTED AND MODIFIED FROM LILITH'S THRONE BY INNOXIA:
  GenericActions.GENERIC_RESIST = new SexAction(
*/

import type { SexInstance } from "../../../engine/SexInstance";
import { SexAction } from "../../SexAction";

export class GenericResist extends SexAction {
  getTags(): string[] {
    return super.getTags().concat(["normal"]);
  }

  getActorDescriptions(): SexActorDescription[] {
    return [
      {
        energy: setup.SexConstants.ENERGY_MEDIUM,
        arousal: -setup.SexConstants.AROUSAL_MEDIUM,
        discomfort: setup.SexConstants.DISCOMFORT_TINY,
        paces: [setup.sexpace.resist],
        restrictions: [
          setup.qres.SexPaceIn([setup.sexpace.resist]),
          setup.qres.Not(setup.qres.SexIsInPenetration()),
        ],
      },
      {
        energy: setup.SexConstants.ENERGY_SMALL,
        discomfort: setup.SexConstants.DISCOMFORT_TINY,
        paces: setup.SexClasses.getAllPaces(),
        restrictions: [
          setup.qres.SexPaceIn([
            setup.sexpace.dom,
            setup.sexpace.sub,
            setup.sexpace.normal,
            setup.sexpace.forced,
          ]),
        ],
      },
    ];
  }

  /**
   * Returns the title of this action, e.g., "Blowjob"
   */
  rawTitle(sex: SexInstance): string {
    return `Resist`;
  }

  /**
   * Short description of this action. E.g., "Put your mouth in their dick"
   */
  rawDescription(sex: SexInstance): string {
    return `Resist having sex with b|rep`;
  }

  /**
   * Returns a string telling a story about this action to be given to the player
   */
  rawStory(sex: SexInstance): string | string[] {
    const unit = this.getActorUnit("a");
    const pose = sex.getPose(unit);
    return pose.repResist(this.getActorUnit("a"), this.getActorUnit("b"), sex);
  }
}
