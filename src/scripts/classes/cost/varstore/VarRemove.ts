export default class VarRemove extends Cost {
  constructor(public key: string) {
    super();
  }

  static NAME = "Remove a variable value";
  static PASSAGE = "CostVarRemove";

  override text() {
    return `setup.qc.VarRemove('${this.key}')`;
  }

  override apply(context: CostContext) {
    State.variables.varstore.remove(this.key);
  }

  override explain(context: CostContext) {
    if (!State.variables.gDebug) {
      return "";
    }
    return `Variable "${this.key}" is removed.`;
  }
}
