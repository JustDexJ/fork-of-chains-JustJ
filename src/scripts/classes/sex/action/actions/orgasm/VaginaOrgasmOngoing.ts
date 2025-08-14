/* TEXT ADOPTED AND MODIFIED FROM LILITH'S THRONE BY INNOXIA :
GenericOrgasms
*/

import type { SexBodypart } from "../../../bodypart/SexBodypart";
import type { SexInstance } from "../../../engine/SexInstance";
import { VaginaOrgasm } from "./VaginaOrgasm";

export class VaginaOrgasmOngoing extends VaginaOrgasm {
  getTags() {
    return super.getTags().concat([this.getPenetratorBodypart().getTag()]);
  }

  getPenetratorBodypart(): SexBodypart {
    return setup.sexbodypart.penis;
  }

  getPenetrationTarget(): SexBodypart {
    return setup.sexbodypart.vagina;
  }

  /**
   * Get additional restrictions with this sex actions
   */
  getRestrictions(): Restriction[] {
    return [
      setup.qres.SexIsOngoing(
        "b",
        this.getPenetratorBodypart(),
        "a",
        this.getPenetrationTarget(),
      ),
    ];
  }

  getActorDescriptions(): SexActorDescription[] {
    const desc = super.getActorDescriptions();

    // add the target as an actor for convenience
    desc.push({
      paces: setup.SexClasses.getAllPaces(),
      restrictions: [],
    });

    return desc;
  }

  describeOrgasm(sex: SexInstance): string {
    const me = this.getActorUnit("a");
    const them = this.getActorUnit("b");

    let story = "";

    const their_pace = sex.getPace(them);

    const dick = this.getPenetratorBodypart().rep(them, sex);
    const tip = this.getPenetratorBodypart().repTip(them, sex);
    const fuck = this.getPenetratorBodypart().repFuck(them, sex);

    let t;
    if (their_pace == setup.sexpace.resist) {
      t = [
        ` b|Rep panickedly b|try to pull b|their ${dick} from inside your a|vagina, which only elicit
          pleasurable sensation of having it graze through a|reps vaginal muscles, `,
        ` Seeing the incoming orgasm, b|rep panickedly b|quiver in fear with b|their ${dick} still inside
          a|their a|vagina, which only gives pleasurable sensation, `,
      ];
    } else if (their_pace == setup.sexpace.mindbroken) {
      t = [
        ` Since b|rep is mindbroken, a|rep a|have to work the ${dick} a|themself, `,
        ` As b|rep is completely unresponsve, a|rep a|work the ${dick} a|themself by moving a|themself up and down, `,
      ];
    } else {
      story += ` b|Rep carries on ${fuck}ing a|reps vagina through a|their orgasm, `;
    }
    story += ` causing a|them to let out a series of high-pitched moans as a|their vaginal muscles grip and squeeze around the intruding ${dick}.`;

    return story;
  }
}
