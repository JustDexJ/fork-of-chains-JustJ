/**
 * Removes x random traits out of these.
 */
export default class DecreaseTraitsRandom extends Cost {
  trait_keys: TraitKey[];

  constructor(
    public actor_name: string,
    public traits: (Trait | TraitKey)[],
    public no_of_traits: number,
    public is_replace?: boolean,
  ) {
    super();

    if (!Array.isArray(traits)) throw new Error(`Trait array must be array`);
    if (no_of_traits > traits.length)
      throw new Error(`Too few traits: ${traits.length} vs ${no_of_traits}`);

    this.trait_keys = traits.map((a) => resolveKey(a));
  }

  override text(): string {
    let texts = this.trait_keys.map((a) => `setup.trait.${a}`);
    return `setup.qc.DecreaseTraitsRandom('${this.actor_name}', [${texts.join(", ")}], ${this.no_of_traits}, ${this.is_replace})`;
  }

  getTraits(): Trait[] {
    return this.trait_keys.map((a) => setup.trait[a]);
  }

  override apply(context: CostContext) {
    let unit = context.getActorUnit(this.actor_name)!;
    let traits = this.getTraits();

    setup.rng.shuffleArray(traits);

    let removed = 0;
    let to_remove: Trait[] = [];
    for (let i = 0; i < traits.length; ++i) {
      if (unit.isHasRemovableTrait(traits[i])) {
        to_remove.push(traits[i]);
        removed += 1;
        if (removed >= this.no_of_traits) break;
      }
    }
    for (let i = 0; i < to_remove.length; ++i) {
      let trait = to_remove[i];
      if (this.is_replace) {
        unit.removeTraitExact(trait);
      } else {
        let trait_group = trait.getTraitGroup();
        if (trait_group) {
          unit.addTrait(/* trait = */ null, trait_group);
        } else {
          unit.removeTraitExact(trait);
        }
      }
      if (unit.isYourCompany()) {
        setup.notify.traitLost(unit, trait);
      }
    }
  }

  override explain(context: CostContext): string {
    let trait_strs = this.getTraits().map((a) => a.rep());
    let uverb = "decreases";
    if (this.is_replace) uverb = "LOSES";
    let verb = `${uverb} ${this.no_of_traits} random traits from`;
    return `${this.actor_name} ${verb} ${trait_strs.join("")}`;
  }
}
