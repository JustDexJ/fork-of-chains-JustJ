import type { SexInstance } from "../../../engine/SexInstance";
import { SexAction } from "../../SexAction";

export class SexEnd extends SexAction {
  getTags() {
    return super.getTags().concat(["endsex", "normal"]);
  }

  getActorDescriptions() {
    return [
      {
        paces: [
          setup.sexpace.dom,
          setup.sexpace.normal,
          setup.sexpace.sub,
          setup.sexpace.forced,
          setup.sexpace.resist,
        ],
      },
    ];
  }

  /**
   * Get additional outcomes with this sex actions
   */
  getOutcomes(): Cost[] {
    return super.getOutcomes().concat([setup.qc.SexEnd()]);
  }

  /**
   * Returns the title of this action, e.g., "Blowjob"
   */
  rawTitle(sex: SexInstance): string {
    return "End sex";
  }

  /**
   * Short description of this action. E.g., "Put your mouth in their dick"
   */
  rawDescription(sex: SexInstance): string {
    return `Ends the intercourse`;
  }

  /**
   * Returns a string telling a story about this action to be given to the player
   */
  rawStory(sex: SexInstance): string {
    return "a|Rep a|end the intercourse.";
  }
}
