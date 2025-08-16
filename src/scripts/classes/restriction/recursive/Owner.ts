export default class Owner extends Restriction.Unit {
  constructor(public restriction: Restriction) {
    super();
  }

  override text() {
    return `setup.qres.Owner(${this.restriction.text()})`;
  }

  override explain(context?: Unit) {
    return `Slave's owner satisfies: (${this.restriction.explain(context)})`;
  }

  override isOk(unit: Unit): boolean {
    if (!unit.isSlave()) return false;
    let bedchamber = unit.getBedchamber();
    if (!bedchamber) return false;
    return this.restriction.isOk(bedchamber.getSlaver());
  }

  getLayout() {
    return {
      css_class: "marketobjectcard",
      blocks: [
        {
          passage: "RestrictionOwnerHeader",
          addpassage: "QGAddRestrictionUnit",
          entrypath: ".restriction",
        },
      ],
    };
  }
}
