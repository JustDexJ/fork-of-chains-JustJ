import type { Perk } from "../../trait/Perk";

export default class HasPerkChoice extends Restriction.Unit {
  perk_key: TraitKey;

  constructor(perk: Perk) {
    super();
    this.perk_key = resolveKey(perk);
  }

  override text() {
    return `setup.qres.HasPerkChoice('${this.perk_key}')`;
  }

  getPerk(): Perk {
    return setup.trait[this.perk_key] as Perk;
  }

  override explain() {
    const perk = this.getPerk();
    return `Unit has ${perk.rep()} as one of their perk choices`;
  }

  override isOk(unit: Unit): boolean {
    return unit.isHasPerkChoice(this.getPerk());
  }
}
