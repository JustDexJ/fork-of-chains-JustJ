export default class RandomlyTrue extends Restriction {
  /**
   * Randomly true with chance probability.
   */
  constructor(public chance: number) {
    super();
  }

  override text(): string {
    return `setup.qres.RandomlyTrue(${this.chance})`;
  }

  override explain(): string {
    if (State.variables.gDebug) {
      return `With ${(this.chance * 100).toFixed(1)}% chance`;
    } else {
      return `Sometimes true`;
    }
  }

  override isOk(): boolean {
    return Math.random() < this.chance;
  }
}
