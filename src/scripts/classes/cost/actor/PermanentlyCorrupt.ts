/**
 * Permanently corrupt a unit, granting it a random demonic skin trait that cannot be purified. Extremely small chance to misfire.
 */
export default class PermanentlyCorrupt extends Cost {
  constructor(public actor_name: string) {
    super();
  }

  override text(): string {
    return `setup.qc.PermanentlyCorrupt('${this.actor_name}')`;
  }

  override apply(context: CostContext) {
    const unit = context.getActorUnit(this.actor_name)!;
    const result = unit.corruptPermanently();
    if (result) {
      unit.addHistory(
        `got permanently corrupted and gained ${result.rep()}.`,
        context,
      );
    }
  }

  override explain(context: CostContext): string {
    return `permanently corrupt ${this.actor_name}`;
  }
}
