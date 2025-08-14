export default class SameGender extends Restriction.ContentContext {
  constructor(
    public actor_name1: string,
    public actor_name2: string,
  ) {
    super();
  }

  override text() {
    return `setup.qres.SameGender('${this.actor_name1}', '${this.actor_name2}')`;
  }

  override explain(context?: ContentContext) {
    if (context) {
      const unit1 = context.getActorUnit(this.actor_name1)!;
      const unit2 = context.getActorUnit(this.actor_name2)!;
      return `${unit1.rep()} and ${unit2.rep()} must be of the same gender`;
    } else {
      return `${this.actor_name1} and ${this.actor_name2} must be of the same gender`;
    }
  }

  override isOk(context: ContentContext): boolean {
    const unit1 = context.getActorUnit(this.actor_name1)!;
    const unit2 = context.getActorUnit(this.actor_name2)!;
    return unit1.getGender() == unit2.getGender();
  }
}
