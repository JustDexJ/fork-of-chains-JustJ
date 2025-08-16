/* TEXT ADOPTED AND MODIFIED FROM LILITH'S THRONE BY INNOXIA :
TongueAnus.ANILINGUS_STOP
*/

import { MouthHoleEnd } from "../hole/MouthHoleEnd";

export class MouthAnusEnd extends MouthHoleEnd {
  getTags() {
    return super.getTags().concat(["normal"]);
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
    return "End anilingus";
  }

  rawDescription(sex: SexInstance) {
    return `Pull your tongue out of b|reps b|vagina and stop performing anilingus.`;
  }
}
