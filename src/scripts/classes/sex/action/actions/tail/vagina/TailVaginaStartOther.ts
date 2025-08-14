/* TEXT ADOPTED AND MODIFIED FROM LILITH'S THRONE BY INNOXIA :
TailVagina.USING_TAIL_START
*/

import { TailHoleStartOther } from "../hole/TailHoleStartOther";

export class TailVaginaStartOther extends TailHoleStartOther {
  getTags() {
    return super.getTags().concat(["sub"]);
  }
  desc() {
    return "Start getting tail-fucked";
  }

  getPenetrationTarget() {
    return setup.sexbodypart.vagina;
  }

  rawTitle(sex: SexInstance) {
    return `Get vaginally tail-fucked`;
  }

  rawDescription(sex: SexInstance) {
    return `Slide b|reps b|tail into your a|vagina and get tail-fucked.`;
  }
}
