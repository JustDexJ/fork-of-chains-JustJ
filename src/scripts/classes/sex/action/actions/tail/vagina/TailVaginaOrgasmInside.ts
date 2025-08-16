/* TEXT ADOPTED AND MODIFIED FROM LILITH'S THRONE BY INNOXIA :
GenericOrgasms
*/

import type { SexInstance } from "../../../../engine/SexInstance";
import { TailVaginaOrgasmBase } from "./TailVaginaOrgasmBase";

export class TailVaginaOrgasmInside extends TailVaginaOrgasmBase {
  getTags() {
    return super.getTags().concat(["normal"]);
  }
  desc() {
    return "Climax while being tail-fucked";
  }

  /**
   * Returns the title of this action, e.g., "Blowjob"
   */
  rawTitle(sex: SexInstance): string {
    return `Climax with b|reps b|tail inside of you`;
  }
}
