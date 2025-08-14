/**
 * Usually, defiant units are disallowed from participating in many things, such as quests, events, interactions,
 * etc. This restriction will allow them to participate in those.
 */
export default class AllowDefiant extends Restriction.Unit {
  constructor() {
    super();
  }

  override text() {
    return `setup.qres.AllowDefiant()`;
  }

  override explain() {
    if (State.variables.gDebug) {
      return `Allow defiant units`;
    } else {
      return ``;
    }
  }

  override isOk(unit: Unit): boolean {
    return true;
  }
}
