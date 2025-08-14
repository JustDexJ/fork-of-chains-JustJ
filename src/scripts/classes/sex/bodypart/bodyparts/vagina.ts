import type { Unit } from "../../../unit/Unit";
import type { SexInstance } from "../../engine/SexInstance";
import { SexConstants } from "../../SexConstants";
import { SexBodypart } from "../SexBodypart";

export class SexBodypart_Vagina extends SexBodypart {
  constructor() {
    super(
      "vagina",
      [
        /* tags */
      ],
      "Vagina",
      "Vagina",
    );
  }

  override repSimple(unit: Unit) {
    return setup.rng.choice(["vagina", "pussy", "cunt"]);
  }

  static holeSizeAdjective(size: number): string {
    if (size >= 6) {
      return setup.trait.vagina_gape.repSizeAdjective();
    } else if (size >= 4) {
      return setup.trait.vagina_loose.repSizeAdjective();
    } else {
      return setup.trait.vagina_tight.repSizeAdjective();
    }
  }

  override repSizeAdjective(unit: Unit, sex?: SexInstance) {
    return SexBodypart_Vagina.holeSizeAdjective(this.getSize(unit, sex));
  }

  override getTraitSizeModifierMap() {
    return {
      training_vagina_basic: SexConstants.BODYPART_SIZE_TRAINING_BASIC,
      training_vagina_advanced: SexConstants.BODYPART_SIZE_TRAINING_ADVANCED,
      training_vagina_master: SexConstants.BODYPART_SIZE_TRAINING_MASTER,
      default: 0,
    };
  }

  override getTraitSizeMap() {
    return {
      vagina_tight: 2,
      vagina_loose: 4,
      vagina_gape: 6,
    };
  }

  override getEquipmentSlots() {
    return [
      setup.equipmentslot.legs,
      setup.equipmentslot.rear,
      setup.equipmentslot.genital,
    ];
  }

  override giveArousalMultiplier(me: Unit, sex: SexInstance) {
    return setup.SexUtil.calculateTraitMultiplier(me, {
      training_vagina_basic: SexConstants.TRAIT_MULTI_LOW,
      training_vagina_advanced: SexConstants.TRAIT_MULTI_MEDIUM,
      training_vagina_master: SexConstants.TRAIT_MULTI_HIGH,

      training_mindbreak: -SexConstants.TRAIT_MULTI_LOW,
    });
  }

  override receiveArousalMultiplier(me: Unit, sex: SexInstance) {
    // vagina is the same
    return this.giveArousalMultiplier(me, sex);
  }

  override getHasRestrictions(): Restriction[] {
    return [
      setup.qres.AnyTrait(
        [
          setup.trait.vagina_tight,
          setup.trait.vagina_loose,
          setup.trait.vagina_gape,
        ],
        true,
      ),
    ];
  }

  /**
   * Whether this bodypart is flexible towards facing
   */
  override isFlexible(): boolean {
    return true;
  }

  override repLabia(unit: Unit, sex?: SexInstance) {
    return "labia";
  }

  override repVaginal(unit: Unit, sex?: SexInstance) {
    return "vaginal";
  }

  override repCunnilingus(unit: Unit, sex?: SexInstance) {
    // only relevant for anus / vagina.
    return "cunnilingus";
  }
}
