export default class AnyTrait extends Restriction.Unit {
  trait_keys: TraitKey[];
  is_exact: boolean;

  constructor(
    traits: (Trait | TraitKey | BuiltinTraitKey)[],
    is_exact?: boolean,
  ) {
    super();

    if (!Array.isArray(traits))
      throw new Error(`traits must be array in AnyTrait`);
    this.trait_keys = traits.map((trait) =>
      resolveKey(trait as Trait | TraitKey),
    );
    this.is_exact = !!is_exact;
  }

  override text() {
    let trait_texts = this.trait_keys.map((a) => `setup.trait.${a}`);
    return `setup.qres.AnyTrait([${trait_texts.join(", ")}], ${this.is_exact})`;
  }

  override explain() {
    let res = "Any of: ";
    let traittext = [];
    for (let i = 0; i < this.trait_keys.length; ++i) {
      let trait = setup.trait[this.trait_keys[i]];
      if (this.is_exact) {
        traittext.push(trait.rep());
      } else {
        for (const tc of trait.getTraitCover()) {
          traittext.push(tc ? tc.rep() : "null");
        }
      }
    }
    return res + traittext.join("");
  }

  override isOk(unit: Unit): boolean {
    for (let i = 0; i < this.trait_keys.length; ++i) {
      let trait_key = this.trait_keys[i];
      if (this.is_exact) {
        if (unit.isHasTraitExact(setup.trait[trait_key])) return true;
      } else {
        if (unit.isHasTrait(setup.trait[trait_key])) return true;
      }
    }
    return false;
  }
}
