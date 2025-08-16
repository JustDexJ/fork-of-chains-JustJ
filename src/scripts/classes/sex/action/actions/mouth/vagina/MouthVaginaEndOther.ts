/* TEXT ADOPTED AND MODIFIED FROM LILITH'S THRONE BY INNOXIA :
TongueVagina.RECEIVING_CUNNILINGUS_STOP
*/

import { MouthHoleEndOther } from "../hole/MouthHoleEndOther";

export class MouthVaginaEndOther extends MouthHoleEndOther {
  getTags() {
    return super.getTags().concat(["dom"]);
  }

  getPenetrationTarget() {
    return setup.sexbodypart.vagina;
  }

  rawTitle(sex: SexInstance) {
    return `Stop receiving cunnilingus`;
  }

  rawDescription(sex: SexInstance) {
    return `Get b|rep to pull b|their tongue out of your a|vagina.`;
  }
}
