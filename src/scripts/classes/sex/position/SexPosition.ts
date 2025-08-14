import { TwineClassCustom } from "../../_TwineClass";
import type { Unit } from "../../unit/Unit";
import type { SexInstance } from "../engine/SexInstance";
import type { SexFacing } from "../facing/SexFacing";
import type { SexPose } from "../pose/SexPose";

/**
 * Where the unit is with respect to others.
 */
export class SexPosition extends TwineClassCustom {
  constructor(
    public key: string,
    public tags: string[],
    public title: string,
    public description: string,
  ) {
    super();
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

  getDefaultPose(): SexPose {
    return setup.sexpose.stand;
  }

  override getContainer(): string {
    return `setup.SexPositionClass`;
  }

  getImage(): string {
    return `img/sexposition/${this.key}.svg`;
  }

  getImageRep(): string {
    return setup.repImgIcon(this.getImage(), this.getTitle());
  }

  rep(): string {
    return this.getImageRep();
  }

  /**
   * By default, all positions face left.
   */
  isFacingRight(): boolean {
    return false;
  }

  /**
   * Whether unit can move to this position
   */
  isAllowed(unit: Unit, sex: SexInstance): boolean {
    const current_position = sex.getPosition(unit);
    const swap_with = sex.getUnitAtPosition(this);

    // can always remain still
    if (current_position == this) return true;

    // Disallow moving if it would empty the center position
    if (current_position == setup.sexposition.center && !swap_with)
      return false;

    // Disallow moving to the top when the center position isn't lying up
    if (this == setup.sexposition.top) {
      const center = sex.getUnitAtPosition(setup.sexposition.center);
      if (!center || sex.getPose(center) != setup.sexpose.lieup) {
        return false;
      }
    }

    // Disallow moving when currently being topped except swapping with top
    if (
      current_position == setup.sexposition.center &&
      sex.getUnitAtPosition(setup.sexposition.top) &&
      this != setup.sexposition.top
    )
      return false;

    // Disallow moving when being penetrated currently. If penetrating then it's ok
    if (sex.isBeingPenetrated(unit)) return false;

    return true;
  }

  /* =========================
      TEXT
  ========================= */

  /**
   * Describes what happens when a unit moves to this position. Assumes it's empty.
   * a: unit, b: swap with, c: center unit
   */
  rawDescribe(unit: Unit, sex: SexInstance): string | string[] {
    return ``;
  }

  /**
   * Describes what happens when a unit moves to this position
   */
  describe(unit: Unit, sex: SexInstance): string {
    const old_position = sex.getPosition(unit);
    if (old_position == this) return "";
    const swap_with = sex.getUnitAtPosition(this)!;
    const center = sex.getUnitAtPosition(setup.sexposition.center)!;
    return setup.SexUtil.convert(
      this.rawDescribe(unit, sex),
      { a: unit, b: swap_with, c: center },
      sex,
    );
  }

  normalizeFacing(facing: SexFacing): SexFacing {
    if (this.isFacingRight()) {
      return facing.getOpposite();
    } else {
      return facing;
    }
  }

  isAdjacentTo(position: SexPosition): boolean {
    if (this == setup.sexposition.front && position == setup.sexposition.back)
      return false;
    if (this == setup.sexposition.back && position == setup.sexposition.front)
      return false;
    return true;
  }

  isLeftOf(position: SexPosition): boolean {
    if (this == setup.sexposition.front) return true;
    if (position == setup.sexposition.front) return false;

    if (this == setup.sexposition.back) return false;
    if (position == setup.sexposition.back) return true;

    return false;
  }

  /**
   * I am ... position. E.g., in front of, behind, on top, ...
   */
  getRelativePosition(position: SexPosition): string {
    return "";
  }
}
