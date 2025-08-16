import { SexPosition } from "../SexPosition";

export default class Center extends SexPosition {
  constructor() {
    super(
      "center",
      [
        /* tags */
      ],
      "Center",
      "Center",
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
      const room = sex.getLocation().repRoom(sex);
      return [`a|Rep a|move to the center of the ${room}.`];
    }
  }

  override getDefaultPose(): SexPose {
    return setup.sexpose.lieup;
  }

  override getRelativePosition(position: SexPosition): string {
    if (position == setup.sexposition.top) {
      return `under`;
    } else {
      return `in front of`;
    }
  }
}
