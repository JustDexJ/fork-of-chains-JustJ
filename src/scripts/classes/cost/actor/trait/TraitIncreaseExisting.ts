import type { TraitKey } from "../../../trait/Trait";

export default class TraitIncreaseExisting extends Cost {
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

  override text() {
    return `setup.qc.TraitIncreaseExisting('${this.actor_name}', setup.trait.${this.trait_key})`;
  }

  override apply(context: CostContext) {
    let unit = context.getActorUnit(this.actor_name)!;
    let trait = setup.trait[this.trait_key];
    let trait_group = trait.getTraitGroup()!;
    let lowest_trait = trait_group.getSmallestTrait();
    if (unit.isHasRemovableTrait(lowest_trait, /* include cover = */ true)) {
      let added = unit.addTrait(trait);
      if (added) unit.addHistory(`gained ${added.rep()}.`, context);
    }
  }

  override explain(context: CostContext) {
    return `${this.actor_name}'s trait (if any) increases to max. ${setup.trait[this.trait_key].rep()}`;
  }
}
