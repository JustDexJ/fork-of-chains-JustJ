/* TEXT ADOPTED AND MODIFIED FROM LILITH'S THRONE BY INNOXIA:
tongueVagina.RECEIVING_CUNNILINGUS_SUB_RESIST
*/

import { MouthVaginaSubBaseResist } from "./MouthVaginaBase";

export class MouthVaginaSubResist extends MouthVaginaSubBaseResist {
  getTags() {
    return super.getTags().concat(["normal"]);
  }

  rawTitle(sex: SexInstance) {
    return "Resist receiving cunnilingus";
  }

  rawDescription(sex: SexInstance) {
    return `Try and pull your a|vagina away from b|reps tongue.`;
  }
}
