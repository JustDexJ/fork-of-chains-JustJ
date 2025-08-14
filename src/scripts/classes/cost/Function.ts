/**
 * Special cost that runs a JS function, intented for advanced use cases.
 *
 * AVOID USING IT WHEN POSSIBLE: it can cause issues with serialization!
 *
 * Consider implementing a new "Cost" subclass for your use case instead.
 */
export default class Function extends Cost {
  constructor(
    public func: (context: CostContext) => void,
    public display_text?: string,
  ) {
    super();
  }

  override text() {
    let text = this.func.toString();
    return `setup.qc.Function(
      ${text},
      ${JSON.stringify(this.display_text)},
    )`;
  }

  override apply(context: CostContext) {
    this.func(context);
  }

  override explain(context: CostContext) {
    if (this.display_text) {
      return this.display_text;
    }
    return `Runs a custom function`;
  }
}
