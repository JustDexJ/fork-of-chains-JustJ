import type { SexInstance } from "../../../engine/SexInstance";
import { OrgasmBase } from "../OrgasmBase";

export class PenisOrgasmBase extends OrgasmBase {
  getTags() {
    return super.getTags().concat(["penis"]);
  }

  rawTitle(sex: SexInstance) {
    return `Masturbate`;
  }

  rawDescription(sex: SexInstance) {
    return `You've reached your climax, and can't hold back your orgasm any longer. Time to masturbate the cum out.`;
  }

  getActorDescriptions(): SexActorDescription[] {
    const desc = super.getActorDescriptions();

    // restrict to penis owners
    desc[0].restrictions!.push(setup.qres.IsCanPhysicallyCum());

    return desc;
  }
}
