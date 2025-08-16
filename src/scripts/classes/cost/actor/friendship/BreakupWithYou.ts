/**
 * Breaks up a unit with you
 */
export default class BreakupWithYou extends Cost {
  constructor(public actor_name: string) {
    super();
  }

  override text() {
    return `setup.qc.BreakupWithYou('${this.actor_name}')`;
  }

  override apply(context: CostContext) {
    let unit = context.getActorUnit(this.actor_name)!;
    setup.qc.Breakup("unit", "you").apply(
      setup.costUnitHelperDict({
        unit: unit,
        you: State.variables.unit.player,
      }),
    );
  }

  override explain(context: CostContext) {
    return `You break up with ${this.actor_name}, if you were lovers`;
  }
}
