export default class SexPoseCanChangeTo extends SexRestriction {
  constructor(public pose: SexPose) {
    super();
  }

  override explain() {
    return `Can switch to ${this.pose.rep()}`;
  }

  override isOk(unit: Unit) {
    return (
      this.sex.getPose(unit) !== this.pose &&
      this.pose.isAllowed(unit, this.sex)
    );
  }
}
