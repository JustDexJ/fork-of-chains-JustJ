/* TEXT ADOPTED AND MODIFIED FROM LILITH'S THRONE BY INNOXIA:
tailAnus.TAIL_FUCKING_SUB_RESIST
*/

import { TailAnusDomBaseResist } from "./TailAnusBase";

export class TailAnusDomResist extends TailAnusDomBaseResist {
  getTags() {
    return super.getTags().concat(["normal"]);
  }

  rawTitle(sex: SexInstance) {
    return "Resist tail-fucking";
  }

  rawDescription(sex: SexInstance) {
    return `Try to pull your a|tail out of b|reps b|anus.`;
  }
}
