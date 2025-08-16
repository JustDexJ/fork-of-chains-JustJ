export default class SexArousalAtLeast extends SexRestriction {
  constructor(public arousal: number) {
    super();
  }

  override explain() {
    return `Arousal at least ${this.arousal}`;
  }

  override isOk(unit: Unit) {
    return this.sex.getArousal(unit) >= this.arousal;
  }
}
