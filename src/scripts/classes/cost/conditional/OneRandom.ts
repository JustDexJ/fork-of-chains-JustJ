/** Gives one of the costs as reward, at random. */
export default class OneRandom extends Cost {
  constructor(public costs: Cost[]) {
    super();
  }

  override text() {
    let texts: string[] = [];
    for (let i = 0; i < this.costs.length; ++i) {
      texts.push(this.costs[i].text());
    }
    return `setup.qc.OneRandom([\n${texts.join(",\n")}\n])`;
  }

  override isOk(context: CostContext): boolean {
    for (let i = 0; i < this.costs.length; ++i) {
      if (!this.costs[i].isOk(context)) return false;
    }
    return true;
  }

  override apply(context: CostContext) {
    let cost = setup.rng.choice(this.costs);
    return cost.apply(context);
  }

  override explain(context: CostContext) {
    let texts = [];
    for (let i = 0; i < this.costs.length; ++i) {
      texts.push(this.costs[i].explain());
    }
    return `<div class='card lorecard'> A random effect out of:<br/>${texts.join("<br/>")}</div>`;
  }

  getLayout() {
    return {
      css_class: "card lorecard",
      blocks: [
        {
          passage: "CostOneRandomHeader",
          // addpassage: "QGAddCostActual",
          listpath: ".costs",
        },
      ],
    };
  }
}
