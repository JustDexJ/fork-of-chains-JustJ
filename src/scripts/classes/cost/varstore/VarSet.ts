export default class VarSet extends Cost {
  constructor(
    public key: string,
    public value: string | number,
    public expires: number = -1,
  ) {
    super();
  }

  override text() {
    return `setup.qc.VarSet('${this.key}', ${JSON.stringify(this.value)}, ${this.expires})`;
  }

  override apply(context: CostContext) {
    State.variables.varstore.set(this.key, this.value, this.expires);
  }

  override explain(context: CostContext) {
    if (context) return ""; // ???
    return `Variable "${this.key}" is set to "${this.value}" for ${this.expires} weeks.`;
  }
}
