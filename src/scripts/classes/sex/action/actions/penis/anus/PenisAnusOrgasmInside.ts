/* TEXT ADOPTED AND MODIFIED FROM LILITH'S THRONE BY INNOXIA :
GenericOrgasms
*/

import type { SexInstance } from "../../../../engine/SexInstance";
import { PenisAnusOrgasmBase } from "./PenisAnusOrgasmBase";

export class PenisAnusOrgasmInside extends PenisAnusOrgasmBase {
  getTags() {
    return super.getTags().concat(["normal"]);
  }
  desc() {
    return "Cum inside anus";
  }

  /**
   * Returns the title of this action, e.g., "Blowjob"
   */
  rawTitle(sex: SexInstance): string {
    return `Cum inside b|reps b|anus`;
  }
}
