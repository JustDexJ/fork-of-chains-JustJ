export default class SexOngoingEnd extends SexCost {
  constructor(
    public my_actor_name: string,
    public my_bodypart: SexBodypart,
  ) {
    super();
    this.my_actor_name = my_actor_name;
    this.my_bodypart = my_bodypart;
  }

  override apply(action: SexAction) {
    const me = action.getActorUnit(this.my_actor_name);
    this.sex.cancelOngoing(me, this.my_bodypart);
  }

  override explain() {
    return `${this.my_actor_name}'s ${this.my_bodypart.getTitle()} stops penetrating`;
  }
}
