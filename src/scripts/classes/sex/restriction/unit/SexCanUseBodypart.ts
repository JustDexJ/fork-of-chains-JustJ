export default class SexCanUseBodypart extends SexRestriction {
  constructor(public bodypart: SexBodypart) {
    super();
  }

  override explain() {
    return `Can use ${this.bodypart.repsimple()}`;
  }

  override isOk(unit: Unit) {
    return this.sex.isCanUse(unit, this.bodypart);
  }
}
