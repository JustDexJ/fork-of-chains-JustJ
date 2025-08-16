/* TEXT ADOPTED AND MODIFIED FROM LILITH'S THRONE BY INNOXIA :
GenericOrgasms
*/

import type { SexInstance } from "../../../../engine/SexInstance";
import { PenisVaginaOrgasmBase } from "./PenisVaginaOrgasmBase";

export class PenisVaginaOrgasmInside extends PenisVaginaOrgasmBase {
  getTags() {
    return super.getTags().concat(["normal"]);
  }
  desc() {
    return "Cum inside another";
  }

  /**
   * Returns the title of this action, e.g., "Blowjob"
   */
  rawTitle(sex: SexInstance): string {
    return `Cum inside of b|rep`;
  }
}
