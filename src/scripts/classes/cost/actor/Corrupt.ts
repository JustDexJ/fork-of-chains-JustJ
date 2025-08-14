/**
 * Corrupt a unit, granting it either a random skin trait or a skin trait from a class
 */
export default class Corrupt extends Cost {
  constructor(
    public actor_name: string,
    public trait_tag: string | null = null,
    public amount: number = 1,
  ) {
    super();

    if (
      trait_tag &&
      !setup.TraitHelper.getAllTraitsOfTags([trait_tag]).length
    ) {
      throw new Error(`Trait tag ${trait_tag} invalid for corruption.`);
    }
  }

  override text() {
    return `setup.qc.Corrupt('${this.actor_name}', ${this.trait_tag}, ${this.amount})`;
  }

  override apply(context: CostContext) {
    const unit = context.getActorUnit(this.actor_name)!;
    for (let i = 0; i < this.amount; ++i) {
      const result = unit.corrupt(this.trait_tag);
      if (result) {
        // unit.addHistory(`got corrupted and gained ${result.rep()}.`, quest)
      }
    }
  }

  override explain(context: CostContext) {
    return `corrupt ${this.actor_name}'s ${this.trait_tag || "random aspect"} ${this.amount} times`;
  }
}
