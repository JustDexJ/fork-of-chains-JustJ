import type { TraitKey } from "../../../trait/Trait";
import type { TraitGroup, TraitGroupKey } from "../../../trait/TraitGroup";

export default class TraitAndMakeInnate extends Cost {
  trait_key: TraitKey | null;
  trait_group_key: TraitGroupKey | null;

  constructor(
    public actor_name: string,
    trait: Trait | TraitKey | null,
    trait_group?: TraitGroup | TraitGroupKey | null,
  ) {
    super();

    if (trait === undefined)
      throw new Error(
        `Missing trait for setup.qc.TraitAndMakeInnate(${actor_name})`,
      );

    this.trait_key = trait ? resolveKey(trait) : null;
    this.trait_group_key = trait_group ? resolveKey(trait_group) : null;
  }

  override text(): string {
    if (this.trait_key) {
      return `setup.qc.TraitAndMakeInnate('${this.actor_name}', setup.trait.${this.trait_key})`;
    } else {
      return `setup.qc.TraitAndMakeInnate('${this.actor_name}', null, setup.traitgroup[${this.trait_group_key}])`;
    }
  }

  override apply(context: CostContext) {
    let unit = context.getActorUnit(this.actor_name)!;

    let trait_group: TraitGroup | null = null;
    if (this.trait_group_key) {
      trait_group = setup.traitgroup[this.trait_group_key];
    }

    let trait: Trait | null = null;
    if (this.trait_key) {
      trait = setup.trait[this.trait_key];
    }

    if (!trait || unit.isTraitCompatible(trait)) {
      const added = unit.addTrait(trait, trait_group);
      if (added) {
        unit.addHistory(
          `<<dangertext "permanently">> gained ${added.rep()}.`,
          context,
        );
      }
      if (trait) {
        unit.makeInnateTrait(trait, trait_group ?? undefined);
      }
    }
  }

  override explain(context: CostContext): string {
    if (this.trait_key) {
      return `${this.actor_name} permanently gain ${setup.trait[this.trait_key].rep()}`;
    } else {
      return `${this.actor_name} permanently lose trait from class: ${setup.traitgroup[this.trait_group_key!].getSmallestTrait().rep()}`;
    }
  }
}
