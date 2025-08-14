import type { Trait, TraitKey } from "../../trait/Trait";
import type { Unit } from "../../unit/Unit";

export default class NoTrait extends Restriction {
  trait_key: TraitKey;

  constructor(trait: Trait | TraitKey | BuiltinTraitKey) {
    super();

    this.trait_key = resolveKey(trait as Trait | TraitKey);
  }

  override text() {
    return `setup.qres.NoTrait(setup.trait.${this.trait_key})`;
  }

  override explain() {
    let trait = setup.trait[this.trait_key];
    let cover: (Trait | null)[] = [trait];

    const traitgroup = trait.getTraitGroup();
    if (traitgroup) {
      cover = traitgroup.getTraitCover(setup.trait[this.trait_key]);
    }

    let text = "";
    for (const trait of cover) {
      text += trait ? trait.repNegative() : "null";
    }
    return text;
  }

  override isOk(unit: Unit) {
    let trait = setup.trait[this.trait_key];
    return !unit.isHasTrait(trait);
  }
}
