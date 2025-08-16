export default class Never extends Restriction {
  constructor(public keytext: string = "Never") {
    super();
  }

  static NAME = "Never";
  static PASSAGE = "RestrictionNever";

  override text() {
    return `setup.qres.Never('${this.keytext}')`;
  }

  override explain() {
    return this.keytext;
  }

  override isOk() {
    return false;
  }
}
