/* TEXT ADOPTED AND MODIFIED FROM LILITH'S THRONE BY INNOXIA :
TongueAnus.CUNNILINGUS_START
*/

import type { SexInstance } from "../../../../engine/SexInstance";
import { analEnjoymentDescription } from "../../hole/util";
import { MouthHoleStart } from "../hole/MouthHoleStart";

export class MouthAnusStart extends MouthHoleStart {
  getTags() {
    return super.getTags().concat(["sub"]);
  }
  desc() {
    return "Start anilingus";
  }

  getPenetrationTarget() {
    return setup.sexbodypart.anus;
  }

  getRestrictions() {
    return super
      .getRestrictions()
      .concat([setup.qres.HasItem("sexmanual_bodypart_anus")]);
  }

  rawTitle(sex: SexInstance) {
    return "Start anilingus";
  }

  rawDescription(sex: SexInstance) {
    return `Slide your a|tongue into b|reps b|anus and start performing anilingus.`;
  }

  getExtraDescription(sex: SexInstance): string {
    return analEnjoymentDescription(this.getActorUnit("b"), sex);
  }
}
