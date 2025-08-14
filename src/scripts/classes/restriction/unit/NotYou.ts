export default class NotYou extends Restriction.Unit {
  constructor() {
    super();
  }

  static NAME = "Unit cannot be the player character (i.e, cannot be you)";
  static PASSAGE = "RestrictionNotYou";
  static UNIT = true;

  override text() {
    return `setup.qres.NotYou()`;
  }

  override explain() {
    return `Unit cannot be you`;
  }

  override isOk(unit: Unit): boolean {
    return unit != State.variables.unit.player;
  }
}
