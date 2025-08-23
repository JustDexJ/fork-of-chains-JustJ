export default class Or<T = unknown> extends Restriction<T> {
  constructor(public requirements: Restriction<T>[]) {
    super();

    // true as long as one of the requirements is true.

    if (!Array.isArray(requirements))
      throw new Error(
        `First element of setup.qres.Or must be array, not ${requirements}`,
      );
  }

  override text(): string {
    return `setup.qres.Or([\n${this.requirements.map((a) => a.text()).join(",\n")}\n])`;
  }

  override isOk(context: T): boolean {
    for (let i = 0; i < this.requirements.length; ++i) {
      if (this.requirements[i].isOk(context)) return true;
    }
    return false;
  }

  override explain(context?: T): string {
    let texts = [];
    for (let i = 0; i < this.requirements.length; ++i)
      texts.push(this.requirements[i].explain(context));
    return `OR(${texts.join(", ")})`;
  }

  getLayout() {
    return {
      css_class: "card lorecard",
      blocks: [
        {
          passage: "RestrictionOrHeader",
          //addpassage: "", // inherit
          listpath: ".requirements",
        },
      ],
    };
  }
}
