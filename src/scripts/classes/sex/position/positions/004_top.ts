import { SexPosition } from "../SexPosition";

export default class Top extends SexPosition {
  constructor() {
    super(
      "top",
      [
        /* tags */
      ],
      "Top",
      "Top",
    );
  }

  /**
   * Describes what happens when a unit moves to this position. Assumes it's empty.
   */
  override rawDescribe(unit: Unit, sex: SexInstance): string | string[] {
    const swap_with = sex.getUnitAtPosition(this);
    if (swap_with) {
      return [
        `a|Rep a|swap positions with b|rep.`,
        `a|Rep a|exchange positions with b|rep.`,
      ];
    } else {
      return [`a|Rep a|move to top c|rep.`, `a|Rep a|proceed to top c|rep.`];
    }
  }

  override getDefaultPose(): SexPose {
    return setup.sexpose.missionary;
  }

  override getRelativePosition(position: SexPosition): string {
    if (position == setup.sexposition.center) {
      return `on top of`;
    } else {
      return `in front of`;
    }
  }
}
