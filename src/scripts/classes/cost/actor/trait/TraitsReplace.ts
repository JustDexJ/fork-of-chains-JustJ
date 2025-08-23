import type { TraitKey } from "../../../trait/Trait";

export default class TraitsReplace extends Cost {
  trait_keys: TraitKey[];

  constructor(
    public actor_name: string,
    traits: (Trait | TraitKey)[],
  ) {
    super();

    if (!Array.isArray(traits)) {
      throw new Error(`Trait array must be array`);
    }

    this.trait_keys = [];
    for (let i = 0; i < traits.length; ++i) {
      this.trait_keys.push(resolveKey(traits[i]));
    }
  }

  static NAME = "Gain Traits (replacing old ones)";
  static PASSAGE = "CostTraitsReplace";

  override text(): string {
    let texts = this.trait_keys.map((a) => `setup.trait.${a}`);
    return `setup.qc.TraitsReplace('${this.actor_name}', [${texts.join(", ")}])`;
  }

  getTraits(): Trait[] {
    return this.trait_keys.map((t) => setup.trait[t]);
  }

  override apply(context: CostContext) {
    let unit = context.getActorUnit(this.actor_name)!;
    let traits = this.getTraits();
    for (let i = 0; i < traits.length; ++i) {
      if (unit.isTraitCompatible(traits[i])) {
        unit.addTrait(traits[i], /* group = */ null, /* replace = */ true);
      }
    }
  }

  override explain(context: CostContext): string {
    let traits = this.getTraits();
    let trait_strs = [];
    for (let i = 0; i < traits.length; ++i) trait_strs.push(traits[i].rep());
    return `${this.actor_name} gain (forcefully) ${trait_strs.join("")}`;
  }
}
