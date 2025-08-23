export default class TraitExact extends Restriction.Unit {
  trait_key: TraitKey;

  constructor(public trait: Trait | TraitKey) {
    super();

    this.trait_key = resolveKey(trait);
  }

  static NAME = "Has a trait (exact)";
  static PASSAGE = "RestrictionTraitExact";
  static UNIT = true;

  override text(): string {
    return `setup.qres.TraitExact(setup.trait.${this.trait_key})`;
  }

  override explain(): string {
    let trait = setup.trait[this.trait_key];
    return trait.rep();
  }

  override isOk(unit: Unit): boolean {
    let trait = setup.trait[this.trait_key];
    return unit.isHasTraitExact(trait);
  }
}
