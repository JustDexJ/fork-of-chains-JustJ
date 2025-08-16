import type { Unit } from "../../../unit/Unit";
import type { SexInstance } from "../../engine/SexInstance";
import { SexConstants } from "../../SexConstants";
import { SexBodypart } from "../SexBodypart";

export class SexBodypart_Anus extends SexBodypart {
  constructor() {
    super(
      "anus",
      [
        /* tags */
      ],
      "Anus",
      "Anus",
    );
  }

  override getHasRestrictions(): Restriction[] {
    return [
      setup.qres.AnyTrait(
        [setup.trait.anus_tight, setup.trait.anus_loose, setup.trait.anus_gape],
        true,
      ),
    ];
  }

  override repSimple(unit: Unit): string {
    const choices = ["anus", "asshole"];
    if (unit.isHasTrait(setup.trait.anus_gape)) {
      choices.push("asspussy");
    }
    if (unit.isHasTail()) {
      choices.push("tailhole");
    }
    return setup.rng.choice(choices);
  }

  override getTraitSizeMap() {
    return {
      anus_tight: 2,
      anus_loose: 4,
      anus_gape: 6,
    };
  }

  override getTraitSizeModifierMap() {
    return {
      training_anal_basic: SexConstants.BODYPART_SIZE_TRAINING_BASIC,
      training_anal_advanced: SexConstants.BODYPART_SIZE_TRAINING_ADVANCED,
      training_anal_master: SexConstants.BODYPART_SIZE_TRAINING_MASTER,
      default: 0,
    };
  }

  static holeSizeAdjective(size: number): string {
    if (size >= 6) {
      return setup.trait.anus_gape.repSizeAdjective();
    } else if (size >= 4) {
      return setup.trait.anus_loose.repSizeAdjective();
    } else {
      return setup.trait.anus_tight.repSizeAdjective();
    }
  }

  override repSizeAdjective(unit: Unit, sex: SexInstance) {
    return SexBodypart_Anus.holeSizeAdjective(this.getSize(unit, sex));
  }

  override getEquipmentSlots() {
    return [setup.equipmentslot.legs, setup.equipmentslot.rear];
  }

  override giveArousalMultiplier(me: Unit, sex: SexInstance) {
    return setup.SexUtil.calculateTraitMultiplier(me, {
      training_anal_basic: SexConstants.TRAIT_MULTI_LOW,
      training_anal_advanced: SexConstants.TRAIT_MULTI_MEDIUM,
      training_anal_master: SexConstants.TRAIT_MULTI_HIGH,

      training_mindbreak: -SexConstants.TRAIT_MULTI_LOW,
    });
  }

  override receiveArousalMultiplier(me: Unit, sex: SexInstance) {
    // A bit special, because it depends on whether the unit likes anal or not.
    const base = setup.SexUtil.calculateTraitMultiplier(me, {
      anus_tight: SexConstants.TRAIT_MULTI_MEDIUM,
      anus_loose: 0,
      anus_gape: -SexConstants.TRAIT_MULTI_LOW,

      training_mindbreak: -SexConstants.TRAIT_MULTI_LOW,
    });
    return base * SexBodypart_Anus.unitAnalEnjoymentMultiplier(me);
  }

  /**
   * Whether this bodypart is flexible towards facing
   */
  override isFlexible() {
    return true;
  }

  /**
   * Get multiplier for how much this unit enjoys anal sex.
   */
  static unitAnalEnjoymentMultiplier(unit: Unit): number {
    // player always like anal sex
    if (unit.isYou()) return 1.0;

    const score = {
      perk_needy_bottom: +100,

      training_anal_basic: +1,
      training_anal_advanced: +2,
      training_anal_master: +10,

      anus_tight: -1,
      anus_gape: +1,

      per_chaste: -2,
      per_lustful: +1,
      per_sexaddict: +2,

      tough_tough: +1,
      tough_nimble: -0.5,

      bg_whore: +1,
      bg_courtesan: +1,
      per_calm: +1,
      per_active: +1,
      per_attentive: +1,
      per_stubborn: -1,
      per_serious: -1,
      per_masochistic: 1,
      per_lunatic: 1,
    };
    let raw = 0.5 * setup.SexUtil.sumTraitMultipliers(unit, score);

    const sex_skill = unit.getSkill(setup.skill.sex);
    if (sex_skill >= 80) {
      raw += 1.0;
    } else if (sex_skill >= 50) {
      raw += 0.5;
    }

    return Math.max(-2.0, Math.min(2.0, raw));
  }

  override repLabia(unit: Unit, sex?: SexInstance) {
    return "asshole";
  }

  override repVaginal(unit: Unit, sex?: SexInstance) {
    return "anal";
  }

  override repCunnilingus(unit: Unit, sex?: SexInstance) {
    // only relevant for anus / vagina.
    return "anilingus";
  }
}
