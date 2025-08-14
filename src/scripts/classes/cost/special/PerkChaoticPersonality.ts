export default class PerkChaoticPersonality extends Cost {
  constructor(public actor_name: string) {
    super();
  }

  override text() {
    return `setup.qc.PerkChaoticPersonality('${this.actor_name}')`;
  }

  override apply(context: CostContext) {
    const unit = context.getActorUnit(this.actor_name)!;
    if (unit.isHome()) {
      setup.notify(`a|Rep a|switch personalities`, { a: unit });
      const personalities = unit.getAllTraitsWithTag("per");
      for (const per of personalities) {
        const trait_group = per.getTraitGroup();
        if (trait_group) {
          const other_traits = trait_group.getTraits().filter((trait) => trait);
          if (other_traits.length == 2) {
            for (const other_trait of other_traits) {
              if (other_trait && other_trait != per) {
                // switch to this
                unit.addTrait(other_trait, null, /* replace = */ true);
                break;
              }
            }
          }
        }
      }
    }
  }

  override explain(context: CostContext) {
    return `${this.actor_name} reverse their personalities`;
  }
}
