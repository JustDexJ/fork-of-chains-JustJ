export default class AddRandomBodypart extends Cost {
  constructor(
    public actor_name: string,
    public allow_demonic?: boolean,
  ) {
    super();
  }

  override text(): string {
    return `setup.qc.AddRandomBodypart('${this.actor_name}', ${this.allow_demonic})`;
  }

  override apply(context: CostContext) {
    let unit = context.getActorUnit(this.actor_name)!;
    let traits = setup.TraitHelper.getAllTraitsOfTags(["skin"]);
    if (!unit.isHasDick()) traits = traits.filter((a) => !a.isNeedDick());
    if (!unit.isHasVagina()) traits = traits.filter((a) => !a.isNeedVagina());
    if (!this.allow_demonic) traits = traits.filter((a) => !a.isCorruption());
    traits = traits.filter((a) => !unit.isHasRemovableTrait(a));

    if (traits.length) {
      let trait = setup.rng.choice(traits);

      return setup.qc.TraitReplace(this.actor_name, trait).apply(context);
    }
  }

  override explain(context: CostContext): string {
    if (this.allow_demonic) {
      return `${this.actor_name} gains a random bodypart (can be demonic)`;
    } else {
      return `${this.actor_name} gains a random non-demonic bodypart`;
    }
  }
}
