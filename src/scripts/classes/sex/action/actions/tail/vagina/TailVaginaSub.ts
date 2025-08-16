/* TEXT ADOPTED AND MODIFIED FROM LILITH'S THRONE BY INNOXIA:
tailVagina.RIDING_TAIL_DOM_GENTLE
tailVagina.RIDING_TAIL_DOM_NORMAL
tailVagina.RIDING_TAIL_DOM_ROUGH
tailVagina.RIDING_TAIL_SUB_NORMAL
tailVagina.RIDING_TAIL_SUB_EAGER
*/

import { TailVaginaSubBase } from "./TailVaginaBase";

export class TailVaginaSub extends TailVaginaSubBase {
  getTags() {
    return super.getTags().concat(["sub"]);
  }
  desc() {
    return "Get tail-fucked";
  }

  rawTitle(sex: SexInstance) {
    return `Tail-fucked`;
  }

  rawDescription(sex: SexInstance) {
    return `Fuck your a|vagina on b|reps b|tail`;
  }
}
