/**
 * Remove all traits with a particular tag
 */
export default class RemoveTraitsWithTag extends Cost {
  constructor(
    public actor_name: string,
    public trait_tag: string,
  ) {
    super();
  }

  override text(): string {
    return `setup.qc.RemoveTraitsWithTag('${this.actor_name}', '${this.trait_tag}')`;
  }

  override apply(context: CostContext) {
    let unit = context.getActorUnit(this.actor_name)!;
    unit.removeTraitsWithTag(this.trait_tag);
  }

  override explain(context: CostContext): string {
    return `${this.actor_name} lose all ${this.trait_tag} traits`;
  }
}
