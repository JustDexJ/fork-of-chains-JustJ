export default class BestFriends extends Restriction.ContentContext {
  constructor(
    public actor_name1: string,
    public actor_name2: string,
  ) {
    super();
  }

  override text(): string {
    return `setup.qres.BestFriends('${this.actor_name1}', '${this.actor_name2}')`;
  }

  override explain(): string {
    return `${this.actor_name1} must be best friends with ${this.actor_name2}`;
  }

  override isOk(context: ContentContext): boolean {
    const unit1 = context.getActorUnit(this.actor_name1)!;
    const unit2 = context.getActorUnit(this.actor_name2)!;
    return unit1.getBestFriend() == unit2;
  }
}
