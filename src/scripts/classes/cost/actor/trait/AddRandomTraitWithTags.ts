export default class AddRandomTraitWithTags extends Cost {
  constructor(
    public actor_name: string,
    public trait_tags: string[],
  ) {
    super();
  }

  override text(): string {
    let texts = this.trait_tags.map((a) => `'${a}'`);
    return `setup.qc.AddRandomTraitWithTags('${this.actor_name}', [${texts.join(", ")}])`;
  }

  override apply(context: CostContext) {
    let traits = setup.TraitHelper.getAllTraitsOfTags(this.trait_tags);
    if (!traits.length) return;
    let trait = setup.rng.choice(traits);
    return setup.qc.Trait(this.actor_name, trait).apply(context);
  }

  override explain(context: CostContext): string {
    return `${this.actor_name} gains a random ${this.trait_tags} trait`;
  }
}
