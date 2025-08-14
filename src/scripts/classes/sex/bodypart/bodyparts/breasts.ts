import type { Unit } from "../../../unit/Unit";
import type { SexInstance } from "../../engine/SexInstance";
import { SexConstants } from "../../SexConstants";
import { SexBodypart } from "../SexBodypart";

export class SexBodypart_Breasts extends SexBodypart {
  constructor() {
    super(
      "breasts",
      [
        /* tags */
      ],
      "Breasts",
      "Breasts",
    );
  }

  override repSimple(unit: Unit) {
    if (unit.isHasBreasts()) {
      return setup.rng.choice(["breasts", "tits", "bosoms", "boobs"]);
    } else {
      return setup.rng.choice(["chest", "pecs"]);
    }
  }

  override getTraitSizeMap() {
    return {
      breast_tiny: 1,
      breast_small: 2,
      breast_medium: 3,
      breast_large: 4,
      breast_huge: 5,
      breast_titanic: 6,

      // flat
      default: 0,
    };
  }

  static breastsSizeAdjective(size: number): string {
    if (size >= 6) {
      return setup.trait.breast_titanic.repSizeAdjective();
    } else if (size >= 5) {
      return setup.trait.breast_huge.repSizeAdjective();
    } else if (size >= 4) {
      return setup.trait.breast_large.repSizeAdjective();
    } else if (size >= 3) {
      return setup.trait.breast_medium.repSizeAdjective();
    } else if (size >= 2) {
      return setup.trait.breast_small.repSizeAdjective();
    } else if (size >= 1) {
      return setup.trait.breast_tiny.repSizeAdjective();
    } else {
      return setup.rng.choice([`flat`, `non-existent`]);
    }
  }

  override repSizeAdjective(unit: Unit, sex?: SexInstance) {
    return SexBodypart_Breasts.breastsSizeAdjective(this.getSize(unit, sex));
  }

  getEquipmentSlots() {
    return [setup.equipmentslot.torso];
  }

  override giveArousalMultiplier(me: Unit, sex: SexInstance) {
    if (me.isHasBreasts()) {
      return setup.SexUtil.calculateTraitMultiplier(me, {
        breast_titanic: SexConstants.TRAIT_MULTI_HIGH,
        breast_huge: SexConstants.TRAIT_MULTI_MEDIUM,
        breast_large: SexConstants.TRAIT_MULTI_LOW,
        breast_small: -SexConstants.TRAIT_MULTI_LOW,
        breast_tiny: -SexConstants.TRAIT_MULTI_MEDIUM,
      });
    } else {
      return setup.SexUtil.calculateTraitMultiplier(me, {
        muscle_verystrong: SexConstants.TRAIT_MULTI_MEDIUM,
        muscle_extremelystrong: SexConstants.TRAIT_MULTI_LOW,
      });
    }
  }

  override receiveArousalMultiplier(me: Unit, sex: SexInstance) {
    return 1.0;
  }

  override isCanUseCovered() {
    return true;
  }

  static TITFUCK = {
    titfuck: "titfuck",
    pecjob: "pecjob",
  };

  getMinBreastTraitForTitfuck() {
    return setup.trait.breast_medium;
  }

  getMinMuscleTraitForPecjob() {
    return setup.trait.muscle_verystrong;
  }

  getTitfuck(me: Unit, them: Unit): string | null {
    if (me.isHasDick() && them.isHasTrait(this.getMinBreastTraitForTitfuck())) {
      return SexBodypart_Breasts.TITFUCK.titfuck;
    } else if (
      me.isHasDick() &&
      !them.isHasBreasts() &&
      them.isHasTrait(this.getMinMuscleTraitForPecjob())
    ) {
      return SexBodypart_Breasts.TITFUCK.pecjob;
    } else {
      return null;
    }
  }

  repTitfuck(me: Unit, them: Unit): string | null {
    const titfuck = this.getTitfuck(me, them);
    return titfuck;
  }

  /**
   * push, press, squeeze, ...
   */
  repPush(me: Unit, them: Unit): string | null {
    const titfuck = this.getTitfuck(me, them);
    if (titfuck == SexBodypart_Breasts.TITFUCK.titfuck) {
      return setup.rng.choice([`push`, `press`, `squeeze`]);
    } else if (titfuck == SexBodypart_Breasts.TITFUCK.pecjob) {
      return setup.rng.choice([`press`, `squeeze`]);
    } else {
      throw new Error(`Unrecognized titfuck option: ${titfuck}`);
    }
  }
}
