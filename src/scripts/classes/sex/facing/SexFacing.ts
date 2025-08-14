import { TwineClassCustom } from "../../_TwineClass";

/**
 * Where a bodypart faces. For aligning bodyparts for actions, e.g., mouth and dick to align for a blowjob.
 * How this work: look at this diagram:
 *
 *            [ unit4 ]
 * [ unit1 ]  [ unit2 ]  [ unit3 ]
 *  front->    <-front    <-front
 *
 * This is done like this instead of unit1 turning back so that it can accomodate 3 people.
 */
export class SexFacing extends TwineClassCustom {
  constructor(public key: string) {
    super();
  }

  override getContainer(): string {
    return `setup.SexFacingClass`;
  }

  getOpposite(): SexFacing {
    return setup.sexfacing.front;
  }

  /**
   * Whether this facing is facing up or down, not forward/bakcwards
   */
  isUpDown(): boolean {
    return this.isUp() || this.isDown();
  }

  /**
   * Whether this facing is front-ish, not back-ish
   */
  isFrontIsh(): boolean {
    return false;
  }

  /**
   * Whether this facing is upwards
   */
  isUp(): boolean {
    return true;
  }

  /**
   * Whether this facing is downwards
   */
  isDown(): boolean {
    return true;
  }
}
