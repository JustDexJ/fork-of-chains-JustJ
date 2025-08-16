import type { SexInstance } from "../../engine/SexInstance";
import { SexAction } from "../SexAction";

// abstract
export abstract class OrgasmBase extends SexAction {
  getTags() {
    return super.getTags().concat(["orgasm", "orgasm_type"]);
  }

  getActorDescriptions(): SexActorDescription[] {
    return [
      {
        restrictions: [setup.qres.SexIsOrgasming()],
        paces: setup.SexClasses.getAllPaces(),
      },
    ];
  }

  getOutcomes() {
    return super.getOutcomes().concat([setup.qc.SexOrgasm("a")]);
  }

  /**
   * Returns the title of this action, e.g., "Blowjob"
   */
  rawTitle(sex: SexInstance): string {
    return `Orgasm`;
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
  rawStory(sex: SexInstance): string {
    return `a|Rep orgasms.`;
  }
}
