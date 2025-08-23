import type { TraitKey } from "../../../trait/Trait";

/**
 * Replace trait into the given trait if the unit has some variation of it earlier.
 */
export default class TraitReplaceExisting extends Cost {
  trait_key: TraitKey;

  constructor(
    public actor_name: string,
    trait: Trait | TraitKey,
  ) {
    super();

    const traitObj = resolveObject(trait, setup.trait);
    if (!traitObj.getTraitGroup())
      throw new Error(
        `Trait ${traitObj.key} does not have a trait group and cannot be decreased`,
      );
    this.trait_key = traitObj.key;
  }

  override text(): string {
    return `setup.qc.TraitReplaceExisting('${this.actor_name}', setup.trait.${this.trait_key})`;
  }

  override apply(context: CostContext) {
    let unit = context.getActorUnit(this.actor_name)!;
    let trait = setup.trait[this.trait_key];
    let trait_group = trait.getTraitGroup()!;
    let lowest_trait = trait_group.getSmallestTrait();
    if (unit.isHasRemovableTrait(lowest_trait, /* include cover = */ true)) {
      setup.qc.TraitReplace(this.actor_name, trait).apply(context);
    }
  }

  override explain(context: CostContext): string {
    return `${this.actor_name}'s trait (if any) is replaced with ${setup.trait[this.trait_key].rep()}`;
  }
}
