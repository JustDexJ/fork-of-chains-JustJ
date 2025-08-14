/* TEXT ADOPTED AND MODIFIED FROM LILITH'S THRONE BY INNOXIA :
PenisVagina.FUCKED_STOP
*/

import { PenisHoleEndOther } from "../hole/PenisHoleEndOther";

export class PenisAnusEndOther extends PenisHoleEndOther {
  getTags() {
    return super.getTags().concat(["dom"]);
  }

  getPenetrationTarget() {
    return setup.sexbodypart.anus;
  }

  getRestrictions() {
    return super
      .getRestrictions()
      .concat([setup.qres.HasItem("sexmanual_bodypart_anus")]);
  }

  rawTitle(sex: SexInstance) {
    return `Stop getting anally fucked`;
  }

  rawDescription(sex: SexInstance) {
    return `Get b|rep to pull b|their b|dick out of your a|anus.`;
  }
}
