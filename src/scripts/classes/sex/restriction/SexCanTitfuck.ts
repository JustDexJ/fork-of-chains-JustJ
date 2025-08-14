export default class SexCanTitfuck extends SexRestriction {
  constructor(
    public my_actor_name: string,
    public their_actor_name: string,
  ) {
    super();
  }

  getRestriction(): Restriction<SexAction> {
    return setup.qres.And([
      setup.qres.Actor("a", setup.qres.Trait(setup.trait.dick_tiny)),
      setup.qres.Actor(
        "b",
        setup.qres.Or([
          setup.qres.Trait(
            setup.sexbodypart.breasts.getMinBreastTraitForTitfuck(),
          ),
          setup.qres.And([
            setup.qres.NoTrait(setup.trait.breast_tiny),
            setup.qres.Trait(
              setup.sexbodypart.breasts.getMinMuscleTraitForPecjob(),
            ),
          ]),
        ]),
      ),
    ]);
  }

  override explain() {
    const breast_size = setup.sexbodypart.breasts.getMinBreastTraitForTitfuck();
    const muscle_size = setup.sexbodypart.breasts.getMinMuscleTraitForPecjob();
    return `${this.my_actor_name} has a dick, while ${this.their_actor_name} either has ${breast_size.rep()} or does not have a breast but has ${muscle_size.rep()}`;
  }

  override isOk(action: SexAction) {
    const restriction = this.getRestriction();
    return restriction.isOk(action);
  }
}
