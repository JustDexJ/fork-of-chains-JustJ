export default class SexBodypartsCanReach extends SexRestriction {
  constructor(
    public my_actor_name: string,
    public my_bodypart: SexBodypart,
    public their_actor_name: string,
    public their_bodypart: SexBodypart,
  ) {
    super();
  }

  override explain() {
    return `${this.my_actor_name}'s ${this.my_bodypart.repsimple()} can reach ${this.their_actor_name}'s ${this.their_bodypart.repsimple()}`;
  }

  override isOk(action: SexAction) {
    const me = action.getActorUnit(this.my_actor_name);
    const them = action.getActorUnit(this.their_actor_name);
    const sex = this.sex;
    const my_position = sex.getPosition(me);
    const their_position = sex.getPosition(them);
    return this.my_bodypart.isCanInteractWith(
      this.sex.getPosition(me),
      this.sex.getPose(me).getFacingHeight(this.my_bodypart, my_position, sex),
      this.their_bodypart,
      this.sex.getPosition(them),
      this.sex
        .getPose(them)
        .getFacingHeight(this.their_bodypart, their_position, sex),
    );
  }
}
