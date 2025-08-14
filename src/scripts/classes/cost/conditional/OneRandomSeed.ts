/**
 * Gives one of the costs as reward, at random, based on the quest's seed value.
 */
export default class OneRandomSeed extends Cost {
  constructor(public costs: Cost[]) {
    super();

    this.costs = costs;
  }

  override text() {
    let texts = [];
    for (let i = 0; i < this.costs.length; ++i) {
      texts.push(this.costs[i].text());
    }
    return `setup.qc.OneRandomSeed([\n${texts.join(",\n")}\n])`;
  }

  getSeededCost(context: CostContext): Cost {
    let seed = context.getSeed ? context.getSeed() : 0;
    return this.costs[seed % this.costs.length];
  }

  override apply(context: CostContext) {
    const cost = this.getSeededCost(context);
    return cost.apply(context);
  }

  override explain(context: CostContext) {
    if (context) {
      const cost = this.getSeededCost(context);
      return cost.explain(context);
    }
    let texts = [];
    for (let i = 0; i < this.costs.length; ++i) {
      texts.push(this.costs[i].explain());
    }
    return `<div class='card lorecard'> A random (SEEDED) effect out of:<br/>${texts.join("<br/>")}</div>`;
  }

  getLayout() {
    return {
      css_class: "card lorecard",
      blocks: [
        {
          passage: "CostOneRandomSeedHeader",
          // addpassage: "QGAddCostActual",
          listpath: ".costs",
        },
      ],
    };
  }

  override isOk(context: CostContext): boolean {
    const cost = this.getSeededCost(context);
    return cost.isOk(context);
  }

  override undoApply(context: CostContext) {
    const cost = this.getSeededCost(context);
    cost.undoApply(context);
  }
}
