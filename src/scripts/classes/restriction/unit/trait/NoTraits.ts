export default class NoTraits extends Restriction.Unit {
  trait_keys: TraitKey[];
  is_exact?: boolean;

  constructor(traits: Trait[], is_exact?: boolean) {
    super();

    this.trait_keys = [];
    for (let i = 0; i < traits.length; ++i) {
      let trait = traits[i];
      this.trait_keys.push(trait.key);
    }

    this.is_exact = is_exact;
  }

  override text(): string {
    let trait_texts = this.trait_keys.map((a) => `setup.trait.${a}`);
    return `setup.qres.NoTraits([${trait_texts.join(", ")}], ${this.is_exact})`;
  }

  override explain(): string {
    let traittext = [];
    for (let i = 0; i < this.trait_keys.length; ++i) {
      let trait = setup.trait[this.trait_keys[i]];
      if (this.is_exact) {
        traittext.push(trait.repNegative());
      } else {
        let cover = trait.getTraitCover();
        for (const trait of cover) {
          traittext.push(trait ? trait.repNegative() : "null");
        }
      }
    }
    return traittext.join("");
  }

  override isOk(unit: Unit): boolean {
    let traits = unit.getTraits();
    for (let i = 0; i < this.trait_keys.length; ++i) {
      let trait_key = this.trait_keys[i];
      if (this.is_exact) {
        if (traits.includes(setup.trait[trait_key])) return false;
      } else {
        if (unit.isHasTrait(setup.trait[trait_key])) return false;
      }
    }
    return true;
  }
}
