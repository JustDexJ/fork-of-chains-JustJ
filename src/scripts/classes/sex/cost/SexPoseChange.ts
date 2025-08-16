export default class SexPoseChange extends SexCost {
  constructor(
    public actor_name: string,
    public pose: SexPose,
  ) {
    super();
  }

  override apply(action: SexAction) {
    const unit = action.getActorUnit(this.actor_name);

    // First, remove all ongoing penetrations involving unit
    this.sex.clearOngoing(unit);

    // Finally, move unit to new posse
    this.sex.setPose(unit, this.pose);

    // Describe genital proximity
    this.sex
      .getScene()
      .appendText(setup.SexText.proximityDescription(unit, this.sex));
  }

  override explain() {
    return `Switch pose to ${this.pose.rep()}`;
  }
}
