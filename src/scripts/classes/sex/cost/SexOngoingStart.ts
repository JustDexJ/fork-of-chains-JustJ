import type { SexAction } from "../action/SexAction";

export default class SexOngoingStart extends SexCost {
  constructor(
    public my_actor_name: string,
    public my_bodypart: SexBodypart,
    public their_actor_name: string,
    public their_bodypart: SexBodypart,
  ) {
    super();
  }

  override apply(action: SexAction) {
    const me = action.getActorUnit(this.my_actor_name);
    const them = action.getActorUnit(this.their_actor_name);
    this.sex.setOngoing(me, this.my_bodypart, them, this.their_bodypart);
  }

  override explain() {
    return `${this.my_actor_name}'s ${this.my_bodypart.getTitle()} start penetrating ${this.their_actor_name}'s ${this.their_bodypart.getTitle()}`;
  }
}
