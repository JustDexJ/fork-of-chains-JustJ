/**
 * True if its restriction is true.
 *
 * Useful to circumvent missing items causing a building to not be displayed in the building menu. and masking text
 */
export default class Through<T = unknown> extends Restriction<T> {
  constructor(
    public requirement: Restriction,
    public explain_text?: string,
  ) {
    super();
  }

  override text(): string {
    return `setup.qres.Through(${this.requirement.text()}, '${this.explain_text || ""}')`;
  }

  override isOk(context: T): boolean {
    return this.requirement.isOk(context);
  }

  override explain(context?: T): string {
    if (
      !State.variables.gDebug &&
      (this.explain_text || this.explain_text == "HIDE")
    ) {
      return `${this.explain_text || ""}`;
    } else {
      return `${this.explain_text ? `[${this.explain_text}] ` : ""}${this.requirement.explain(context)}`;
    }
  }

  getLayout() {
    return {
      blocks: [
        {
          passage: "RestrictionThroughHeader",
          //addpassage: "", // inherit
          entrypath: ".requirement",
        },
      ],
    };
  }
}
