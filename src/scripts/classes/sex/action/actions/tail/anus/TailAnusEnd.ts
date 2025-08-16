/* TEXT ADOPTED AND MODIFIED FROM LILITH'S THRONE BY INNOXIA :
TailVagina.TAIL_FUCKING_STOP
*/

import { TailHoleEnd } from "../hole/TailHoleEnd";

export class TailAnusEnd extends TailHoleEnd {
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
    return "Stop tail-fucking anally";
  }

  rawDescription(sex: SexInstance) {
    return `Pull your a|tail out of b|reps b|anus and stop tail-fucking b|them.`;
  }
}
