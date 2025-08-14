import type { SexBodypart } from "../../../../bodypart/SexBodypart";
import { PenisOrgasmOngoing } from "../../orgasm/PenisOrgasmOngoing";

export class PenisAnusOrgasmBase extends PenisOrgasmOngoing {
  getPenetrationTarget(): SexBodypart {
    return setup.sexbodypart.anus;
  }
}
