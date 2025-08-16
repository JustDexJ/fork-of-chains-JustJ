/* TEXT ADOPTED AND MODIFIED FROM LILITH'S THRONE BY INNOXIA :
TailVagina.TAIL_FUCKING_STOP
*/

import { TailHoleEnd } from "../hole/TailHoleEnd";

export class TailVaginaEnd extends TailHoleEnd {
  getTags() {
    return super.getTags().concat(["normal"]);
  }

  getPenetrationTarget() {
    return setup.sexbodypart.vagina;
  }

  rawTitle(sex: SexInstance) {
    return "Stop tail-fucking vaginally";
  }

  rawDescription(sex: SexInstance) {
    return `Pull your a|tail out of b|reps b|vagina and stop tail-fucking b|them.`;
  }
}
