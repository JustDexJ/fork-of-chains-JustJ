export default class RandomlyTrue extends Restriction {
  /**
   * Randomly true with chance probability.
   */
  constructor(public chance: number) {
    super();
  }

  override text() {
    return `setup.qres.RandomlyTrue(${this.chance})`;
  }

  override explain() {
    if (State.variables.gDebug) {
      return `With ${(this.chance * 100).toFixed(1)}% chance`;
    } else {
      return `Sometimes true`;
    }
  }

  override isOk() {
    return Math.random() < this.chance;
  }
}
