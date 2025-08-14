import { TwineClassCustom } from "../../_TwineClass";
import type { Unit } from "../../unit/Unit";
import type { SexInstance } from "../engine/SexInstance";
import type { SexFacing } from "../facing/SexFacing";
import type { sexfacing } from "../facing/_index";
import type { SexHeight } from "../height/SexHeight";
import type { sexheight } from "../height/_index";
import type { SexPosition } from "../position/SexPosition";

type FacingHeightKey = {
  facing_key: keyof typeof sexfacing;
  height_key: keyof typeof sexheight;
};

/**
 * How the unit occupies its position in sex.
 */
export abstract class SexPose extends TwineClassCustom {
  constructor(
    public key: string,
    public tags: string[],
    public title: string,
    public description: string,
    public bodypart_key_facing_height_key_map: Record<string, FacingHeightKey>,
  ) {
    super();
  }

  /* =========================
      BASIC GETTERS
  ========================= */

  override getContainer(): string {
    return `setup.SexPoseClass`;
  }

  /**
   * Unlock restrictions.
   */
  getRestrictions(): Restriction[] {
    return [];
  }

  getTags(): string[] {
    return this.tags;
  }

  getImage(position?: SexPosition, sex?: SexInstance): string {
    let suffix = "";
    if (sex && this.isPositionRaised(position!, sex)) suffix = "_h";
    return `img/sexpose/${this.key}${suffix}.svg`;
  }

  getImageFlipped(position?: SexPosition, sex?: SexInstance): string {
    const base = this.getImage();
    let imgclass = "";
    if (position && position.isFacingRight()) {
      imgclass = "flip-horizontal";
    }
    return `<img class="${imgclass}" src="${setup.escapeHtml(
      setup.resolveImageUrl(this.getImage(position, sex)),
    )}" />`;
  }

  getImageRep(position?: SexPosition, sex?: SexInstance): string {
    return `<span class='colorize-white' data-tooltip="${this.getTitle()}">${this.getImageFlipped(position, sex)}</span>`;
  }

  rep(position?: SexPosition, sex?: SexInstance): string {
    return `<span class='trait'>${this.getImageRep(position, sex)}</span>`;
  }

  repBig(position?: SexPosition, sex?: SexInstance): string {
    return `<span class='colorize-white sex-position-big'>${this.getImageFlipped(position, sex)}</span>`;
  }

  repBigPlayer(position?: SexPosition, sex?: SexInstance): string {
    return `<span class='colorize-gold sex-position-big'>${this.getImageFlipped(position, sex)}</span>`;
  }

  getTitle(): string {
    return this.title;
  }

  getDescription(): string {
    return this.description;
  }

  /**
   * In this default position, where does this bodypart face to? Does not raise
   */
  _getRawFacingHeight(bodypart: SexBodypart): {
    facing: SexFacing;
    height: SexHeight;
  } {
    const facing =
      setup.sexfacing[
        this.bodypart_key_facing_height_key_map[bodypart.key].facing_key
      ];
    let height =
      setup.sexheight[
        this.bodypart_key_facing_height_key_map[bodypart.key].height_key
      ];

    if (!facing)
      throw new Error(
        `Missing facing for position ${this.key} bodypart ${bodypart.key}`,
      );
    if (!height)
      throw new Error(
        `Missing height for position ${this.key} bodypart ${bodypart.key}`,
      );

    return { facing: facing, height: height };
  }

  /**
   * In this default position, where does this bodypart face to?
   */
  getFacingHeight(
    bodypart: SexBodypart,
    position: SexPosition,
    sex: SexInstance,
  ): { facing: SexFacing; height: SexHeight } {
    let facingheight = this._getRawFacingHeight(bodypart);

    if (this.isPositionRaised(position, sex)) {
      // raise height if on raised platform.
      facingheight.height = facingheight.height.getNextHigherHeight();
    }

    return facingheight;
  }

  /**
   * whether unit can move to this position
   */
  isAllowed(unit: Unit, sex: SexInstance, position?: SexPosition): boolean {
    // If unit is being topped right now, then can't
    if (!position) {
      if (
        sex.getPosition(unit) == setup.sexposition.center &&
        sex.getUnitAtPosition(setup.sexposition.top)
      ) {
        return false;
      }
    }

    return true;
  }

  /**
   * Whether this pose is raised from the floor
   */
  isPositionRaised(position: SexPosition, sex: SexInstance): boolean {
    if (
      position &&
      [setup.sexposition.center, setup.sexposition.top].includes(position) &&
      sex.getLocation().isHigh()
    ) {
      return true;
    }
    return false;
  }

