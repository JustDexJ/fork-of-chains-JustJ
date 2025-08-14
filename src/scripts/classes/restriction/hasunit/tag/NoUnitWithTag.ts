export default class NoUnitWithTag extends Restriction {
  constructor(public tag_name: string) {
    super();
  }

  static NAME = "Does not exists any unit that has the given tag";
  static PASSAGE = "RestrictionNoUnitWithTag";
  static UNIT = true;

  override text() {
    return `setup.qres.NoUnitWithTag('${this.tag_name}')`;
  }

  override explain() {
    let tagname = this.tag_name;
    return `Must NOT exists any unit (anywhere in the world, not only in your company) with tag/flag: "${tagname}"`;
  }

  override isOk() {
    for (const unit of Object.values(State.variables.unit)) {
      if (unit.isHasTag(this.tag_name)) return false;
    }
    return true;
  }
}
