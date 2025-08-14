import type { SexBodypart } from "../../../../bodypart/SexBodypart";
import { VaginaOrgasmOngoing } from "../../orgasm/VaginaOrgasmOngoing";

export class TailVaginaOrgasmBase extends VaginaOrgasmOngoing {
  getRestrictions() {
    return super
      .getRestrictions()
      .concat([setup.qres.HasItem("sexmanual_bodypart_tail")]);
  }

  getPenetratorBodypart(): SexBodypart {
    return setup.sexbodypart.tail;
  }
}
