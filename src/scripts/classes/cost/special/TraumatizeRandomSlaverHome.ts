/**
 * Traumatize a random unit at home for 40 weeks
 */
export default class TraumatizeRandomSlaverHome extends Cost {
  constructor() {
    super();
  }

  override text() {
    return `setup.qc.TraumatizeRandomSlaverHome()`;
  }

  override apply(context: CostContext) {
    let units = State.variables.company.player.getUnits({
      home: true,
      job: setup.job.slaver,
    });
    if (!units.length) return;
    let chosen = setup.rng.choice(units);
    setup.qc.TraumatizeRandom("unit", 40).apply(setup.costUnitHelper(chosen));
  }

  override explain(context: CostContext) {
    return `Traumatize a random unit in your company`;
  }
}
