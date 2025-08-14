import MissingUnit from "../missingunit/MissingUnit";

/**
 * One of your non-busy slave escaped.
 */
export default class EscapedSlaveRandom extends Cost {
  constructor() {
    super();
  }

  override text() {
    return `setup.qc.EscapedSlaveRandom()`;
  }

  override apply(context: CostContext) {
    let slaves = State.variables.company.player.getUnits({
      job: setup.job.slave,
      available: true,
    });
    if (!slaves.length) return; // nobody can escape.
    let escaped = setup.rng.choice(slaves);

    if (MissingUnit.checkMissingPlayer(escaped, context)) return;

    escaped.addHistory("escaped from your company.", context);
    State.variables.company.player.removeUnit(escaped);
    setup.unitgroup.missingslaves.addUnit(escaped);
  }

  override explain(context: CostContext) {
    return `A random slave escaped`;
  }
}
