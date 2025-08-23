/**
 * Purify a unit, restoring skin trait of the given class, or a random one if class is not given
 */

export default class Purify extends Cost {
  constructor(
    public actor_name: string,
    public trait_tag?: string,
  ) {
    super();

    if (
      trait_tag &&
      !setup.TraitHelper.getAllTraitsOfTags([trait_tag]).length
    ) {
      throw new Error(`Trait tag ${trait_tag} invalid for purification.`);
    }
  }

  static NAME = "Purify unit from a corruption";
  static PASSAGE = "CostPurify";
  static UNIT = true;

  override text(): string {
    if (this.trait_tag) {
      return `setup.qc.Purify('${this.actor_name}', ${this.trait_tag})`;
    } else {
      return `setup.qc.Purify('${this.actor_name}')`;
    }
  }

  override apply(context: CostContext) {
    let unit = context.getActorUnit(this.actor_name)!;
    unit.purify(this.trait_tag);
  }

  override explain(context: CostContext): string {
    return `purify ${this.actor_name}'s ${this.trait_tag || "random aspect"}`;
  }
}
