export default class ResetInnateTraits extends Cost {
  constructor(public actor_name: string) {
    super();
  }

  override text(): string {
    return `setup.qc.ResetInnateTraits('${this.actor_name}')`;
  }

  override apply(context: CostContext) {
    let unit = context.getActorUnit(this.actor_name)!;
    unit.resetInnateTraits();
  }

  override explain(context: CostContext): string {
    return `${this.actor_name} gains all the current skin traits as their innate traits`;
  }
}
