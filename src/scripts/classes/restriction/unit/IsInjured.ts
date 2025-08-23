export default class IsInjured extends Restriction.Unit {
  constructor(public min_duration?: number) {
    super();
  }

  override text(): string {
    return `setup.qres.IsInjured(${this.min_duration})`;
  }

  override explain(): string {
    if (!this.min_duration) {
      return `Unit must be injured`;
    } else {
      return `Unit must be injured for at least ${this.min_duration} weeks`;
    }
  }

  override isOk(unit: Unit): boolean {
    if (!this.min_duration) {
      return State.variables.hospital.isInjured(unit);
    } else {
      return State.variables.hospital.getInjury(unit) >= this.min_duration;
    }
  }
}
