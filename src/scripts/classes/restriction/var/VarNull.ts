export default class VarNull extends Restriction {
  constructor(public key: string) {
    super();
  }

  override text() {
    return `setup.qres.VarNull('${this.key}')`;
  }

  override explain() {
    return `Variable "${this.key}" must be null (unset)`;
  }

  override isOk() {
    return (State.variables.varstore.get(this.key) ?? null) === null;
  }
}
