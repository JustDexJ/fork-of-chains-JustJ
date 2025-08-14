export default class BestFriendWithRememberedUnit extends Restriction.Unit {
  constructor() {
    super();
  }

  override text() {
    return `setup.qres.BestFriendWithRememberedUnit()`;
  }

  override explain() {
    return `Unit must be the best friend/lover of the remembered unit`;
  }

  override isOk(unit: Unit): boolean {
    const bf = setup.qresImpl.RememberUnit.getRememberedUnit();
    return unit.getBestFriend() == bf;
  }
}
