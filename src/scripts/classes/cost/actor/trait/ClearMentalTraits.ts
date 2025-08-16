export default class ClearMentalTraits extends Cost {
  constructor(public actor_name: string) {
    super();
  }

  override text() {
    return `setup.qc.ClearMentalTraits('${this.actor_name}')`;
  }

  override apply(context: CostContext) {
    setup.qc.RemoveTraitsWithTag(this.actor_name, "per");
    setup.qc.RemoveTraitsWithTag(this.actor_name, "skill");
    setup.qc.RemoveTraitsWithTag(this.actor_name, "bg");
    setup.qc.RemoveTraitsWithTag(this.actor_name, "training");
    setup.qc.RemoveTraitsWithTag(this.actor_name, "perk");
  }

  override explain(context: CostContext) {
    return `${this.actor_name} loses all personality, skill, background, training, and perk traits`;
  }
}
