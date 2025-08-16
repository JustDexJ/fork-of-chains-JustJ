export default class ExistUnitWithTag extends Restriction {
  constructor(public tag_name: string) {
    super();
  }

  override text() {
    return `setup.qres.ExistUnitWithTag('${this.tag_name}')`;
  }

  override explain() {
    let tagname = this.tag_name;
    return `Must EXIST any unit (anywhere in the world, not only in your company) with tag/flag: "${tagname}"`;
  }

  override isOk() {
    for (const unit of Object.values(State.variables.unit)) {
      if (unit.isHasTag(this.tag_name)) return true;
    }
    return false;
  }
}
