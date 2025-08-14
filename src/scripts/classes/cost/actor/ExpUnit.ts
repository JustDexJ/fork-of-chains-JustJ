/**
 * Gain some exp for a unit.
 * Amount gained = exp from unit level times week multiplier
 */
export default class ExpUnit extends Cost {
  constructor(
    public actor_name: string,
    public week_multiplier: number,
  ) {
    super();
  }

  override text() {
    return `setup.qc.ExpUnit('${this.actor_name}', ${this.week_multiplier})`;
  }

  override apply(context: CostContext) {
    const unit = context.getActorUnit(this.actor_name)!;

    const exp = Math.round(
      setup.getUnitPlayerLevelDifficulty().getExp() * this.week_multiplier,
    );

    unit.gainExp(exp);
    if (unit.isYourCompany()) {
      setup.notify(`a|Rep a|gain ${exp} exp`, { a: unit });
    }
  }

  override explain(context: CostContext) {
    return `${this.actor_name} gain some exp (multiplier: ${this.week_multiplier})`;
  }
}
