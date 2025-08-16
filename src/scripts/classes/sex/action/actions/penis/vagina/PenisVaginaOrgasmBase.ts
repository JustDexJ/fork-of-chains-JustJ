import type { SexBodypart } from "../../../../bodypart/SexBodypart";
import { PenisOrgasmOngoing } from "../../orgasm/PenisOrgasmOngoing";
import { VaginaOrgasmOngoing } from "../../orgasm/VaginaOrgasmOngoing";

export class PenisVaginaOrgasmBase extends PenisOrgasmOngoing {
  getPenetrationTarget(): SexBodypart {
    return setup.sexbodypart.vagina;
  }
}

export class PenisVaginaOrgasmBaseOther extends VaginaOrgasmOngoing {
  getPenetratorBodypart(): SexBodypart {
    return setup.sexbodypart.penis;
  }
}
