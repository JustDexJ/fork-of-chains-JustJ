export default class AddTag extends Cost {
  constructor(
    public actor_name: string,
    public tag_name: string,
  ) {
    super();
  }

  static NAME = "Add a tag / flag to a unit.";
  static PASSAGE = "CostAddTag";
  static UNIT = true;

  override text() {
    return `setup.qc.AddTag('${this.actor_name}', '${this.tag_name}')`;
  }

  override apply(context: CostContext) {
    let unit = context.getActorUnit(this.actor_name)!;
    unit.addTag(this.tag_name);
  }

  override explain(context: CostContext) {
    return `${this.actor_name} gains a tag: "${this.tag_name}"`;
  }
}
