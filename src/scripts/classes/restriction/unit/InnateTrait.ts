export default class InnateTrait extends Restriction.Unit {
  trait_key: TraitKey;

  constructor(trait: Trait | TraitKey) {
    super();
    this.trait_key = resolveKey(trait);
  }

  override text(): string {
    return `setup.qres.InnateTrait(setup.trait.${this.trait_key})`;
  }

  override explain(): string {
    return `Innate: ${setup.trait[this.trait_key].rep()}`;
  }

  override isOk(unit: Unit): boolean {
    return unit.isHasInnateTrait(setup.trait[this.trait_key]);
  }
}
