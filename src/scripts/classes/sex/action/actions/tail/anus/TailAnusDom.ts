/* TEXT ADOPTED AND MODIFIED FROM LILITH'S THRONE BY INNOXIA:
tailAnus.TAIL_FUCKING_DOM_GENTLE
tailAnus.TAIL_FUCKING_DOM_NORMAL
tailAnus.TAIL_FUCKING_DOM_ROUGH
tailAnus.TAIL_FUCKING_SUB_NORMAL
tailAnus.TAIL_FUCKING_SUB_EAGER
*/

import { TailAnusDomBase } from "./TailAnusBase";

export class TailAnusDom extends TailAnusDomBase {
  getTags() {
    return super.getTags().concat(["dom", "discomfort"]);
  }
  desc() {
    return "Anal tail-fucking";
  }

  rawTitle(sex: SexInstance) {
    return "Tail-fucking";
  }

  rawDescription(sex: SexInstance) {
    return `Continue thrusting your a|tail in and out of b|reps b|anus.`;
  }
}
