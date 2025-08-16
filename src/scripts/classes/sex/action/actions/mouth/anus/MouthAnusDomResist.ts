/* TEXT ADOPTED AND MODIFIED FROM LILITH'S THRONE BY INNOXIA:
tongueVagina.CUNNILINGUS_SUB_RESIST
*/

import { MouthAnusDomBaseResist } from "./MouthAnusBase";

export class MouthAnusDomResist extends MouthAnusDomBaseResist {
  getTags() {
    return super.getTags().concat(["normal"]);
  }

  rawTitle(sex: SexInstance) {
    return "Resist anilingus";
  }

  rawDescription(sex: SexInstance) {
    return `Try to pull your tongue out of b|reps b|anus.`;
  }
}
