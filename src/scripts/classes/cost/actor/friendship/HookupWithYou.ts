/**
 * Hooks up a unit with you, breaking their existing lovers if any
 */
export default class HookupWithYou extends Cost {
  constructor(public actor_name: string) {
    super();
  }

  override text(): string {
    return `setup.qc.HookupWithYou('${this.actor_name}')`;
  }

  override apply(context: CostContext) {
    let unit = context.getActorUnit(this.actor_name)!;
    setup.qc.Hookup("unit", "you").apply(
      setup.costUnitHelperDict({
        unit: unit,
        you: State.variables.unit.player,
      }),
    );
  }

  override explain(context: CostContext): string {
    return `${this.actor_name} becomes your lover, breaking up with any existing units if any`;
  }
}
