export default class VarNull extends Restriction {
  constructor(public key: string) {
    super();
  }

  override text(): string {
    return `setup.qres.VarNull('${this.key}')`;
  }

  override explain(): string {
    return `Variable "${this.key}" must be null (unset)`;
  }

  override isOk(): boolean {
    return (State.variables.varstore.get(this.key) ?? null) === null;
  }
}
