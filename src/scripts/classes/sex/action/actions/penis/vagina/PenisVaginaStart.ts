/* TEXT ADOPTED AND MODIFIED FROM LILITH'S THRONE BY INNOXIA :
PenisVagina.TAIL_FUCKING_START
*/

import { PenisHoleStart } from "../hole/PenisHoleStart";

export class PenisVaginaStart extends PenisHoleStart {
  getTags() {
    return super.getTags().concat(["dom"]);
  }
  desc() {
    return "Start fucking";
  }

  getPenetrationTarget() {
    return setup.sexbodypart.vagina;
  }

  rawTitle(sex: SexInstance) {
    return "Start fucking b|rep";
  }

  rawDescription(sex: SexInstance) {
    return `Sink your a|dick into b|reps b|vagina and start fucking b|them.`;
  }
}
