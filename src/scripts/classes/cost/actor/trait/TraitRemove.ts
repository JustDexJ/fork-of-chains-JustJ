import type { TraitKey } from "../../../trait/Trait";

/**
 * Exact removes a trait
 */
export default class TraitRemove extends Cost {
  trait_key: TraitKey;

  constructor(
    public actor_name: string,
    trait: Trait | TraitKey,
  ) {
    super();

    if (!trait)
      throw new Error(`Missing trait for setup.qc.TraitRemove(${actor_name})`);
    this.trait_key = resolveKey(trait);
  }

  static NAME = "Remove exact trait";
  static PASSAGE = "CostTraitRemove";
  static UNIT = true;

  override text() {
    return `setup.qc.TraitRemove('${this.actor_name}', setup.trait.${this.trait_key})`;
  }

  override apply(context: CostContext) {
    let unit = context.getActorUnit(this.actor_name)!;
    let trait = setup.trait[this.trait_key];
    if (!unit.isHasRemovableTrait(trait)) return;
    unit.removeTraitExact(trait);
    if (unit.isYourCompany()) {
      setup.notify(`a|Rep a|lose ${trait.rep()}`, { a: unit });
    }
  }

  override explain(context: CostContext) {
    return `${this.actor_name} loses ${setup.trait[this.trait_key].rep()}`;
  }
}
