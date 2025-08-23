/**
 * Frees the player character
 */
export default class FreePlayer extends Cost {
  constructor() {
    super();
  }

  override text(): string {
    return `setup.qc.FreePlayer()`;
  }

  override apply(context: CostContext) {
    // frees yourself from leave
    setup.qc
      .Return("unit")
      .apply(setup.costUnitHelper(State.variables.unit.player));
  }

  override explain(context: CostContext): string {
    return `You returned to the company`;
  }
}
