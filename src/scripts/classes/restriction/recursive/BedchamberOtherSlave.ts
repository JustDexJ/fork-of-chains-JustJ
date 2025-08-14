export default class BedchamberOtherSlave extends Restriction.Unit {
  constructor(public restriction: Restriction) {
    super();
  }

  override text() {
    return `setup.qres.BedchamberOtherSlave(${this.restriction.text()})`;
  }

  override explain(context?: unknown) {
    return `The other slave in bedchamber satisfies: (${this.restriction.explain(context)})`;
  }

  override isOk(unit: Unit): boolean {
    if (!unit.isSlave()) return false;
    let bedchamber = unit.getBedchamber();
    if (!bedchamber) return false;
    let slaves = bedchamber.getSlaves();
    if (slaves.length < 2) return false;
    let targ = slaves[0];
    if (targ == unit) targ = slaves[1];
    return this.restriction.isOk(targ);
  }

  getLayout() {
    return {
      css_class: "marketobjectcard",
      blocks: [
        {
          passage: "RestrictionBedchamberOtherSlaveHeader",
          addpassage: "QGAddRestrictionUnit",
          entrypath: ".restriction",
        },
      ],
    };
  }
}
