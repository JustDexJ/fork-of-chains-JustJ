export default class SexIsBodypartUncovered extends SexRestriction {
  constructor(public bodypart: SexBodypart) {
    super();
  }

  override explain() {
    return `${this.bodypart.repsimple()} is uncovered`;
  }

  override isOk(unit: Unit) {
    return !this.sex.getCoveringEquipment(unit, this.bodypart);
  }
}
