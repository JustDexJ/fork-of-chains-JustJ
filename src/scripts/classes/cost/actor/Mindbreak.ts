/** Mindbreak this unit */
export default class Mindbreak extends Cost {
  constructor(public actor_name: string) {
    super();
  }

  override text() {
    return `setup.qc.Mindbreak('${this.actor_name}')`;
  }

  override apply(context: CostContext) {
    const unit = context.getActorUnit(this.actor_name)!;
    if (!unit.isMindbroken()) {
      setup.qc.RemoveTraitsWithTag(this.actor_name, "training").apply(context);
      setup.qc
        .TraitReplace(this.actor_name, setup.trait.training_mindbreak)
        .apply(context);
    }
  }

  override explain(context: CostContext) {
    return `${this.actor_name} is mindbroken`;
  }
}
