import type { SexBodypart } from "../../bodypart/SexBodypart";

export default class SexIsOngoingWithAnyone extends SexRestriction {
  constructor(
    public my_bodypart: SexBodypart,
    public their_bodypart: SexBodypart,
  ) {
    super();
  }

  override explain() {
    return `${this.my_bodypart.repsimple()} is penetrating ${this.their_bodypart.repsimple()}`;
  }

  override isOk(unit: Unit) {
    const target = this.sex.getBodypartPenetrationTarget(
      unit,
      this.my_bodypart,
    );
    return !!target && target.bodypart == this.their_bodypart;
  }
}