  /**
   * Whether this pose has been unlocked
   */
  isUnlocked(): boolean {
    return setup.RestrictionLib.isPrerequisitesSatisfied(
      this,
      this.getRestrictions(),
    );
  }

  /**
   * Whether this position have this unit lying down on the floor either face-up or prone
   */
  isOnFloor(): boolean {
    const facingheightarms = this._getRawFacingHeight(setup.sexbodypart.arms);
    const facingheightlegs = this._getRawFacingHeight(setup.sexbodypart.legs);
    return (
      facingheightarms.height == setup.sexheight.floor &&
      facingheightlegs.height == setup.sexheight.floor
    );
  }

  /* =========================
      TEXT
  ========================= */

  /**
   * Describes what happens when a unit moves to this pose . E.g., "stood up a|x ..."
   */
  rawDescribe(unit: Unit, sex: SexInstance): string | string[] {
    return ``;
  }

  /**
   * Describes what happens when a unit moves to this pose . E.g., "stood up a|x ..."
   */
  describe(unit: Unit, sex: SexInstance): string {
    if (sex.getPose(unit) == this) return "";
    return setup.SexUtil.convert(this.rawDescribe(unit, sex), { a: unit }, sex);
  }

  /**
   * Describes the unit's position. E.g., "Lying down".
   */
  rawDescribePosition(unit: Unit, sex: SexInstance): string | string[] {
    return ``;
  }

  /**
   * Describes the unit's position complete with partner. E.g., "Lying down under xxx".
   */
  describePosition(unit: Unit, sex: SexInstance): string {
    const raw_text = setup.SexUtil.convert(
      this.rawDescribePosition(unit, sex),
      { a: unit },
      sex,
    );
    // get the person closest to this.
    const positions = [
      setup.sexposition.top,
      setup.sexposition.center,
      setup.sexposition.front,
      setup.sexposition.back,
    ];
    const myposition = sex.getPosition(unit);

    let verb = "alone";
    for (const position of positions) {
      if (position == myposition) continue;
      const them = sex.getUnitAtPosition(position);
      if (them && position.isAdjacentTo(myposition)) {
        verb = `${myposition.getRelativePosition(position)} ${them.rep()}`;
      }
    }

    return `${raw_text} ${verb}`;
  }

  /**
   * Me in this position trying to resist them in sex position. Not in a penetration.
   */
  rawRepResist(me: Unit, them: Unit, sex: SexInstance): string | string[] {
    return setup.SexUtil.repResist(
      me,
      them,
      sex,
      [
        `struggle out of b|their grip`,
        `wriggle out of b|their grasp`,
        `resist`,
        `avoid being violated`,
        `escape`,
      ],
      [
        `b|rep b|adv b|keep a|them pinned in position`,
        `b|rep b|adv b|keep a|them pushed into position`,
        `b|rep b|adv b|force b|themself into a|them`,
        `b|rep b|adv b|threaten a|them with even worse treatment`,
        `b|rep b|adv b|whisper the things b|they b|is going to do to a|them`,
      ],
    );
  }

  repResist(me: Unit, them: Unit, sex: SexInstance): string | string[] {
    return setup.SexUtil.convert(
      this.rawRepResist(me, them, sex),
      { a: me, b: them },
      sex,
    );
  }

  /* =========================
      STATIC
  ========================= */

  static repBigNone(): string {
    return `<span class='colorize-white sex-position-big'>
      <img src="${setup.escapeHtml(setup.resolveImageUrl(setup.SexPose.NONE_IMAGE_URL))}" />
    </span>`;
  }

  static NONE_IMAGE_URL = `img/sexpose/none.svg`;
}

/**
 * Sex position exclusive for the top position
 */
export class SexPose_Top extends SexPose {
  override isAllowed(
    unit: Unit,
    sex: SexInstance,
    position: SexPosition,
  ): boolean {
    const center = sex.getUnitAtPosition(setup.sexposition.center);
    return !!(
      (position || sex.getPosition(unit)) == setup.sexposition.top &&
      center &&
      sex.getPose(center) == setup.sexpose.lieup &&
      super.isAllowed(unit, sex)
    );
  }
}

/**
 * Sex position exclusive for the top position
 */
export abstract class SexPose_Floor extends SexPose {
  override isAllowed(
    unit: Unit,
    sex: SexInstance,
    position: SexPosition,
  ): boolean {
    return (
      [
        setup.sexposition.front,
        setup.sexposition.center,
        setup.sexposition.back,
      ].includes(position || sex.getPosition(unit)) &&
      super.isAllowed(unit, sex)
    );
  }
}
