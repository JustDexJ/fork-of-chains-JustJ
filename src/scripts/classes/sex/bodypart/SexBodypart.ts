import { TwineClassCustom } from "../../_TwineClass";
import type { EquipmentSlot } from "../../equipment/EquipmentSlot";
import type { TraitKey } from "../../trait/Trait";
import type { Unit } from "../../unit/Unit";
import type { SexInstance, UnitAndBodypart } from "../engine/SexInstance";
import type { SexFacing } from "../facing/SexFacing";
import type { SexHeight } from "../height/SexHeight";
import type { SexPosition } from "../position/SexPosition";
import { SexConstants } from "../SexConstants";

/**
 * A bodypart that takes part in sex actions
 */
export abstract class SexBodypart extends TwineClassCustom {
  constructor(
    public key: string,
    public tags: string[],
    public title: string,
    public description: string,
  ) {
    super();
  }

  /* =========================
      DATA
  ========================= */

  /**
   * Multiplier for arousal that this bodypart owner gives to the partner
   */
  giveArousalMultiplier(me: Unit, sex: SexInstance): number {
    return 1.0;
  }

  /**
   * Multiplier for arousal that this bodypart owner receives from the partner
   */
  receiveArousalMultiplier(me: Unit, sex: SexInstance): number {
    return 1.0;
  }

  /* =========================
      BASIC
  ========================= */

  getTag(): string {
    return this.key;
  }

  /**
   * Get the corresponding equipment slots that block this bodypart.
   */
  getEquipmentSlots(): EquipmentSlot[] {
    return [];
  }

  /**
   * Can this bodypart penetrate another? Filled manually for efficiency
   */
  isCanPenetrate(bodypart: SexBodypart): boolean {
    return false;
  }

  /**
   * Whether this penetration is considered a submissive act
   */
  isSubmissivePenetration(bodypart: SexBodypart): boolean {
    return false;
  }

  override getContainer(): string {
    return `setup.SexBodypartClass`;
  }

  getTags(): string[] {
    return this.tags;
  }

  getTitle(): string {
    return this.title;
  }

  getDescription(): string {
    return this.description;
  }

  isHasBodypart(unit: Unit, sex: SexInstance): boolean {
    return setup.RestrictionLib.isUnitSatisfy(unit, this.getHasRestrictions());
  }

  getHasRestrictions(): Restriction[] {
    return [];
  }

  /**
   * Whether this bodypart is flexible towards facing
   */
  isFlexible(): boolean {
    return false;
  }

  /**
   * Whether this bodypart is completely directionless and disregard facing altogether
   */
  isDirectionless(): boolean {
    return false;
  }

  /**
   * Whether this bodypart is usable even when covered.
   */
  isCanUseCovered(): boolean {
    return false;
  }

  /**
   * How much difference in height can this bodypart tolerate for checking interaction?
   */
  heightTolerance(): number {
    return 0;
  }

  /**
   * Return trait: number for determining size
   */
  getTraitSizeMap(): { [k in TraitKey | "default"]?: number } {
    return {};
  }

  /**
   * How large is this unit's member? Returns 0-6.
   */
  getSize(unit: Unit, sex?: SexInstance): number {
    return setup.SexUtil.sumTraitMultipliers(unit, this.getTraitSizeMap());
  }

  repSizeAdjective(unit: Unit, sex?: SexInstance): string {
    return ``;
  }

  /**
   * Get modifier to size from trainings, etc.
   */
  getTraitSizeModifierMap(): { [k in TraitKey | "default"]?: number } {
    return {};
  }

  /**
   * Get modifier to size from trainings, etc.
   */
  getTraitSizeModifier(unit: Unit, sex?: SexInstance): number {
    return setup.SexUtil.sumTraitMultipliers(unit, this.getTraitSizeMap());
  }

