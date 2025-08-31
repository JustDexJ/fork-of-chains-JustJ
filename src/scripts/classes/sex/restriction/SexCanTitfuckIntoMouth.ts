import { getDickPokeOutScore } from "../action/actions/penis/breasts/util";

export default class SexCanTitfuckIntoMouth extends SexRestriction {
  constructor(
    public my_actor_name: string,
    public their_actor_name: string,
  ) {
    super();
  }

  override explain() {
    const my_name = this.getActorDisplayName(this.my_actor_name);
    const their_name = this.getActorDisplayName(this.their_actor_name);
    return `${my_name} has a dick long enough to poke out of ${their_name} breasts`;
  }

  override isOk(action: SexAction) {
    const a = action.getActorUnit(this.my_actor_name);
    const b = action.getActorUnit(this.their_actor_name);
    return !!(
      setup.sexbodypart.breasts.getTitfuck(a, b) &&
      getDickPokeOutScore(a, b, this.sex) >= 1
    );
  }
}
