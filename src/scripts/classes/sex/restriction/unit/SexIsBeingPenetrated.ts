export default class SexIsBeingPenetrated extends SexRestriction {
  constructor(public my_bodypart?: SexBodypart) {
    super();
    this.my_bodypart = my_bodypart;
  }

  override explain() {
    if (this.my_bodypart) {
      return `${this.my_bodypart.repsimple()} is being penetrated`;
    } else {
      return `Is being penetrated`;
    }
  }

  override isOk(unit: Unit) {
    if (this.my_bodypart) {
      return !!this.sex.getBodypartPenetrator(unit, this.my_bodypart);
    } else {
      return this.sex.isBeingPenetrated(unit);
    }
  }
}
