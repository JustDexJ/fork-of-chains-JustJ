export default class VarLte extends Restriction {
  constructor(
    public key: string,
    public value: number,
  ) {
    super();
  }

  static NAME = "Variable <= something";
  static PASSAGE = "RestrictionVarLte";

  override text(): string {
    return `setup.qres.VarLte('${this.key}', ${this.value})`;
  }

  override explain(): string {
    return `Variable "${this.key}" must <= ${this.value}`;
  }

  override isOk(): boolean {
    return +(State.variables.varstore.get(this.key) || 0) <= this.value;
  }
}
