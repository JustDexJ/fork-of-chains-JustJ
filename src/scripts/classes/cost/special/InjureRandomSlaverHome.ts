/**
 * Injure a random unit at home for 10 weeks
 */
export default class InjureRandomSlaverHome extends Cost {
  constructor() {
    super();
  }

  override text(): string {
    return `setup.qc.InjureRandomSlaverHome()`;
  }

  override apply(context: CostContext) {
    let units = State.variables.company.player.getUnits({
      home: true,
      job: setup.job.slaver,
    });
    if (!units.length) return;
    let chosen = setup.rng.choice(units);
    setup.qc.Injury("unit", 10).apply(setup.costUnitHelper(chosen));
  }

  override explain(context: CostContext): string {
    return `Injure a random unit in your company`;
  }
}
