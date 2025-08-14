import type { SexBodypart } from "../../../../bodypart/SexBodypart";
import { PenisOrgasmOngoing } from "../../orgasm/PenisOrgasmOngoing";

export class PenisBreastsOrgasmBase extends PenisOrgasmOngoing {
  getPenetrationTarget(): SexBodypart {
    return setup.sexbodypart.breasts;
  }

  getRestrictions() {
    return super
      .getRestrictions()
      .concat([
        setup.qres.HasItem("sexmanual_penetration_penisbreasts"),
        setup.qres.SexCanTitfuck("a", "b"),
      ]);
  }
}
