import { TwineClassCustom } from "../../_TwineClass";

/**
 * Where a bodypart is height-wise. To align them for sex.
 */
export abstract class SexHeight extends TwineClassCustom {
  constructor(
    public key: string,
    public height_value: number,
  ) {
    super();
  }

  getHeightValue(): number {
    return this.height_value;
  }

  override getContainer(): string {
    return `setup.SexHeightClass`;
  }

  /**
   * Get height one step above this one.
   */
  abstract getNextHigherHeight(): SexHeight;

  /**
   * The height level, e.g., "head", "waist", "floor"
   */
  repHeightLevel(): string {
    return "";
  }
}
