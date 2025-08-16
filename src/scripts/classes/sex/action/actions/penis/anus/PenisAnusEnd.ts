/* TEXT ADOPTED AND MODIFIED FROM LILITH'S THRONE BY INNOXIA :
PenisVagina.TAIL_FUCKING_STOP
*/

import { PenisHoleEnd } from "../hole/PenisHoleEnd";

export class PenisAnusEnd extends PenisHoleEnd {
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
    return "Stop anal";
  }

  rawDescription(sex: SexInstance) {
    return `Pull your a|dick out of b|reps b|anus and stop fucking b|them.`;
  }
}
