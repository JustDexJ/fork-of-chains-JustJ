export default class Not<T = unknown> extends Restriction<T> {
  constructor(public requirement: Restriction<T>) {
    super();
  }

  override text(): string {
    return `setup.qres.Not(${this.requirement.text()})`;
  }

  override isOk(context: T): boolean {
    return !this.requirement.isOk(context);
  }

  override explain(context?: T): string {
    return `Must be false: (${this.requirement.explain(context)})`;
  }

  getLayout() {
    return {
      blocks: [
        {
          passage: "RestrictionNotHeader",
          //addpassage: "", // inherit
          entrypath: ".requirement",
        },
      ],
    };
  }
}
