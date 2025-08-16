/**
 * Swap magic with another random one
 */
export default class WildMagic extends Cost {
  constructor(public actor_name: string) {
    super();
  }

  override text() {
    return `setup.qc.WildMagic('${this.actor_name}')`;
  }

  override apply(context: CostContext) {
    const unit = context.getActorUnit(this.actor_name)!;
    const magic = unit
      .getRemovableTraits()
      .filter((trait) => trait.getTags().includes("magic"));
    if (magic.length) {
      const remove = setup.rng.choice(magic);
      const other = setup.TraitHelper.getAllTraitsOfTags(["magicbasic"]).filter(
        (trait) => !unit.isHasTrait(trait),
      );
      const add = setup.rng.choice(other);
      setup.qc.TraitRemove(this.actor_name, remove).apply(context);

      let candidate: Trait;
      if (remove.getTags().includes("magicmaster")) {
        candidate = add.getTraitGroup()!.getLargestTrait();
      } else {
        candidate = add;
      }
      setup.qc.TraitReplace(this.actor_name, candidate).apply(context);
    }
  }

  override explain(context: CostContext) {
    return `${this.actor_name} swaps one of their magic with a random one`;
  }
}
