/* TEXT ADOPTED AND MODIFIED FROM LILITH'S THRONE BY INNOXIA:
tongueVagina.RECEIVING_CUNNILINGUS_SUB_RESIST
*/

import { MouthAnusSubBaseResist } from "./MouthAnusBase";

export class MouthAnusSubResist extends MouthAnusSubBaseResist {
  getTags() {
    return super.getTags().concat(["normal"]);
  }

  rawTitle(sex: SexInstance) {
    return "Resist receiving anilingus";
  }

  rawDescription(sex: SexInstance) {
    return `Try and pull your a|anus away from b|reps tongue.`;
  }
}
