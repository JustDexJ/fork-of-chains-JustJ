export default class ExistUnit extends Restriction {
  constructor(
    public restrictions: Restriction[],
    public amount: number = 1,
  ) {
    super();
  }

  override text() {
    let texts = this.restrictions.map((a) => a.text());
    return `setup.qres.ExistUnit([<br/>${texts.join(",<br/>")}<br/>], ${this.amount})`;
  }

  override explain(context?: unknown) {
    let texts = this.restrictions.map((a) => a.explain(context));
    return `Must EXIST at least ${this.amount} units with: [ ${texts.join(" ")} ]`;
  }

  override isOk() {
    let hits = 0;
    for (const unit of Object.values(State.variables.unit)) {
      if (setup.RestrictionLib.isUnitSatisfy(unit, this.restrictions))
        hits += 1;
      if (hits >= this.amount) return true;
    }
    return false;
  }

  getLayout() {
    return {
      css_class: "marketobjectcard",
      blocks: [
        {
          passage: "RestrictionExistUnitHeader",
          addpassage: "QGAddRestrictionUnit",
          listpath: ".restrictions",
        },
      ],
    };
  }
}
