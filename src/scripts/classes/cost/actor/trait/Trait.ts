import type { Trait as Trait_, TraitKey } from "../../../trait/Trait";
import type { TraitGroup, TraitGroupKey } from "../../../trait/TraitGroup";

export default class Trait extends Cost {
  trait_key: TraitKey | null;
  trait_group_key: TraitGroupKey | null;

  constructor(
    public actor_name: string,
    trait?: Trait_ | TraitKey | null,
    trait_group?: TraitGroup | TraitGroupKey | null,
  ) {
    super();

    if (!trait && trait != null)
      throw new Error(`Missing trait for setup.qc.Trait(${actor_name})`);

    this.trait_key = trait ? resolveKey(trait) : null;
    this.trait_group_key = trait_group ? resolveKey(trait_group) : null;
  }

  override text(): string {
    if (this.trait_key) {
      return `setup.qc.Trait('${this.actor_name}', setup.trait.${this.trait_key})`;
    } else {
      return `setup.qc.Trait('${this.actor_name}', null, setup.traitgroup[${this.trait_group_key}])`;
    }
  }

  override apply(context: CostContext) {
    let unit = context.getActorUnit(this.actor_name)!;
    let trait_group = null;
    if (this.trait_group_key)
      trait_group = setup.traitgroup[this.trait_group_key];
    let trait = null;
    if (this.trait_key) trait = setup.trait[this.trait_key];
    if (!trait || unit.isTraitCompatible(trait)) {
      let added = unit.addTrait(trait, trait_group);
      if (added && unit.isHasTrait(added))
        unit.addHistory(`gained ${added.rep()}.`, context);
    }
  }

  override explain(context: CostContext): string {
    if (this.trait_key) {
      return `${this.actor_name} gain ${setup.trait[this.trait_key].rep()}`;
    } else {
      return `${this.actor_name} gains trait from class: ${setup.traitgroup[this.trait_group_key!].getSmallestTrait().rep()}`;
    }
  }
}
