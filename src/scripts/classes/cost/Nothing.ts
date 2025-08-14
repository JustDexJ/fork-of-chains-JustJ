export default class Nothing extends Cost {
  constructor() {
    super();
  }

  override text() {
    return "setup.qc.Nothing()";
  }

  override isOk(): boolean {
    throw new Error(`"Nothing" cannot be used as a cost`);
  }

  override apply(context: CostContext) {}

  override undoApply() {}

  override explain() {
    return `Nothing happened.`;
  }
}
