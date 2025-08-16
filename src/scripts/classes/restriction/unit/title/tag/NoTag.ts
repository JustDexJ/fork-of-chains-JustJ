export default class NoTag extends Restriction.Unit {
  constructor(public tag_name: string) {
    super();
  }

  static NAME = "Do NOT have a tag / flag";
  static PASSAGE = "RestrictionNoTag";
  static UNIT = true;

  override text() {
    return `setup.qres.NoTag('${this.tag_name}')`;
  }

  override explain() {
    let tagname = this.tag_name;
    return `Must NOT have tag/flag: "${tagname}"`;
  }

  override isOk(unit: Unit): boolean {
    return !unit.isHasTag(this.tag_name);
  }
}
