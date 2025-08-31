import type { SexAction } from "../action/SexAction";

export default class SexIsOngoing extends SexRestriction {
  constructor(
    public my_actor_name: string,
    public my_bodypart: SexBodypart,
    public their_actor_name: string,
    public their_bodypart: SexBodypart,
  ) {
    super();
  }

  override explain() {
    const my_name = this.getActorDisplayName(this.my_actor_name);
    const their_name = this.getActorDisplayName(this.their_actor_name);
    return `${my_name}'s ${this.my_bodypart.repsimple()} is penetrating ${their_name}'s ${this.their_bodypart.repsimple()}`;
  }

  override isOk(action: SexAction) {
    const me = action.getActorUnit(this.my_actor_name);
    const them = action.getActorUnit(this.their_actor_name);
    const target = this.sex.getBodypartPenetrationTarget(me, this.my_bodypart);
    return (
      !!target && target.unit == them && target.bodypart == this.their_bodypart
    );
  }
}