  /**
   * Only for orifices: mouth, anus, vagina
   * Return the first half of a sentence, e.g., : "a is a masterful anal slut and "
   */
  repSizeModifier(unit: Unit, sex: SexInstance): string {
    const mod = this.getTraitSizeModifier(unit, sex);
    const vaginal = this.repVaginal(unit, sex);
    let t;
    if (unit.isSlaver()) {
      t = [
        `As a free slaver, a|rep a|have not undergone any specific ${vaginal} training, and `,
        `Given that a|rep a|is not a slave, a|they a|do not have any particular training for the use of a|their ${vaginal} orifice, and `,
        `Without any prior training of taking it up a|their ${this.repSimple(unit)}, `,
        `a|Rep a|is not a slave, and has never undergone training for ${vaginal} sex, and `,
        `While a|rep a|have certainly had plenty of sex before, a|they never undergo specialized ${vaginal} sex training, and `,
        `As a slaver, a|rep a|is not a trained ${vaginal} slut, and `,
      ];
    } else if (mod == SexConstants.BODYPART_SIZE_TRAINING_MASTER) {
      t = [
        `a|Rep a|is a masterful ${vaginal} slut and `,
        `As a dedicated and masterful ${vaginal} slut, `,
        `Boasting a wealth of experience in ${vaginal} sex, `,
        `Having been extremely extensively trained in ${vaginal} sex, `,
        `With a|their masterful knowledge of ${vaginal} sex, `,
        `As a dedicated and borderline addicted ${vaginal} slut, `,
      ];
    } else if (mod == SexConstants.BODYPART_SIZE_TRAINING_ADVANCED) {
      t = [
        `With their advanced training in ${vaginal} sex, `,
        `Since a|rep a|have plenty of experience with ${vaginal} sex, `,
        `As an experienced ${vaginal} slut, `,
        `As a properly trained ${vaginal} slave, `,
        `Having completed an extensive training for ${vaginal} use, `,
        `Boasting advanced ${vaginal} sex knowledge, `,
      ];
    } else if (mod == SexConstants.BODYPART_SIZE_TRAINING_BASIC) {
      t = [
        `a|Rep a|have basic knowledge in ${vaginal} sex and `,
        `Thanks to a|their basic knowledge in ${vaginal} sex, `,
        `a|Rep a|have undergone basic training in ${vaginal} sex, and `,
        `With a|their basic understanding of ${vaginal} sex, `,
        `While a|rep is still inexperienced, a|they a|have basic ${vaginal} sex knowledge, and `,
        `Despite still being inexperienced, a|reps basic ${vaginal} training kicks in, and `,
      ];
    } else {
      t = [
        `a|Rep has never undergone any ${vaginal} sex, and `,
        `As a complete newcomer when it comes to ${vaginal} sex, `,
        `Given a|their absolute zero training in ${vaginal} sex, `,
        `Being fully unprepared for ${vaginal} sex, `,
        `With zero prior training in taking it ${vaginal}ly, `,
        `Boasting no knowledge of ${vaginal} sex, `,
      ];
    }
    return setup.SexUtil.convert(t, { a: unit }, sex);
  }

  /**
   * How well does my bodypart fits inside them? Returns:
   * 0: very well
   * 1: ok
   * 2: not good
   * 3: very bad
   */
  getAccomodatingValue(
    me: Unit,
    them: Unit,
    their_bodypart: SexBodypart,
    sex?: SexInstance,
  ): number {
    let my_size = this.getSize(me, sex) + this.getTraitSizeModifier(me, sex);
    let their_size =
      their_bodypart.getSize(them, sex) +
      their_bodypart.getTraitSizeModifier(them, sex);
    if (my_size < their_size) {
      return 0;
    } else if (my_size < their_size + 2) {
      return 1;
    } else if (my_size < their_size + 4) {
      return 2;
    } else {
      return 3;
    }
  }

  getImage(): string {
    return `img/sexbodypart/${this.key}.svg`;
  }

  getImageRep(): string {
    return `<span class='colorize-white'>${setup.repImgIcon(this.getImage(), this.getTitle())}</span>`;
  }

  repsimple(): string {
    return this.getImageRep();
  }

  _isCanInteractWithHeight(
    my_height: SexHeight,
    their_bodypart: SexBodypart,
    their_height: SexHeight,
  ): boolean {
    return (
      Math.abs(my_height.getHeightValue() - their_height.getHeightValue()) <=
      Math.max(this.heightTolerance(), their_bodypart.heightTolerance())
    );
  }

