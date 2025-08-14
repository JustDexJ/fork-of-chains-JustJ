import type { Unit } from "../../../unit/Unit";
import type { SexBodypart } from "../../bodypart/SexBodypart";

export default class SexIsPenetrating extends SexRestriction {
  constructor(public my_bodypart?: SexBodypart) {
    super();
  }

  override explain() {
    if (this.my_bodypart) {
      return `${this.my_bodypart.repsimple()} is penetrating something`;
    } else {
      return `Is penetrating something`;
    }
  }

  override isOk(unit: Unit) {
    if (this.my_bodypart) {
      return !!this.sex.getBodypartPenetrationTarget(unit, this.my_bodypart);
    } else {
      return this.sex.isPenetrating(unit);
    }
  }
}
