// whether the slave is your own private slave
export default class SlaveOwnedByYou extends Restriction.Unit {
  constructor() {
    super();
  }

  override text(): string {
    return `setup.qres.SlaveOwnedByYou()`;
  }

  override explain(): string {
    return `Unit must be owned directly by you in your bedchamber`;
  }

  override isOk(unit: Unit): boolean {
    if (!unit.isSlave()) return false;
    let bedchamber = unit.getBedchamber();
    return (
      !!bedchamber && bedchamber.getSlaver() == State.variables.unit.player
    );
  }
}