  _isCanInteractWithPositionFacing(
    my_position: SexPosition,
    my_facing: SexFacing,
    their_bodypart: SexBodypart,
    their_position: SexPosition,
    their_facing: SexFacing,
  ): boolean {
    if (!my_position.isAdjacentTo(their_position)) return false;

    const topcenter = [setup.sexposition.top, setup.sexposition.center];
    if (topcenter.includes(my_position) && topcenter.includes(their_position)) {
      // top down
      const mp = my_position.normalizeFacing(my_facing);
      const tp = their_position.normalizeFacing(their_facing);

      if (my_position == setup.sexposition.top) {
        // I am on top

        // front body matches
        const myflexfront =
          this.isDirectionless() ||
          mp == setup.sexfacing.downfront ||
          (this.isFlexible() && mp.isFrontIsh());

        const theirflexfront =
          their_bodypart.isDirectionless() ||
          tp == setup.sexfacing.upfront ||
          (their_bodypart.isFlexible() && tp.isFrontIsh());

        if (myflexfront && theirflexfront) return true;

        // back body matches
        const myflexback =
          this.isDirectionless() ||
          mp == setup.sexfacing.downback ||
          (this.isFlexible() && !mp.isFrontIsh());

        const theirflexback =
          this.isDirectionless() ||
          tp == setup.sexfacing.upback ||
          (their_bodypart.isFlexible() && !tp.isFrontIsh());

        if (myflexback && theirflexback) return true;
      } else {
        // I am on bottom

        // front body matches
        const myflexfront =
          this.isDirectionless() ||
          mp == setup.sexfacing.upfront ||
          (this.isFlexible() && mp.isFrontIsh());

        const theirflexfront =
          this.isDirectionless() ||
          tp == setup.sexfacing.downfront ||
          (their_bodypart.isFlexible() && tp.isFrontIsh());
        if (myflexfront && theirflexfront) return true;

        // back body matches
        const myflexback =
          this.isDirectionless() ||
          mp == setup.sexfacing.upback ||
          (this.isFlexible() && !mp.isFrontIsh());

        const theirflexback =
          this.isDirectionless() ||
          tp == setup.sexfacing.downback ||
          (their_bodypart.isFlexible() && !tp.isFrontIsh());
        if (myflexback && theirflexback) return true;
      }

      // failed top/down
      return false;
    }

    // Only remaining case is adjacent horizontally.
    const mp = my_position.normalizeFacing(my_facing);
    const tp = their_position.normalizeFacing(their_facing);
    if (my_position.isLeftOf(their_position)) {
      // i am to the left, so my back vs their front
      const mine =
        this.isDirectionless() ||
        mp == setup.sexfacing.back ||
        (this.isFlexible() && !mp.isFrontIsh());
      const theirs =
        their_bodypart.isDirectionless() ||
        tp == setup.sexfacing.front ||
        (their_bodypart.isFlexible() && tp.isFrontIsh());

      if (mine && theirs) return true;
    } else {
      // i am to the right, so my front vs their back
      const mine =
        this.isDirectionless() ||
        mp == setup.sexfacing.front ||
        (this.isFlexible() && mp.isFrontIsh());
      const theirs =
        their_bodypart.isDirectionless() ||
        tp == setup.sexfacing.back ||
        (their_bodypart.isFlexible() && !tp.isFrontIsh());

      if (mine && theirs) {
        return true;
      }
    }
    return false;
  }

  isCanInteractWith(
    my_position: SexPosition,
    my_facingheight: { facing: SexFacing; height: SexHeight },
    their_bodypart: SexBodypart,
    their_position: SexPosition,
    their_facingheight: { facing: SexFacing; height: SexHeight },
  ): boolean {
    return (
      this._isCanInteractWithHeight(
        my_facingheight.height,
        their_bodypart,
        their_facingheight.height,
      ) &&
      this._isCanInteractWithPositionFacing(
        my_position,
        my_facingheight.facing,
        their_bodypart,
        their_position,
        their_facingheight.facing,
      )
    );
  }

  /* =========================
      TEXT
  ========================= */

  rep(unit: Unit, sex: SexInstance): string {
    if (sex.getCoveringEquipment(unit, this)) {
      const title = this.getTitle().toLowerCase();
      return setup.rng.choice([
        `obscured ${title}`,
        `covered ${title}`,
        `hidden ${title}`,
      ]);
    } else {
      let base_text = this.getTitle().toLowerCase();
      const self = this as SexBodypart;
      if (self === setup.sexbodypart.anus) {
        base_text = `a|anus`;
      } else if (self === setup.sexbodypart.breasts) {
        base_text = `a|cbreasts`;
      } else if (self === setup.sexbodypart.penis) {
        base_text = `a|cdick`;
      } else if (self === setup.sexbodypart.tail) {
        base_text = `a|tail`;
      } else if (self === setup.sexbodypart.vagina) {
        base_text = `a|vagina`;
      }
      return setup.Text.replaceUnitMacros(base_text, { a: unit });
    }
  }

