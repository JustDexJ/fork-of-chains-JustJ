import type { SexBodypart } from "../../../../bodypart/SexBodypart";
import { PenisOrgasmOngoing } from "../../orgasm/PenisOrgasmOngoing";

export class PenisMouthOrgasmBase extends PenisOrgasmOngoing {
  getPenetrationTarget(): SexBodypart {
    return setup.sexbodypart.mouth;
  }
}
