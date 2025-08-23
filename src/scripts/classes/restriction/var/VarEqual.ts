export default class VarEqual extends Restriction {
  constructor(
    public key: string,
    public value: any,
  ) {
    super();
  }

  static NAME = "Variable equals something";
  static PASSAGE = "RestrictionVarEqual";

  override text(): string {
    if (setup.isString(this.value)) {
      return `setup.qres.VarEqual('${this.key}', '${this.value}')`;
    } else {
      return `setup.qres.VarEqual('${this.key}', ${this.value})`;
    }
  }

  override explain(): string {
    return `Variable "${this.key}" must equals "${this.value}"`;
  }

  override isOk(): boolean {
    return State.variables.varstore.get(this.key) == this.value;
  }
}
