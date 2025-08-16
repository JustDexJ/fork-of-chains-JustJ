/* TEXT ADOPTED AND MODIFIED FROM LILITH'S THRONE BY INNOXIA:
tongueVagina.CUNNILINGUS_SUB_RESIST
*/

import { MouthVaginaDomBaseResist } from "./MouthVaginaBase";

export class MouthVaginaDomResist extends MouthVaginaDomBaseResist {
  getTags() {
    return super.getTags().concat(["normal"]);
  }

  rawTitle(sex: SexInstance) {
    return "Resist Cunnilingus";
  }

  rawDescription(sex: SexInstance) {
    return `Try to pull your tongue out of b|reps b|vagina.`;
  }
}
