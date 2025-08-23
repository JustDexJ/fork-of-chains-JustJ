export default class DoAll extends Cost {
  constructor(
    public costs: Cost[],
    public probability?: number,
  ) {
    super();

    if (!Array.isArray(costs))
      throw new Error(
        `First element of setup.qc.DoAll must be array, not ${costs}`,
      );
  }

  override text(): string {
    return `setup.qc.DoAll([\n${this.costs.map((a) => a.text()).join(",\n")}\n], ${this.probability})`;
  }

  override apply(context: CostContext) {
    if (this.probability === undefined || Math.random() < this.probability) {
      for (let i = 0; i < this.costs.length; ++i) {
        this.costs[i].apply(context);
      }
    }
  }

  override explain(context: CostContext): string {
    let _prob = "";
    if (this.probability !== undefined)
      _prob = ` (with ${(this.probability * 100).toFixed(1)}% chance)`;
    return `<div class='bedchambercard'>Do all:${_prob}<br/> ${this.costs.map((a) => a.explain(context)).join("<br/>")}</div>`;
  }

  getLayout() {
    return {
      css_class: "bedchambercard",
      blocks: [
        {
          passage: "CostDoAllHeader",
          listpath: ".costs",
        },
      ],
    };
  }

  override isOk(context: CostContext): boolean {
    if (this.probability) {
      throw new Error(`DoAll with probability is not a cost`);
    }
    for (const cost of this.costs) {
      if (!cost.isOk(context)) return false;
    }
    return true;
  }

  override undoApply(context: CostContext) {
    if (this.probability) {
      throw new Error(`DoAll with probability is not undo-able`);
    }
    for (const cost of this.costs) {
      cost.undoApply(context);
    }
  }
}
