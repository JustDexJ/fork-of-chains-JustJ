export default class HasSlave extends Restriction {
  constructor() {
    super();
  }

  static NAME = "Have at least one slave";
  static PASSAGE = "RestrictionHasSlave";

  override text() {
    return `setup.qres.HasSlave()`;
  }

  override explain() {
    return `Has a slave`;
  }

  override isOk() {
    let units = State.variables.company.player.getUnits({
      job: setup.job.slave,
    });
    return units.length > 0;
  }
}
