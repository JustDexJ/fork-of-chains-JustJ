import type { TraitKey } from "../../trait/Trait";

/**
 * Resets background trait to the given trait.
 */
export default class BgTraitReset extends Cost {
  trait_key: TraitKey;

  constructor(
    public actor_name: string,
    public trait: Trait | TraitKey,
  ) {
    super();

    this.trait_key = resolveKey(trait);
  }

  static NAME = "Replace Background Trait";
  static PASSAGE = "CostBgTraitReset";
  static UNIT = true;

  override text() {
    return `setup.qc.BgTraitReset('${this.actor_name}', setup.trait.${this.trait_key})`;
  }

  override apply(context: CostContext) {
    let trait = setup.trait[this.trait_key];
    let rm1 = setup.qc.RemoveTraitsWithTag(this.actor_name, "bg");
    let pb = setup.qc.Trait(this.actor_name, trait);
    rm1.apply(context);
    pb.apply(context);
  }

  override explain(context: CostContext) {
    return `${this.actor_name}'s background is reset to ${setup.trait[this.trait_key].rep()}`;
  }
}
