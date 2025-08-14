/**
 * Curse a random unit at home
 */
export default class CurseRandomSlaverHome extends Cost {
  constructor() {
    super();
  }

  override text() {
    return `setup.qc.CurseRandomSlaverHome()`;
  }

  override apply(context: CostContext) {
    const units = State.variables.company.player.getUnits({
      home: true,
      job: setup.job.slaver,
    });
    if (!units.length) return;
    const chosen = setup.rng.choice(units);
    setup.qc
      .Blessing("unit", 1, null, true)
      .apply(setup.costUnitHelper(chosen));
  }

  override explain(context: CostContext) {
    return `Curse a random unit in your company`;
  }
}
