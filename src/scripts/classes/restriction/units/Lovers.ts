export default class Lovers extends Restriction.ContentContext {
  constructor(
    public actor_name1: string,
    public actor_name2: string,
  ) {
    super();
  }

  override text() {
    return `setup.qres.Lovers('${this.actor_name1}', '${this.actor_name2}')`;
  }

  override explain(context?: ContentContext) {
    return `${this.actor_name1} must be lovers with ${this.actor_name2}`;
  }

  override isOk(context: ContentContext) {
    const unit1 = context.getActorUnit(this.actor_name1)!;
    const unit2 = context.getActorUnit(this.actor_name2)!;
    return unit1.getBestFriend() == unit2;
  }
}
