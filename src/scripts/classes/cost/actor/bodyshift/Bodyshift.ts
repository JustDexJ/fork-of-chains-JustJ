/**
 * Switches body with the spare one. Only for shapeshifters.
 */
export default class Bodyshift extends Cost {
  constructor(public actor_name: string) {
    super();
  }

  override text(): string {
    return `setup.qc.Bodyshift('${this.actor_name}')`;
  }

  override apply(context: CostContext) {
    const unit = context.getActorUnit(this.actor_name)!;

    if (State.variables.bodyshift.isBodyshifter(unit)) {
      State.variables.bodyshift.bodyshift(unit);
      if (unit.isYourCompany()) {
        setup.notify(`a|Rep a|bodyshift`, { a: unit });
      }
    }
  }

  override explain(): string {
    return `${this.actor_name} bodyshifts`;
  }
}
