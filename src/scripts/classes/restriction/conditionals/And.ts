export default class And<T = unknown> extends Restriction<T> {
  constructor(public requirements: Restriction<T>[]) {
    super();

    // true if all requirements are true

    if (!Array.isArray(requirements))
      throw new Error(
        `First element of setup.qres.And must be array, not ${requirements}`,
      );
  }

  override text(): string {
    return `setup.qres.And([\n${this.requirements.map((a) => a.text()).join(",\n")}\n])`;
  }

  override isOk(context: T): boolean {
    for (let i = 0; i < this.requirements.length; ++i) {
      if (!this.requirements[i].isOk(context)) return false;
    }
    return true;
  }

  override explain(context?: T): string {
    let texts = [];
    for (let i = 0; i < this.requirements.length; ++i)
      texts.push(this.requirements[i].explain(context));
    return `AND(${texts.join(", ")})`;
  }

  getLayout() {
    return {
      css_class: "companycard",
      blocks: [
        {
          passage: "RestrictionAndHeader",
          //addpassage: "", // inherit
          listpath: ".requirements",
        },
      ],
    };
  }
}
