export default class Never extends Restriction {
  constructor(public keytext: string = "Never") {
    super();
  }

  static NAME = "Never";
  static PASSAGE = "RestrictionNever";

  override text(): string {
    return `setup.qres.Never('${this.keytext}')`;
  }

  override explain(): string {
    return this.keytext;
  }

  override isOk(): boolean {
    return false;
  }
}
