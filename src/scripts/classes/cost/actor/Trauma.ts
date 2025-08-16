import type { TraitKey } from "../../trait/Trait";

/** Gains a specific trauma for specified duration */
export default class Trauma extends Cost {
  trait_key: TraitKey;

  constructor(
    public actor_name: string,
    trait: Trait | TraitKey,
    public duration: number,
  ) {
    super();
    this.trait_key = resolveKey(trait);
  }

  static NAME = "Gain a specific temporary trauma/boon for several weeks";
  static PASSAGE = "CostTrauma";
  static UNIT = true;

  override text() {
    return `setup.qc.Trauma('${this.actor_name}', setup.trait.${this.trait_key}, ${this.duration})`;
  }

  override apply(context: CostContext) {
    let unit = context.getActorUnit(this.actor_name)!;
    let trait = setup.trait[this.trait_key];
    State.variables.trauma.adjustTrauma(unit, trait, this.duration);
  }

  override explain(context: CostContext) {
    return `${this.actor_name}'s gains ${setup.trait[this.trait_key].rep()} for ${this.duration} weeks`;
  }
}
