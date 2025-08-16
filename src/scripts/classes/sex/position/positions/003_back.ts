import { SexPosition } from "../SexPosition";

export default class Back extends SexPosition {
  constructor() {
    super(
      "back",
      [
        /* tags */
      ],
      "Back",
      "Back",
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
      return [`a|Rep a|move to behind of c|rep.`];
    }
  }

  override getRelativePosition(position: SexPosition): string {
    if ((position = setup.sexposition.front)) {
      return `far from`;
    } else {
      return `behind`;
    }
  }
}
