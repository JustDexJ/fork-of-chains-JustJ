import type { SexBodypart } from "../../bodypart/SexBodypart";
import type { SexInstance } from "../../engine/SexInstance";
import { SexAction } from "../SexAction";

export class OngoingBase extends SexAction {
  getTags() {
    const base = super
      .getTags()
      .concat([
        "penetration",
        this.getPenetratorBodypart().getTag(),
        this.getPenetrationTarget().getTag(),
      ]);
    return base;
  }

  getPenetratorBodypart(): SexBodypart {
    return setup.sexbodypart.penis;
  }

  getPenetrationTarget(): SexBodypart {
    return setup.sexbodypart.mouth;
  }

  /**
   * Whether this is a dominant-initiated sex.
   */
  isDominantSex(): boolean {
    return !this.getPenetratorBodypart().isSubmissivePenetration(
      this.getPenetrationTarget(),
    );
  }
}

// abstract
export abstract class OngoingStart extends OngoingBase {
  getTags() {
    return super.getTags().concat(["penetrationstartdom"]);
  }

  getActorDescriptions(): SexActorDescription[] {
    let paces;
    if (this.isDominantSex()) {
      paces = [setup.sexpace.dom, setup.sexpace.normal];
    } else {
      paces = [setup.sexpace.normal, setup.sexpace.sub];
    }
    return [
      {
        energy: setup.SexConstants.ENERGY_TINY,
        paces: paces,
        restrictions: [],
      },
      {
        energy: setup.SexConstants.ENERGY_TINY,
        paces: setup.SexClasses.getAllPaces(),
        restrictions: [],
      },
    ];
  }

  getRestrictions(): Restriction[] {
    return [
      setup.qres.SexBodypartsCanInteract(
        "a",
        this.getPenetratorBodypart(),
        "b",
        this.getPenetrationTarget(),
      ),
    ];
  }

  getOutcomes() {
    return super
      .getOutcomes()
      .concat([
        setup.qc.SexOngoingStart(
          "a",
          this.getPenetratorBodypart(),
          "b",
          this.getPenetrationTarget(),
        ),
      ]);
  }

  /**
   * Returns the title of this action, e.g., "Blowjob"
   */
  rawTitle(sex: SexInstance): string {
    const me = this.getActorUnit("a");
    const them = this.getActorUnit("b");
    const my_bp = this.getPenetratorBodypart().rep(me, sex);
    const their_bp = this.getPenetrationTarget().rep(them, sex);

    return `Put a|their ${my_bp} in b|their ${their_bp}`;
  }

  /**
   * Short description of this action. E.g., "Put your mouth in their dick"
   */
  rawDescription(sex: SexInstance): string {
    return this.rawTitle(sex);
  }

  /**
   * Returns a string telling a story about this action to be given to the player
   */
  rawStory(sex: SexInstance): string | string[] {
    const me = this.getActorUnit("a");
    const them = this.getActorUnit("b");
    return "";
  }
}
