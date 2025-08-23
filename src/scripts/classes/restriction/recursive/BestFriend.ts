export default class BestFriend extends Restriction.Unit {
  constructor(public restriction: Restriction) {
    super();
  }

  override text(): string {
    return `setup.qres.BestFriend(${this.restriction.text()})`;
  }

  override explain(context?: Unit): string {
    return `Unit's best friend or lover satisfies: (${this.restriction.explain(context)})`;
  }

  override isOk(unit: Unit): boolean {
    const best_friend = unit.getBestFriend();
    if (!best_friend) return false;
    return this.restriction.isOk(best_friend);
  }

  getLayout() {
    return {
      css_class: "marketobjectcard",
      blocks: [
        {
          passage: "RestrictionBestFriendHeader",
          addpassage: "QGAddRestrictionUnit",
          entrypath: ".restriction",
        },
      ],
    };
  }
}
