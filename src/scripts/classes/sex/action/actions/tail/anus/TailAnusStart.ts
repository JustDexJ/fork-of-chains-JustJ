/* TEXT ADOPTED AND MODIFIED FROM LILITH'S THRONE BY INNOXIA :
TailVagina.TAIL_FUCKING_START
*/

import type { SexInstance } from "../../../../engine/SexInstance";
import { analEnjoymentDescription } from "../../hole/util";
import { TailHoleStart } from "../hole/TailHoleStart";

export class TailAnusStart extends TailHoleStart {
  getTags() {
    return super.getTags().concat(["dom"]);
  }
  desc() {
    return "Start anal tail-fucking";
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
    return "Start anal tail-fucking";
  }

  rawDescription(sex: SexInstance) {
    return `Sink your a|tail into b|reps b|anus and start tail-fucking b|them.`;
  }

  getExtraDescription(sex: SexInstance): string {
    let desc = super.getExtraDescription(sex);
    desc += " ";
    desc += analEnjoymentDescription(this.getActorUnit("b"), sex);
    return desc;
  }
}
