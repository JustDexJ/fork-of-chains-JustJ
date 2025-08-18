export default class Function<T> extends Restriction<T> {
  constructor(
    public func: (context: T) => boolean,
    public display_text?: string,
  ) {
    super();
  }

  override text() {
    let text = this.func.toString();
    return `setup.qres.Function(
      ${text},
      ${JSON.stringify(this.display_text)},
    )`;
  }

  override isOk(context: T): boolean {
    return this.func(context);
  }

  override explain() {
    return this.display_text || `Runs a custom function`;
  }
}
