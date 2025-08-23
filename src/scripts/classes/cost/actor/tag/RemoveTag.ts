export default class RemoveTag extends Cost {
  constructor(
    public actor_name: string,
    public tag_name: string,
  ) {
    super();
  }

  static NAME = "Remove a tag / flag from a unit.";
  static PASSAGE = "CostRemoveTag";
  static UNIT = true;

  override text(): string {
    return `setup.qc.RemoveTag('${this.actor_name}', '${this.tag_name}')`;
  }

  override apply(context: CostContext) {
    let unit = context.getActorUnit(this.actor_name)!;
    unit.removeTag(this.tag_name);
  }

  override explain(context: CostContext): string {
    return `${this.actor_name} loses a tag: "${this.tag_name}"`;
  }
}
