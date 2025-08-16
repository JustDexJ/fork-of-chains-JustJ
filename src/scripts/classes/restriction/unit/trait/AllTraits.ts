export default class AllTraits extends Restriction.Unit {
  trait_keys: TraitKey[];
  is_exact: boolean;

  constructor(traits: (Trait | TraitKey)[], is_exact?: boolean) {
    super();

    this.trait_keys = traits.map((trait) => resolveKey(trait));
    this.is_exact = !!is_exact;
  }

  override text() {
    let trait_texts = this.trait_keys.map((a) => `setup.trait.${a}`);
    return `setup.qres.AllTraits([${trait_texts.join(", ")}], ${this.is_exact})`;
  }

  override explain() {
    let traittext = [];
    for (let i = 0; i < this.trait_keys.length; ++i) {
      let trait = setup.trait[this.trait_keys[i]];
      if (this.is_exact) {
        traittext.push(trait.rep());
      } else {
        let cover = trait.getTraitCover();
        traittext.push(
          `(${cover.map((a) => (a ? a.rep() : "null")).join(" or ")})`,
        );
      }
    }
    return traittext.join("");
  }

  override isOk(unit: Unit): boolean {
    let traits = unit.getTraits();
    for (let i = 0; i < this.trait_keys.length; ++i) {
      let trait_key = this.trait_keys[i];
      if (this.is_exact) {
        if (!traits.includes(setup.trait[trait_key])) return false;
      } else {
        if (!unit.isHasTrait(setup.trait[trait_key])) return false;
      }
    }
    return true;
  }
}
