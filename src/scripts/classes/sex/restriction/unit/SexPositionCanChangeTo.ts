export default class SexPositionCanChangeTo extends SexRestriction {
  constructor(public position: SexPosition) {
    super();
  }

  override explain() {
    return `Can move to ${this.position.rep()}`;
  }

  override isOk(unit: Unit) {
    return (
      this.sex.getPosition(unit) !== this.position &&
      this.position.isAllowed(unit, this.sex)
    );
  }
}
