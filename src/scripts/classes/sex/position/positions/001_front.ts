import { SexPosition } from "../SexPosition";

export default class Front extends SexPosition {
  constructor() {
    super(
      "front",
      [
        /* tags */
      ],
      "Front",
      "Front",
    );
  }

  /**
   * Describes what happens when a unit moves to this position. Assumes it's empty.
   */
  override rawDescribe(unit: Unit, sex: SexInstance) {
    const swap_with = sex.getUnitAtPosition(this);
    if (swap_with) {
      return [
        `a|Rep a|swap positions with b|rep.`,
        `a|Rep a|exchange positions with b|rep.`,
      ];
    } else {
      return [`a|Rep a|move to in front of c|rep.`];
    }
  }

  override isFacingRight(): boolean {
    return true;
  }

  override getRelativePosition(position: SexPosition): string {
    if ((position = setup.sexposition.back)) {
      return `far from`;
    } else {
      return `in front of`;
    }
  }
}
