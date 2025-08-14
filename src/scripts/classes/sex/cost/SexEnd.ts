export default class SexEnd extends SexCost {
  constructor() {
    super();
  }

  override apply(action: SexAction) {
    this.sex.endSex();
  }

  override explain() {
    return `Ends sex`;
  }
}