  /**
   * Describe unit bodypart teasing to penetrate another.
   */
  rawDescribeTease(
    unit: Unit,
    target: Unit,
    target_bodypart: SexBodypart,
    sex: SexInstance,
  ): string | string[] {
    return "";
  }

  /**
   * Describe unit bodypart start to penetrate another.
   */
  describeTease(
    unit: Unit,
    target: Unit,
    target_bodypart: SexBodypart,
    sex: SexInstance,
  ): string {
    return setup.SexUtil.convert(
      this.rawDescribeTease(unit, target, target_bodypart, sex),
      { a: unit, b: target },
      sex,
    );
  }

  /**
   * Describe unit bodypart finish penetrating another.
   */
  rawDescribeEnd(
    unit: Unit,
    target: Unit,
    target_bodypart: SexBodypart,
    sex: SexInstance,
  ): string | string[] {
    return "";
  }

  /**
   * Describe unit bodypart finish penetrating another.
   */
  describeEnd(
    unit: Unit,
    target: Unit,
    target_bodypart: SexBodypart,
    sex: SexInstance,
  ): string {
    return setup.SexUtil.convert(
      this.rawDescribeEnd(unit, target, target_bodypart, sex),
      { a: unit, b: target },
      sex,
    );
  }

  /**
   * Gives a verb for this bodypart penetrating another. E.g., "penetrating b|anus"
   */
  rawVerbPenetrate(
    unit: Unit,
    target: Unit,
    target_bodypart: SexBodypart,
    sex: SexInstance,
  ): string | string[] {
    return "";
  }

  /**
   * Describe unit bodypart start to penetrate another.
   */
  verbPenetrate(
    unit: Unit,
    target: Unit,
    target_bodypart: SexBodypart,
    sex: SexInstance,
  ): string {
    return setup.SexUtil.convert(
      this.rawVerbPenetrate(unit, target, target_bodypart, sex),
      { a: unit, b: target },
      sex,
    );
  }

  /**
   * Gives a sentence describing extra flavor text when this bodypart penetrating another.
   */
  rawPenetrateFlavorSentence(
    unit: Unit,
    target: Unit,
    target_bodypart: SexBodypart,
    sex: SexInstance,
  ): string | string[] {
    return "";
  }

  /**
   * Describe unit bodypart start to penetrate another.
   */
  repPenetrateFlavorSentence(
    unit: Unit,
    target: Unit,
    target_bodypart: SexBodypart,
    sex: SexInstance,
  ): string {
    return setup.SexUtil.convert(
      this.rawPenetrateFlavorSentence(unit, target, target_bodypart, sex),
      { a: unit, b: target },
      sex,
    );
  }

  /**
   * Simple no-modifier name, e.g., tail
   */
  repSimple(unit: Unit): string {
    return ``;
  }

  repLabia(unit: Unit, sex?: SexInstance): string {
    // only relevant for anus / vagina.
    return "labia";
  }

  repVaginal(unit: Unit, sex?: SexInstance): string {
    // only relevant for anus / vagina.
    return "anal";
  }

  repCunnilingus(unit: Unit, sex?: SexInstance): string {
    // only relevant for anus / vagina.
    return "cunnilingus";
  }

  repTip(unit: Unit, sex?: SexInstance): string {
    // dick, tail
    return `tip`;
  }

  repFuck(unit: Unit, sex?: SexInstance): string {
    // dick, tail
    return `fuck`;
  }

  /* =========================
      STATIC
  ========================= */

  static describePenetrationEnds(
    penetrations: UnitAndBodypart[],
    sex: SexInstance,
  ): string {
    const sentences = [];
    for (const penetration of penetrations) {
      const target = sex.getBodypartPenetrationTarget(
        penetration.unit,
        penetration.bodypart,
      )!;
      sentences.push(
        penetration.bodypart.describeEnd(
          penetration.unit,
          target.unit,
          target.bodypart,
          sex,
        ),
      );
    }
    return sentences.join(" ");
  }
}
