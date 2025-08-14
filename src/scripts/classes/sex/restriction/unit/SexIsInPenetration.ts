export default class SexIsInPenetration extends SexRestriction {
  constructor(public my_bodypart?: SexBodypart) {
    super();
  }

  override explain() {
    if (this.my_bodypart) {
      return `${this.my_bodypart.repsimple()} is involved in some penetration`;
    } else {
      return `Is involved in a penetration`;
    }
  }

  override isOk(unit: Unit) {
    return (
      setup.qres.SexIsBeingPenetrated(this.my_bodypart).isOk(unit) ||
      setup.qres.SexIsPenetrating(this.my_bodypart).isOk(unit)
    );
  }
}
