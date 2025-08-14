export default class RandomlyTrueSeeded extends Restriction.ContentContext {
  /**
   * Randomly true: True when seed % MODULO == REMAINDER
   */
  constructor(
    public modulo: number,
    public remainder: number,
  ) {
    super();

    if (remainder >= modulo) {
      throw new Error(
        `Remainder (${remainder}) cannot be larger than modulo (${modulo})`,
      );
    }
  }

  override text() {
    return `setup.qres.RandomlyTrueSeeded(${this.modulo}, ${this.remainder})`;
  }

  override explain() {
    if (State.variables.gDebug) {
      return `True when seed % ${this.modulo} equals ${this.remainder}`;
    } else {
      return `Sometimes true`;
    }
  }

  override isOk(content: CostContext) {
    return (content.getSeed?.() ?? 0) % this.modulo == this.remainder;
  }
}
