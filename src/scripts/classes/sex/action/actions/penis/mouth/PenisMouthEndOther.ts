/* TEXT ADOPTED AND MODIFIED FROM LILITH'S THRONE BY INNOXIA : GIVING_BLOWJOB_STOP */

import type { SexBodypart } from "../../../../bodypart/SexBodypart";
import { PenisHoleEndOther } from "../hole/PenisHoleEndOther";
import { getPenisMouthEndText } from "./PenisMouthEnd";

export class PenisMouthEndOther extends PenisHoleEndOther {
  getTags() {
    return super.getTags().concat(["dom"]);
  }

  getPenetrationTarget(): SexBodypart {
    return setup.sexbodypart.mouth;
  }

  rawTitle(sex: SexInstance) {
    return `Stop blowjob`;
  }

  rawDescription(sex: SexInstance) {
    return `Take b|reps b|dick out of your mouth and stop giving b|them a blowjob.`;
  }

  rawStory(sex: SexInstance) {
    const me = this.getActorUnit("a");
    const them = this.getActorUnit("b");
    return getPenisMouthEndText(them, me, sex);
  }
}
