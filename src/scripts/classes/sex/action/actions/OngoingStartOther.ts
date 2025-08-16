import type { SexInstance } from "../../engine/SexInstance";
import { OngoingBase } from "./OngoingStart";

// abstract
export abstract class OngoingStartOther extends OngoingBase {
  getTags() {
    return super.getTags().concat(["penetrationstartsub"]);
  }

  getActorDescriptions(): SexActorDescription[] {
    let paces;
    if (this.isDominantSex()) {
      paces = [setup.sexpace.sub, setup.sexpace.normal];
    } else {
      paces = [setup.sexpace.normal, setup.sexpace.dom];
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
        "b",
        this.getPenetratorBodypart(),
        "a",
        this.getPenetrationTarget(),
      ),
    ];
  }

  getOutcomes() {
    return super
      .getOutcomes()
      .concat([
        setup.qc.SexOngoingStart(
          "b",
          this.getPenetratorBodypart(),
          "a",
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
    const my_bp = this.getPenetrationTarget().rep(me, sex);
    const their_bp = this.getPenetratorBodypart().rep(them, sex);

    return `Wrap a|their ${my_bp} around b|their ${their_bp}`;
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
