import type { Perk } from "../../../trait/Perk";
import type { TraitKey } from "../../../trait/Trait";

export default class RemovePerkChoice extends Cost {
  perk_key: TraitKey;

  constructor(
    public actor_name: string,
    perk: Perk | TraitKey,
  ) {
    super();

    this.perk_key = resolveKey(perk);
  }

  override text(): string {
    return `setup.qc.RemovePerkChoice('${this.actor_name}', '${this.perk_key}')`;
  }

  getPerk(): Perk {
    return setup.trait[this.perk_key] as Perk;
  }

  override apply(context: CostContext) {
    const unit = context.getActorUnit(this.actor_name)!;
    unit.removePerkChoice(this.getPerk());
  }

  override explain(context: CostContext): string {
    const perk = this.getPerk();
    return `${this.actor_name} loses access to the ${perk.rep()} perk`;
  }
}
