export default class IfThenElse extends Cost {
  constructor(
    public requirement: Restriction,
    public thenwhat: Cost,
    public elsewhat?: Cost,
  ) {
    super();
  }

  override text(): string {
    if (this.elsewhat) {
      return `setup.qc.IfThenElse(\n${this.requirement.text()},\n${this.thenwhat.text()},\n${this.elsewhat.text()})`;
    } else {
      return `setup.qc.IfThenElse(${this.requirement.text()},\n${this.thenwhat.text()},\nnull)`;
    }
  }

  override isOk(context: CostContext): boolean {
    if (this.requirement.isOk(context)) {
      return this.thenwhat.isOk(context);
    } else {
      if (!this.elsewhat) return true;
      return this.elsewhat.isOk(context);
    }
  }

  override apply(context: CostContext) {
    if (this.requirement.isOk(context)) {
      return this.thenwhat.apply(context);
    } else {
      if (!this.elsewhat) return;
      return this.elsewhat.apply(context);
    }
  }

  override explain(context: CostContext): string {
    if (this.elsewhat) {
      return `<div class='card livingcard'> If ${this.requirement.explain()} <br/> then: ${this.thenwhat.explain()} <br/> else: ${this.elsewhat.explain()}</div>`;
    } else {
      return `<div class='card livingcard'> If ${this.requirement.explain()} <br/> then: ${this.thenwhat.explain()}</div>`;
    }
  }

  getLayout() {
    return {
      css_class: "card livingcard",
      blocks: [
        {
          passage: "CostIfThenElse_IfHeader",
          addpassage: "QGAddRestriction",
          entrypath: ".requirement", // one item instead of a list
          sameline: true,
        },
        {
          passage: "CostIfThenElse_ThenHeader",
          entrypath: ".thenwhat",
        },
        {
          passage: "CostIfThenElse_ElseHeader",
          entrypath: ".elsewhat",
        },
      ],
    };
  }
}
