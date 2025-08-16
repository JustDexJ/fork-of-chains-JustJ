/**
 * Applies the specified cost(s) to the player unit,
 * instead of e.g. the units in the quest team.
 */
export default class Player extends Cost {
  constructor(public cost: Cost) {
    super();
  }

  override text() {
    return `setup.qc.Player(${this.cost.text()})`;
  }

  override apply(context: CostContext) {
    this.cost.apply({
      getActorUnit: () => State.variables.unit.player,
    });
  }

  override explain(context: CostContext) {
    return `Player gets: ${this.cost.explain()}`;
  }
}
