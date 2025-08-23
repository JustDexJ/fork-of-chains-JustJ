export default class AllUnitSatisfyDo extends Cost {
  constructor(
    public requirement: Restriction[],
    public dowhat: Cost[],
  ) {
    super();
  }

  override text(): string {
    return `setup.qc.AllUnitSatisfyDo([${this.requirement.map((res) => res.text()).join(", ")}],\n[${this.dowhat.map((cost) => cost.text()).join(", ")}],\n)`;
  }

  override apply(context: CostContext) {
    for (const unit of Object.values(State.variables.unit)) {
      if (setup.RestrictionLib.isUnitSatisfy(unit, this.requirement)) {
        let name: string | null = null;
        if (context && "getName" in context) {
          name = context.getName!();
        }
        setup.RestrictionLib.applyAll(
          this.dowhat,
          setup.costUnitHelperDict(
            {
              unit: unit,
            },
            name,
          ),
        );
      }
    }
  }

  override explain(context: CostContext): string {
    return `<div class='card livingcard'>For all units that satisfy: ${this.requirement.map((r) => r.explain()).join(", ")} <br/> do:
      <br/>
      ${this.dowhat.map((cost) => `${cost.explain()}<br/>`).join("")}
    </div>`;
  }

  getLayout() {
    return {
      css_class: "card livingcard",
      blocks: [
        {
          passage: "CostAllUnitSatisfyDo_IfHeader",
          addpassage: "QGAddRestrictionUnit",
          listpath: ".requirement", // one item instead of a list
        },
        {
          passage: "CostAllUnitSatisfyDo_ThenHeader",
          addpassage: "QGAddCostUnit",
          listpath: ".dowhat",
        },
      ],
    };
  }
}
