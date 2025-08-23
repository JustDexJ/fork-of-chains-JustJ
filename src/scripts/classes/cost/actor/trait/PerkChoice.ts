import type { TraitKey } from "../../../trait/Trait";

export default class PerkChoice extends Cost {
  perk_key: TraitKey;

  constructor(
    public actor_name: string,
    perk: Trait | TraitKey,
    public no_learn?: boolean,
  ) {
    super();

    this.perk_key = resolveKey(perk);
    this.no_learn = no_learn;
  }

  override text(): string {
    return `setup.qc.PerkChoice('${this.actor_name}', '${this.perk_key}', ${this.no_learn})`;
  }

  getPerk() {
    return setup.trait[this.perk_key];
  }

  override apply(context: CostContext) {
    const unit = context.getActorUnit(this.actor_name)!;
    if (unit.addPerkChoice(this.getPerk()) && !this.no_learn) {
      unit.addTrait(this.getPerk());
    }
  }

  override explain(context: CostContext): string {
    const perk = this.getPerk();
    return `${this.actor_name} gains access to the ${perk.rep()} perk, which they can learn by resetting their perks${this.no_learn ? " (not automatically learned)" : ""}`;
  }
}
