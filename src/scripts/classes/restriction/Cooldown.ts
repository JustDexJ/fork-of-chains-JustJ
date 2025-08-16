export default class Cooldown extends Restriction.ContentTemplate {
  constructor(public cooldown: number) {
    super();
  }

  static NAME =
    "Cooldown weeks (quest can only be generated at most once per this many weeks)";
  static PASSAGE = "RestrictionCooldown";

  override text() {
    return `setup.qres.Cooldown(${this.cooldown})`;
  }

  override isOk(template: ContentTemplate) {
    let last_week = State.variables.calendar.getLastWeekOf(template);
    let current_week = State.variables.calendar.getWeek();
    return current_week - last_week >= this.cooldown;
  }

  override explain() {
    return `Cooldown of ${this.cooldown} weeks`;
  }
}
