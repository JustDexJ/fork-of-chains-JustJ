export default class NotExistUnit extends Restriction {
  constructor(public restrictions: Restriction[]) {
    super();
  }

  override text(): string {
    let texts = this.restrictions.map((a) => a.text());
    return `setup.qres.NotExistUnit([<br/>${texts.join(",<br/>")}<br/>])`;
  }

  override explain(): string {
    let texts = this.restrictions.map((a) => a.explain());
    return `Must NOT exist any unit with: [ ${texts.join(" ")} ]`;
  }

  override isOk(): boolean {
    for (const unit of Object.values(State.variables.unit)) {
      if (setup.RestrictionLib.isUnitSatisfy(unit, this.restrictions))
        return false;
    }
    return true;
  }

  getLayout() {
    return {
      css_class: "marketobjectcard",
      blocks: [
        {
          passage: "RestrictionNotExistUnitHeader",
          addpassage: "QGAddRestrictionUnit",
          listpath: ".restrictions",
        },
      ],
    };
  }
}
