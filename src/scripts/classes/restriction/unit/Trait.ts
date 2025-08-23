import type { Trait as Trait_ } from "../../trait/Trait";
import type { TraitGroup, TraitGroupKey } from "../../trait/TraitGroup";

export default class Trait extends Restriction.Unit {
  trait_key: TraitKey | null;
  trait_group_key: TraitGroupKey | null;

  constructor(
    trait: Trait_ | TraitKey | null | undefined,
    trait_group?: TraitGroup | TraitGroupKey | null,
  ) {
    super();

    this.trait_key = trait ? resolveKey(trait as Trait_ | TraitKey) : null;
    this.trait_group_key = trait_group ? resolveKey(trait_group) : null;

    if (!this.trait_key && !this.trait_group_key) {
      throw new Error("missing trait in qres.Trait!");
    }
  }

  override text(): string {
    if (this.trait_key) {
      return `setup.qres.Trait(setup.trait.${this.trait_key})`;
    } else {
      return `setup.qres.Trait(null, setup.traitgroup[${this.trait_group_key}])`;
    }
  }

  override explain(): string {
    let trait = null;
    if (this.trait_key) trait = setup.trait[this.trait_key];

    if (trait) {
      let cover = trait.getTraitCover();
      if (cover.length > 1) {
        return `(${cover.map((a) => (a ? a.rep() : "null")).join(" or ")})`;
      } else {
        return `${trait.rep()}`;
      }
    } else {
      let trait_group = setup.traitgroup[this.trait_group_key!];

      let banlist = trait_group.getTraitCover(null, true);
      let textban = [];
      for (const trait of banlist) {
        textban.push(trait ? trait.repNegative() : "null");
      }
      return `${textban.join("")}`;
    }
  }

  override isOk(unit: Unit): boolean {
    const trait_group = this.trait_group_key
      ? setup.traitgroup[this.trait_group_key]
      : null;
    const trait = this.trait_key ? setup.trait[this.trait_key] : null;

    return unit.isHasTrait(trait, trait_group);
  }
}
