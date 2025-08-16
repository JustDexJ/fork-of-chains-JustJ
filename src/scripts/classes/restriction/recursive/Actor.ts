export default class Actor extends Restriction.ContentContext {
  constructor(
    public actor_name: string,
    public restriction: Restriction<Unit>,
  ) {
    super();
  }

  static NAME = "Actor satisfies a restriction";
  static PASSAGE = "RestrictionActor";

  override text() {
    return `setup.qres.Actor('${this.actor_name}', ${this.restriction.text()})`;
  }

  override explain(context?: ContentContext) {
    let actor = this.actor_name;
    if (context && context.getActorUnit) {
      let unit = context.getActorUnit(this.actor_name)!;
      if (unit) actor = unit.rep();
    }
    return `${actor}: (${this.restriction.explain()})`;
  }

  override isOk(context: ContentContext) {
    let unit = context.getActorUnit(this.actor_name)!;
    return this.restriction.isOk(unit);
  }

  getLayout() {
    return {
      css_class: "marketobjectcard",
      blocks: [
        {
          passage: "RestrictionActorHeader",
          addpassage: "QGAddRestrictionUnit",
          entrypath: ".restriction",
        },
      ],
    };
  }
}
