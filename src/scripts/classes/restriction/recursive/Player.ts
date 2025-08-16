export default class Player extends Restriction {
  constructor(public restriction: Restriction) {
    super();
  }

  static NAME = "Player satisfies a restriction";
  static PASSAGE = "RestrictionPlayer";

  override text() {
    return `setup.qres.Player(${this.restriction.text()})`;
  }

  override explain(context?: unknown) {
    return `You satisfies: (${this.restriction.explain(context)})`;
  }

  override isOk() {
    return this.restriction.isOk(State.variables.unit.player);
  }

  getLayout() {
    return {
      css_class: "marketobjectcard",
      blocks: [
        {
          passage: "RestrictionPlayerHeader",
          addpassage: "QGAddRestrictionUnit",
          entrypath: ".restriction",
        },
      ],
    };
  }
}
