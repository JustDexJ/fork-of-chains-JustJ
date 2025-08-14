/* TEXT ADOPTED AND MODIFIED FROM LILITH'S THRONE BY INNOXIA :
TongueVagina.RECEIVING_CUNNILINGUS_START
*/

import { MouthHoleStartOther } from "../hole/MouthHoleStartOther";

export class MouthVaginaStartOther extends MouthHoleStartOther {
  getTags() {
    return super.getTags().concat(["dom"]);
  }
  desc() {
    return "Start receiving cunnilingus";
  }

  getPenetrationTarget() {
    return setup.sexbodypart.vagina;
  }

  rawTitle(sex: SexInstance) {
    return `Receive cunnilingus`;
  }

  rawDescription(sex: SexInstance) {
    return `Get b|rep to start licking a|reps a|vagina.`;
  }
}
