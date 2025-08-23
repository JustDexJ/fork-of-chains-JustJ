export default class HasSlave extends Restriction {
  constructor() {
    super();
  }

  static NAME = "Have at least one slave";
  static PASSAGE = "RestrictionHasSlave";

  override text(): string {
    return `setup.qres.HasSlave()`;
  }

  override explain(): string {
    return `Has a slave`;
  }

  override isOk(): boolean {
    let units = State.variables.company.player.getUnits({
      job: setup.job.slave,
    });
    return units.length > 0;
  }
}
