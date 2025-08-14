import type { SexInstance } from "../../engine/SexInstance";
import { OngoingBase } from "./OngoingStart";

// abstract
export abstract class OngoingEnd extends OngoingBase {
  getActorDescriptions(): SexActorDescription[] {
    return [
      {
        energy: setup.SexConstants.ENERGY_TINY,
        paces: [
          setup.sexpace.dom,
          setup.sexpace.normal,
          setup.sexpace.sub,
          setup.sexpace.forced,
        ],
      },
      {
        energy: setup.SexConstants.ENERGY_TINY,
        paces: setup.SexClasses.getAllPaces(),
      },
    ];
  }

  getRestrictions(): Restriction[] {
    return [
      setup.qres.SexIsOngoing(
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
      .concat([setup.qc.SexOngoingEnd("a", this.getPenetratorBodypart())]);
  }

  /**
   * Returns the title of this action, e.g., "Blowjob"
   */
  rawTitle(sex: SexInstance): string {
    const me = this.getActorUnit("a");
    const my_bp = this.getPenetratorBodypart();
    const them = this.getActorUnit("b");
    const their_bp = this.getPenetrationTarget();

    return `Withdraw a|their ${my_bp.rep(me, sex)} from b|their ${their_bp.rep(them, sex)}`;
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
    const my_bp = this.getPenetratorBodypart();
    const them = this.getActorUnit("b");
    const their_bp = this.getPenetrationTarget();
    return my_bp.describeEnd(me, them, their_bp, sex);
  }
}
