/* TEXT ADOPTED AND MODIFIED FROM LILITH'S THRONE BY INNOXIA :
PenisVagina.TAIL_FUCKING_START
*/

import type { SexInstance } from "../../../../engine/SexInstance";
import { analEnjoymentDescription } from "../../hole/util";
import { PenisHoleStart } from "../hole/PenisHoleStart";

export class PenisAnusStart extends PenisHoleStart {
  getTags() {
    return super.getTags().concat(["dom"]);
  }
  desc() {
    return "Start anal";
  }

  getPenetrationTarget() {
    return setup.sexbodypart.anus;
  }

  getRestrictions() {
    return super
      .getRestrictions()
      .concat([setup.qres.HasItem("sexmanual_bodypart_anus")]);
  }

  rawTitle(sex: SexInstance): string {
    return "Start anal";
  }

  rawDescription(sex: SexInstance): string {
    return `Sink your a|dick into b|reps b|anus and start fucking b|them.`;
  }

  getExtraDescription(sex: SexInstance): string {
    let desc = super.getExtraDescription(sex);
    desc += " ";
    desc += analEnjoymentDescription(this.getActorUnit("b"), sex);
    return desc;
  }
}
