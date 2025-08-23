/**
 * Corrupt a random unit at home
 */
export default class CorruptRandomUnitHome extends Cost {
  constructor() {
    super();
  }

  override text(): string {
    return `setup.qc.CorruptRandomUnitHome()`;
  }

  override apply(context: CostContext) {
    let units = State.variables.company.player.getUnits({ home: true });
    if (!units.length) return;
    let chosen = setup.rng.choice(units);
    setup.qc.Corrupt("unit").apply(setup.costUnitHelper(chosen));
  }

  override explain(context: CostContext): string {
    return `Corrupt a random unit in your company`;
  }
}
