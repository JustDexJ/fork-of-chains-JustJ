export default class VarGte extends Restriction {
  constructor(
    public key: string,
    public value: number,
  ) {
    super();
  }

  static NAME = "Variable >= something";
  static PASSAGE = "RestrictionVarGte";

  override text(): string {
    return `setup.qres.VarGte('${this.key}', ${this.value})`;
  }

  override explain(): string {
    return `Variable "${this.key}" must >= ${this.value}`;
  }

  override isOk(): boolean {
    return +(State.variables.varstore.get(this.key) || 0) >= this.value;
  }
}
