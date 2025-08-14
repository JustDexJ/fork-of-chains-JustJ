export default class HasTag extends Restriction.Unit {
  constructor(public tag_name: string) {
    super();
  }

  override text() {
    return `setup.qres.HasTag('${this.tag_name}')`;
  }

  override explain() {
    if (!("devtooltype" in State.variables)) {
      const eligible = State.variables.company.player.getUnits({
        tag: this.tag_name,
      });
      if (!eligible.length) {
        return setup.DOM.toString(setup.DOM.Text.danger("No eligible unit"));
      } else {
        return eligible.map((unit) => unit.rep()).join(" or ");
      }
    } else {
      let tagname = this.tag_name;
      return `Unit ${tagname}`;
    }
  }

  override isOk(unit: Unit): boolean {
    return unit.isHasTag(this.tag_name);
  }
}
