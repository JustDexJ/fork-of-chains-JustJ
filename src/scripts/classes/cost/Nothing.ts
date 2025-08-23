export default class Nothing extends Cost {
  constructor() {
    super();
  }

  override text(): string {
    return "setup.qc.Nothing()";
  }

  override isOk(): boolean {
    throw new Error(`"Nothing" cannot be used as a cost`);
  }

  override apply(context: CostContext) {}

  override undoApply() {}

  override explain(): string {
    return `Nothing happened.`;
  }
}
