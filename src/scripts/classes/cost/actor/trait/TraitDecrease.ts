import type { TraitKey } from "../../../trait/Trait";

export default class TraitDecrease extends Cost {
  trait_key: TraitKey;

  constructor(
    public actor_name: string,
    trait: Trait | TraitKey,
  ) {
    super();

    if (trait === undefined) {
      throw new Error(
        `Missing trait for setup.qc.TraitDecrease(${actor_name})`,
      );
    }

    const traitObj = resolveObject(trait, setup.trait);
    if (!traitObj.getTraitGroup()) {
      throw new Error(
        `Trait ${traitObj.key} does not have a trait group and cannot be decreased`,
      );
    }
    this.trait_key = traitObj.key;
  }

  static NAME = "Decrease Trait Level";
  static PASSAGE = "CostTraitDecrease";
  static UNIT = true;

  override text(): string {
    return `setup.qc.TraitDecrease('${this.actor_name}', setup.trait.${this.trait_key})`;
  }

  override apply(context: CostContext) {
    let unit = context.getActorUnit(this.actor_name)!;
    let trait = setup.trait[this.trait_key];
    let trait_group = trait.getTraitGroup()!;
    if (
      unit.isHasRemovableTrait(trait, /* include cover = */ true) &&
      !unit.isHasRemovableTrait(trait)
    ) {
      let added = unit.decreaseTrait(trait_group);
      if (added) unit.addHistory(`gained ${added.rep()}.`, context);
    }
  }

  override explain(context: CostContext): string {
    return `${this.actor_name}'s trait decreases to max ${setup.trait[this.trait_key].rep()}`;
  }
}
