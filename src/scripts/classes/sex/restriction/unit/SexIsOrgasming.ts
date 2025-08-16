export default class SexIsOrgasming extends SexRestriction {
  constructor() {
    super();
  }

  override explain() {
    return `About to climax`;
  }

  override isOk(unit: Unit) {
    return this.sex.isOrgasming(unit);
  }
}
