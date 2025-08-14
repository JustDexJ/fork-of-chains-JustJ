import type { SexBodypart } from "../../../../bodypart/SexBodypart";
import { VaginaOrgasmOngoing } from "../../orgasm/VaginaOrgasmOngoing";

export class MouthVaginaOrgasmBase extends VaginaOrgasmOngoing {
  getRestrictions() {
    return super
      .getRestrictions()
      .concat([setup.qres.HasItem("sexmanual_penetration_mouthhole")]);
  }

  getPenetratorBodypart(): SexBodypart {
    return setup.sexbodypart.mouth;
  }
}
