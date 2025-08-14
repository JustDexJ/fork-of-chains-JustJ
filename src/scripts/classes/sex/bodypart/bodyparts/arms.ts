import type { Unit } from "../../../unit/Unit";
import type { SexInstance } from "../../engine/SexInstance";
import { SexBodypart } from "../SexBodypart";

export class SexBodypart_Arms extends SexBodypart {
  constructor() {
    super(
      "arms",
      [
        /* tags */
      ],
      "Arms",
      "Arms",
    );
  }

  override repSimple(unit: Unit) {
    return setup.rng.choice(["arms"]);
  }

  override getEquipmentSlots() {
    return [setup.equipmentslot.arms];
  }

  override heightTolerance() {
    return 1;
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

  override isFlexible() {
    return true;
  }

  override rawDescribeEnd(
    unit: Unit,
    target: Unit,
    target_bodypart: SexBodypart,
    sex: SexInstance,
  ): string | string[] {
    // supports anus, vagina
    const desc = target_bodypart.rep(target, sex);
    return [
      `a|rep a|withdraw a|their finger from b|reps ${desc}, leaving it empty and unfilled.`,
    ];
  }
}
