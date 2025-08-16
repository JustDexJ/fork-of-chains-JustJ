/* TEXT ADOPTED AND MODIFIED FROM LILITH'S THRONE BY INNOXIA:
tailAnus.TAIL_FUCKING_SUB_RESIST
*/

import { PenisAnusDomBaseResist } from "./PenisAnusBase";

export class PenisAnusDomResist extends PenisAnusDomBaseResist {
  getTags() {
    return super.getTags().concat(["normal"]);
  }

  rawTitle(sex: SexInstance) {
    return "Resist anal";
  }

  rawDescription(sex: SexInstance) {
    return `Try to pull your a|dick out of b|reps b|anus.`;
  }
}
