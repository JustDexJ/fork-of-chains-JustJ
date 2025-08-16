/** Levels up this unit. */
export default class LevelUpTo extends Cost {
  constructor(
    public actor_name: string,
    public target_level: number,
  ) {
    super();
  }

  override text() {
    return `setup.qc.LevelUpTo('${this.actor_name}', ${this.target_level})`;
  }

  override apply(context: CostContext) {
    const unit = context.getActorUnit(this.actor_name)!;
    while (unit.getLevel() < this.target_level) {
      unit.levelUp();
    }
  }

  override explain(context: CostContext) {
    return `${this.actor_name} levels up to level ${this.target_level}`;
  }
}
