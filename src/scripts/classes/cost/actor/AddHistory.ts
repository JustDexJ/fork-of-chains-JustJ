export default class AddHistory extends Cost {
  constructor(
    public actor_name: string,
    public history: string,
  ) {
    super();
  }

  override text() {
    return `setup.qc.AddHistory('${this.actor_name}', "${this.history}")`;
  }

  override apply(context: CostContext) {
    let unit = context.getActorUnit(this.actor_name)!;
    unit.addHistory(this.history, context, true);
    if (unit.isYourCompany()) {
      const parsed = setup.Text.replaceUnitMacros(this.history, { a: unit });
      setup.notify(`An important moment for a|rep as a|they ${parsed}`, {
        a: unit,
      });
    }
  }

  override explain(context: CostContext) {
    return `${this.actor_name} gains a history: "${this.history}"`;
  }
}
