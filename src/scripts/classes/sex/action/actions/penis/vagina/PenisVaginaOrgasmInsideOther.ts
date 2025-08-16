/* TEXT ADOPTED AND MODIFIED FROM LILITH'S THRONE BY INNOXIA :
GenericOrgasms
*/

import type { SexInstance } from "../../../../engine/SexInstance";
import { PenisVaginaOrgasmBaseOther } from "./PenisVaginaOrgasmBase";

export class PenisVaginaOrgasmInsideOther extends PenisVaginaOrgasmBaseOther {
  getTags() {
    return super.getTags().concat(["normal"]);
  }
  desc() {
    return "Climax while being fucked";
  }

  /**
   * Returns the title of this action, e.g., "Blowjob"
   */
  rawTitle(sex: SexInstance): string {
    return `Climax with b|rep inside of you`;
  }
}
