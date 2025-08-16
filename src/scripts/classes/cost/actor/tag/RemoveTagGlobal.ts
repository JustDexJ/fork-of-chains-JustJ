/**
 * Remove the specified tag from ALL units
 */
export default class RemoveTagGlobal extends Cost {
  constructor(public tag_name: string) {
    super();
  }

  static NAME = "Remove a tag / flag from ALL unit.";
  static PASSAGE = "CostRemoveTagGlobal";

  override text() {
    return `setup.qc.RemoveTagGlobal('${this.tag_name}')`;
  }

  override apply(context: CostContext) {
    for (const unit of Object.values(State.variables.unit)) {
      unit.removeTag(this.tag_name);
    }
  }

  override explain(context: CostContext) {
    let tagname = this.tag_name;
    return `All units loses: "${tagname}"`;
  }
}
