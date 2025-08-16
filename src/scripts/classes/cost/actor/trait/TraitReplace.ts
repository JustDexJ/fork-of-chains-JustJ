import type { TraitKey } from "../../../trait/Trait";
import type { TraitGroup, TraitGroupKey } from "../../../trait/TraitGroup";

export default class TraitReplace extends Cost {
  trait_key: TraitKey | null;
  trait_group_key: TraitGroupKey | null;

  constructor(
    public actor_name: string,
    trait: Trait | TraitKey | null | undefined,
    trait_group?: TraitGroup | TraitGroupKey | null,
  ) {
    super();

    if (!trait && trait != null)
      throw new Error(`Missing trait for setup.qc.TraitReplace(${actor_name})`);

    this.trait_key = trait ? resolveKey(trait) : null;
    this.trait_group_key = trait_group ? resolveKey(trait_group) : null;

    if (!this.trait_key && !this.trait_group_key)
      throw new Error(`TraitReplace must have either trait or traitgroup`);
  }

  override text() {
    if (this.trait_key) {
      return `setup.qc.TraitReplace('${this.actor_name}', setup.trait.${this.trait_key})`;
    } else {
      return `setup.qc.TraitReplace('${this.actor_name}', null, setup.traitgroup[${this.trait_group_key}])`;
    }
  }

  override apply(context: CostContext) {
    let unit = context.getActorUnit(this.actor_name)!;
    if (!unit) throw new Error(`Missing actor ${this.actor_name} from quest`);
    let trait_group = null;
    if (this.trait_group_key)
      trait_group = setup.traitgroup[this.trait_group_key];
    let trait = null;
    if (this.trait_key) trait = setup.trait[this.trait_key];
    if (!trait || unit.isTraitCompatible(trait)) {
      let added = unit.addTrait(trait, trait_group, /* is_repalce = */ true);
      if (added && unit.isHasTrait(added))
        unit.addHistory(`gained ${added.rep()}.`, context);
    }
  }

  override explain(context: CostContext) {
    if (this.trait_key) {
      return `${this.actor_name} FORCEFULLY gain ${setup.trait[this.trait_key].rep()}`;
    } else {
      return `${this.actor_name} FORCEFULLY gain trait from class: ${setup.traitgroup[this.trait_group_key!].getSmallestTrait().rep()}`;
    }
  }
}
