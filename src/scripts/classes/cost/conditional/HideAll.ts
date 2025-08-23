/**
 * Hide the costs from the user by masking its description.
 */
export default class HideAll extends Cost {
  constructor(
    public costs: Cost[],
    public explanation_text: string,
  ) {
    super();

    if (!Array.isArray(costs))
      throw new Error(
        `First element of setup.qc.HideAll must be array, not ${costs}`,
      );
  }

  override text(): string {
    return `setup.qc.HideAll([\n${this.costs.map((a) => a.text()).join(",\n")}\n], "${setup.escapeJsString(this.explanation_text)}")`;
  }

  override apply(context: CostContext) {
    for (let i = 0; i < this.costs.length; ++i) {
      this.costs[i].apply(context);
    }
  }

  override explain(context: CostContext): string {
    return this.explanation_text;
  }

  getLayout() {
    return {
      css_class: "bedchambercard",
      blocks: [
        {
          passage: "CostHideAllHeader",
          listpath: ".costs",
        },
      ],
    };
  }
}
