import type { Unit } from "../../../unit/Unit";
import type { SexInstance } from "../../engine/SexInstance";
import { SexBodypart } from "../SexBodypart";

// this is actually feet
export class SexBodypart_Legs extends SexBodypart {
  constructor() {
    super(
      "legs",
      [
        /* tags */
      ],
      "Legs",
      "Legs",
    );
  }

  override repSimple(unit: Unit) {
    return setup.rng.choice(["legs"]);
  }

  override getEquipmentSlots() {
    return [setup.equipmentslot.feet];
  }

  override giveArousalMultiplier(me: Unit, sex: SexInstance) {
    return 1.0;
  }

  override receiveArousalMultiplier(me: Unit, sex: SexInstance) {
    return 1.0;
  }

  override isCanUseCovered() {
    return true;
  }
}
