export default class VarAdd extends Cost {
  constructor(
    public key: string,
    public value: number,
    public expires: number = -1,
  ) {
    super();
  }

  override text() {
    return `setup.qc.VarAdd('${this.key}', ${this.value}, ${this.expires})`;
  }

  override apply(context: CostContext) {
    let old_value = State.variables.varstore.get<any>(this.key);
    let new_value = (isNaN(old_value) ? 0 : old_value) + this.value;

    State.variables.varstore.set(this.key, new_value, this.expires);
  }

  override explain(context: CostContext) {
    if (context) return ""; // ???
    return `Variable "${this.key}" is added by "${this.value}" and reset expiration to ${this.expires} weeks.`;
  }
}
