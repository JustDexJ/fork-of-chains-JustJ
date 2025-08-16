export default class SexPaceIn extends SexRestriction {
  constructor(public paces: SexPace[]) {
    super();
  }

  override explain() {
    return `Pace: ${this.paces.map((pace) => pace.rep()).join(", ")}`;
  }

  override isOk(unit: Unit) {
    return this.paces.includes(this.sex.getPace(unit));
  }
}
