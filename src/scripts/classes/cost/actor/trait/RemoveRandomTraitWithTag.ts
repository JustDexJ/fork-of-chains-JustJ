/**
 * Remove all traits with a particular tag
 */
export default class RemoveRandomTraitWithTag extends Cost {
  constructor(
    public actor_name: string,
    public trait_tag: string,
  ) {
    super();
  }

  override text() {
    return `setup.qc.RemoveRandomTraitWithTag('${this.actor_name}', '${this.trait_tag}')`;
  }

  override apply(context: CostContext) {
    let unit = context.getActorUnit(this.actor_name)!;
    let traits = unit
      .getAllTraitsWithTag(this.trait_tag)
      .filter((trait) => unit.isHasRemovableTrait(trait));
    if (!traits.length) return;
    let trait = setup.rng.choice(traits);
    return setup.qc.TraitRemove(this.actor_name, trait).apply(context);
  }

  override explain(context: CostContext) {
    return `${this.actor_name} loses a random ${this.trait_tag} trait`;
  }
}
