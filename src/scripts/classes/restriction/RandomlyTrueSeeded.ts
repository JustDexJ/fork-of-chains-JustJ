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

  override text(): string {
    return `setup.qres.RandomlyTrueSeeded(${this.modulo}, ${this.remainder})`;
  }

  override explain(): string {
    if (State.variables.gDebug) {
      return `True when seed % ${this.modulo} equals ${this.remainder}`;
    } else {
      return `Sometimes true`;
    }
  }

  override isOk(content: CostContext): boolean {
    return (content.getSeed?.() ?? 0) % this.modulo == this.remainder;
  }
}
